from flask import Flask, render_template, jsonify, request, redirect, session, url_for

import sqlite3
import random
import os
import json
import urllib.request

from datetime import datetime, timedelta


from werkzeug.security import generate_password_hash, check_password_hash

from shrine_logic import *
from landmark_logic import Landmarks
from theater_logic import view_theater_info, imax_or_not


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
app.permanent_session_lifetime = timedelta(days=365)





# ==========================================================
# EMAIL VERIFICATION
# ==========================================================

BREVO_API_KEY = os.environ.get("BREVO_API_KEY")
BREVO_SENDER_EMAIL = os.environ.get("MAIL_USERNAME")


def send_verification_email(email, code):

    if not BREVO_API_KEY:
        raise RuntimeError("BREVO_API_KEY is not configured")

    if not BREVO_SENDER_EMAIL:
        raise RuntimeError("MAIL_USERNAME is not configured")

    payload = {
        "sender": {
            "name": "Project Tohoku",
            "email": BREVO_SENDER_EMAIL
        },
        "to": [
            {
                "email": email
            }
        ],
        "subject": "Project Tōhoku - Verification Code",
        "textContent": f"""Welcome to Project Tōhoku.

Your verification code is:

{code}

This code will expire in 5 minutes.

If you did not request this code, you can ignore this email.

Project Tōhoku
Explore Northern Japan.
"""
    }

    request_data = urllib.request.Request(
        "https://api.brevo.com/v3/smtp/email",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json"
        },
        method="POST"
    )

    with urllib.request.urlopen(request_data, timeout=15) as response:
        if response.status not in (200, 201, 202):
            raise RuntimeError(
                f"Brevo email failed with status {response.status}"
            )


# ==========================================================
# DATABASE
# ========================================================

def get_db_connection():
    connection = sqlite3.connect("tohoku.db")
    connection.row_factory = sqlite3.Row
    return connection


def create_database():
    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            avatar TEXT NOT NULL
        )
    """)

    connection.execute("""
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        category TEXT NOT NULL,
        service TEXT NOT NULL,
        title TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
""")

    connection.commit()
    connection.close()


create_database()


def save_user_history(category, service, title, details=None):

    print("DEBUG SESSION:", dict(session))

    if "user_id" not in session:
        print("DEBUG HISTORY: NO USER ID - NOT SAVING")
        return

    print("DEBUG HISTORY USER ID:", session["user_id"])

    connection = get_db_connection()

    connection.execute(
        """
        INSERT INTO history (user_id, category, service, title, details)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            session["user_id"],
            category,
            service,
            title,
            details
        )
    )

    connection.commit()
    connection.close()

    print("DEBUG HISTORY: SAVED SUCCESSFULLY")


# ==========================================================
# REGISTER
# ==========================================================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        username = request.form["username"].strip()
        email = request.form["email"].strip().lower()
        password = request.form["password"]
        avatar = request.form["avatar"]

        connection = get_db_connection()

        existing_user = connection.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        connection.close()

        if existing_user:
            return "Email already registered"

        verification_code = str(
            random.randint(100000, 999999)
        )

        session["pending_registration"] = {
            "username": username,
            "email": email,
            "password": generate_password_hash(password),
            "avatar": avatar,
            "verification_code": verification_code,
            "expires_at": (
                datetime.now() + timedelta(minutes=5)
            ).isoformat()
        }

        try:

            send_verification_email(
                email,
                verification_code
            )

        except Exception as error:

            print("EMAIL ERROR:", error)

            session.pop(
                "pending_registration",
                None
            )

            return "Unable to send verification email", 500

        return redirect(
            url_for("verify_email")
        )

    return render_template("register.html")


# ==========================================================
# VERIFY EMAIL
# ==========================================================

@app.route("/verify-email", methods=["GET", "POST"])
def verify_email():

    pending_registration = session.get(
        "pending_registration"
    )

    if not pending_registration:

        return redirect(
            url_for("register")
        )

    if request.method == "POST":

        entered_code = request.form[
            "verification_code"
        ].strip()

        expires_at = datetime.fromisoformat(
            pending_registration["expires_at"]
        )

        if datetime.now() > expires_at:

            session.pop(
                "pending_registration",
                None
            )

            return "Verification code expired"

        if entered_code != pending_registration[
            "verification_code"
        ]:

            return "Invalid verification code"

        connection = get_db_connection()

        cursor = connection.execute(
            """
            INSERT INTO users (
                username,
                email,
                password,
                avatar
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                pending_registration["username"],
                pending_registration["email"],
                pending_registration["password"],
                pending_registration["avatar"]
            )
        )

        connection.commit()

        user_id = cursor.lastrowid

        connection.close()

        session.permanent = True

        session["user_id"] = user_id
        session["username"] = pending_registration[
            "username"
        ]
        session["avatar"] = pending_registration[
            "avatar"
        ]

        session.pop(
            "pending_registration",
            None
        )

        return redirect(
            url_for("home")
        )

    return render_template(
        "verify_email.html",
        email=pending_registration["email"]
    )




# ==========================================================
# RESEND REGISTRATION VERIFICATION CODE
# ==========================================================

@app.route("/resend-verification-code", methods=["POST"])
def resend_verification_code():

    pending_registration = session.get(
        "pending_registration"
    )

    if not pending_registration:
        return redirect(url_for("register"))

    last_sent_at = pending_registration.get("last_sent_at")

    if last_sent_at:

        last_sent_at = datetime.fromisoformat(last_sent_at)

        if datetime.now() < last_sent_at + timedelta(seconds=30):
            return "Please wait 30 seconds before requesting another code", 429

    verification_code = str(
        random.randint(100000, 999999)
    )

    pending_registration["verification_code"] = verification_code

    pending_registration["expires_at"] = (
        datetime.now() + timedelta(minutes=5)
    ).isoformat()

    pending_registration["last_sent_at"] = (
        datetime.now().isoformat()
    )

    session["pending_registration"] = pending_registration

    try:

        send_verification_email(
            pending_registration["email"],
            verification_code
        )

    except Exception as error:

        print("RESEND EMAIL ERROR:", error)

        return "Unable to resend verification code", 500

    return redirect(
        url_for("verify_email")
    )



# ==========================================================
# LOGIN
# ==========================================================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        connection = get_db_connection()

        user = connection.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        connection.close()

        if user and check_password_hash(user["password"], password):
            session.permanent = True
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            session["avatar"] = user["avatar"]

            return redirect(url_for("home"))

        return "Invalid email or password"

    return render_template("login.html")


# ==========================================================
# FORGOT PASSWORD
# ==========================================================

@app.route("/forgot-password", methods=["POST"])
def forgot_password():

    email = request.form["email"].strip().lower()

    connection = get_db_connection()

    user = connection.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    ).fetchone()

    connection.close()

    if not user:
        return "Email not registered"

    verification_code = str(
        random.randint(100000, 999999)
    )

    session["password_reset"] = {
        "email": email,
        "verification_code": verification_code,
        "expires_at": (
            datetime.now() + timedelta(minutes=5)
        ).isoformat()
    }

    try:

        send_verification_email(
            email,
            verification_code
        )

    except Exception as error:

        print("PASSWORD RESET EMAIL ERROR:", error)

        session.pop(
            "password_reset",
            None
        )

        return "Unable to send password reset email", 500

    return redirect(
        url_for("verify_password_reset")
    )


# ==========================================================
# VERIFY PASSWORD RESET CODE
# ==========================================================

@app.route("/verify-password-reset", methods=["GET", "POST"])
def verify_password_reset():

    password_reset = session.get("password_reset")

    if not password_reset:
        return redirect(url_for("register"))

    if request.method == "POST":

        entered_code = request.form[
            "verification_code"
        ].strip()

        expires_at = datetime.fromisoformat(
            password_reset["expires_at"]
        )

        if datetime.now() > expires_at:

            session.pop(
                "password_reset",
                None
            )

            return "Verification code expired"

        if entered_code != password_reset[
            "verification_code"
        ]:

            return "Invalid verification code"

        session["password_reset_verified"] = True

        return redirect(
            url_for("reset_password")
        )

    return render_template(
        "verify_password_reset.html",
        email=password_reset["email"]
    )


# ==========================================================
# RESEND PASSWORD RESET VERIFICATION CODE
# ==========================================================

@app.route("/resend-password-reset-code", methods=["POST"])
def resend_password_reset_code():

    password_reset = session.get("password_reset")

    if not password_reset:
        return redirect(url_for("register"))

    last_sent_at = password_reset.get("last_sent_at")

    if last_sent_at:

        last_sent_at = datetime.fromisoformat(last_sent_at)

        if datetime.now() < last_sent_at + timedelta(seconds=30):
            return "Please wait 30 seconds before requesting another code", 429

    verification_code = str(
        random.randint(100000, 999999)
    )

    password_reset["verification_code"] = verification_code

    password_reset["expires_at"] = (
        datetime.now() + timedelta(minutes=5)
    ).isoformat()

    password_reset["last_sent_at"] = (
        datetime.now().isoformat()
    )

    session["password_reset"] = password_reset

    try:

        send_verification_email(
            password_reset["email"],
            verification_code
        )

    except Exception as error:

        print("PASSWORD RESET RESEND ERROR:", error)

        return "Unable to resend verification code", 500

    return redirect(
        url_for("verify_password_reset")
    )


# ==========================================================
# RESET PASSWORD
# ==========================================================

@app.route("/reset-password", methods=["GET", "POST"])
def reset_password():

    password_reset = session.get("password_reset")

    if (
        not password_reset
        or not session.get("password_reset_verified")
    ):

        return redirect(url_for("register"))

    if request.method == "POST":

        new_password = request.form["new_password"]

        connection = get_db_connection()

        connection.execute(
            """
            UPDATE users
            SET password = ?
            WHERE email = ?
            """,
            (
                generate_password_hash(new_password),
                password_reset["email"]
            )
        )

        connection.commit()
        connection.close()

        session.pop("password_reset", None)
        session.pop("password_reset_verified", None)

        return redirect(
            url_for("register")
        )

    return render_template(
        "reset_password.html"
    )


# ==========================================================
# LOGOUT
# ==========================================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("home"))


# ==========================================================
# PROFILE
# ==========================================================

@app.route("/profile", methods=["GET", "POST"])
def profile():

    if "user_id" not in session:
        return redirect(url_for("register"))

    connection = get_db_connection()

    user = connection.execute(
        "SELECT * FROM users WHERE id = ?",
        (session["user_id"],)
    ).fetchone()

    if not user:
        connection.close()
        session.clear()

        return redirect(url_for("register"))

    if request.method == "POST":

        username = request.form["username"].strip()
        avatar = request.form["avatar"]

        next_page = request.form.get("next") or url_for("home")

        if not username:
            connection.close()
            return "Username cannot be empty"

        connection.execute(
            """
            UPDATE users
            SET username = ?, avatar = ?
            WHERE id = ?
            """,
            (
                username,
                avatar,
                session["user_id"]
            )
        )

        connection.commit()
        connection.close()

        session["username"] = username
        session["avatar"] = avatar

        session["profile_updated"] = True

        return redirect(next_page)

    next_page = request.args.get("next") or url_for("home")

    connection.close()

    return render_template(
        "profile.html",
        user=user,
        next_page=next_page
    )


# ==========================================================
# HOME PAGE
# ==========================================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================================
# SHRINES PAGE
# ==========================================================

@app.route("/shrines")
def shrines():
    return render_template("shrines.html")


# ==========================================================
# LNADMARK PAGE
# ==========================================================

@app.route("/landmarks")
def landmarks_page():
    return render_template("landmarks.html")


# ==========================================================
# THEATER SERVICES PAGE
# ==========================================================

@app.route("/theater-services")
def theater_services():
    return render_template("theater.html")

# ==========================================================
# VIEW SHRINE INFO
# ==========================================================


@app.route("/shrine-info/<shrine>")
def shrine_info(shrine):

    print("🔥 SHRINE INFO ROUTE WAS CALLED:", shrine)

    shrine_map = {
        "aoba": "Aoba Shrine",
        "osaki": "Osaki Hachimangu Shrine",
        "towada": "Towada Shrine",
        "kabushima": "Kabushima Shrine"
    }

    image_map = {
        "aoba": "shrine1.jpg",
        "osaki": "shrine2.jpg",
        "kabushima": "shrine3.jpg",
        "towada": "shrine4.jpg"
    }

    shrine = shrine.lower()

    if shrine not in shrine_map:
        return jsonify({"error": "Shrine not found"}), 404

    info = view_shrine_info(shrine_map[shrine])

    save_user_history(
        category="shrine",
        service="View Shrine Info",
        title=shrine_map[shrine],
        details=f"Viewed information for {shrine_map[shrine]}"
    )

    return jsonify({
        "name": info["name"],
        "prefecture": info["prefecture"],
        "best_time": info["best_time"],
        "wedding_min": info["wedding_min"],
        "wedding_max": info["wedding_max"],
        "blessing_min": info["blessing_min"],
        "blessing_max": info["blessing_max"],
        "festival_min": info["festival_min"],
        "festival_max": info["festival_max"],
        "private_min": info["private_min"],
        "private_max": info["private_max"],
        "image": image_map[shrine]
    })


# ==========================================================
# CROWD PREDICTOR
# ==========================================================

@app.route("/crowd/<shrine>/<day>/<weather>")
def crowd(shrine, day, weather):

    shrine_map = {
        "aoba": "Aoba Shrine",
        "osaki": "Osaki Hachimangu Shrine",
        "towada": "Towada Shrine",
        "kabushima": "Kabushima Shrine"
    }

    shrine = shrine.lower()

    if shrine not in shrine_map:
        return jsonify({"error": "Shrine not found"}), 404

    result = shrine_crowd_predictor(
        shrine_map[shrine],
        day,
        weather
    )

    save_user_history(
        category="shrine",
        service="Crowd Predictor",
        title=shrine_map[shrine],
        details=f"{day} - {weather}"
    )

    # If shrine_crowd_predictor already returns a dict
    return jsonify(result)


# ==========================================================
# OPTION 3 - LIST SHRINES (just return top shrine for demo)
# ==========================================================

@app.route("/list-all-shrines-api")
def list_all_shrines_api():
    from shrine_logic import list_shrines

    shrines = list_shrines()

    save_user_history(
        category="shrine",
        service="List All Shrines",
        title="Shrine List",
        details="Viewed all available shrines"
    )

    image_map = {
        "Aoba Shrine": "shrine1.jpg",
        "Osaki Hachimangu Shrine": "shrine2.jpg",
        "Towada Shrine": "shrine4.jpg",
        "Kabushima Shrine": "shrine3.jpg"
    }

    result = []

    for s in shrines:
        result.append({
            "name": s["name"],
            "prefecture": s["prefecture"],
            "weekday": s["weekday"],
            "weekend": s["weekend"],
            "image": image_map[s["name"]]
        })

    return jsonify(result)


# ==========================================================
# OPTION 4 - RECOMMENDATION (API)
# ==========================================================

@app.route("/recommendation-ranked-api/<day>/<weather>/<order>")
def recommendation_ranked_api(day, weather, order):
    from shrine_logic import shrine_ranking

    result = shrine_ranking(day, weather, order)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="shrine",
        service="Shrine Recommendation",
        title="Recommended Shrines",
        details=f"{day} - {weather} - {order}"
    )

    image_map = {
        "Aoba Shrine": "shrine1.jpg",
        "Osaki Hachimangu Shrine": "shrine2.jpg",
        "Towada Shrine": "shrine4.jpg",
        "Kabushima Shrine": "shrine3.jpg"
    }

    return jsonify({
        "day": day,
        "weather": weather,
        "order": order,
        "shrines": [
            {
                "name": s["name"],
                "prefecture": s["prefecture"],
                "best_time": s["best_time"],
                "score": s["score_text"],
                "image": image_map[s["name"]]
            }
            for s in result
        ]
    })


# ==========================================================
# OPTION 5 - POPULARITY (API)
# ==========================================================

@app.route("/popularity-api/<day>")
def popularity_api(day):
    from shrine_logic import shrine_popularity

    result = shrine_popularity(day)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="shrine",
        service="Shrine Popularity",
        title="Popular Shrines",
        details=f"{day} popularity"
    )

    result = sorted(
        result,
        key=lambda x: x["crowd"],
        reverse=True
    )

    top3 = result[:3]

    image_map = {
        "Aoba Shrine": "shrine1.jpg",
        "Osaki Hachimangu Shrine": "shrine2.jpg",
        "Towada Shrine": "shrine4.jpg",
        "Kabushima Shrine": "shrine3.jpg"
    }

    return jsonify({
        "day": day,
        "shrines": [
            {
                "name": s["name"],
                "prefecture": s["prefecture"],
                "crowd": s["crowd_text"],
                "image": image_map[s["name"]]
            }
            for s in top3
        ]
    })


# ==========================================================
# OPTION 6 - ADVANCED RANKING
# ==========================================================

@app.route("/ranking-api/<day>/<weather>/<order>")
def ranking_api(day, weather, order):
    from shrine_logic import shrine_ranking

    result = shrine_ranking(day, weather, order)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="shrine",
        service="Advanced Ranking",
        title="Shrine Ranking",
        details=f"{day} - {weather} - {order}"
    )

    image_map = {
        "Aoba Shrine": "shrine1.jpg",
        "Osaki Hachimangu Shrine": "shrine2.jpg",
        "Towada Shrine": "shrine4.jpg",
        "Kabushima Shrine": "shrine3.jpg"
    }

    return jsonify({
        "day": day,
        "weather": weather,
        "order": order,
        "shrines": [
            {
                "name": s["name"],
                "prefecture": s["prefecture"],
                "best_time": s["best_time"],
                "score": s["score_text"],
                "image": image_map[s["name"]]
            }
            for s in result
        ]
    })


# ==========================================================
# OPTION 7 - EVENT PLANNER
# ==========================================================

@app.route("/event-planner-api/<event_type>/<budget>")
def event_planner_api(event_type, budget):
    from shrine_logic import shrine_event_planner

    result = shrine_event_planner(event_type, budget)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="shrine",
        service="Event Planner",
        title=f"{event_type} Event",
        details=f"Budget: ¥{budget}"
    )

    image_map = {
        "Aoba Shrine": "shrine1.jpg",
        "Osaki Hachimangu Shrine": "shrine2.jpg",
        "Towada Shrine": "shrine4.jpg",
        "Kabushima Shrine": "shrine3.jpg"
    }

    return jsonify([
        {
            "name": s["name"],
            "prefecture": s["prefecture"],
            "best_time": s["best_time"],
            "minimum": s["minimum"],
            "maximum": s["maximum"],
            "status": s["status"],
            "image": image_map[s["name"]]
        }
        for s in result
    ])


# ==========================================================
# HISTORY
# ==========================================================

@app.route("/history")
def history():

    if "user_id" not in session:
        return redirect(url_for("login"))

    connection = get_db_connection()

    history_rows = connection.execute(
        """
        SELECT category, service, title, details, created_at
        FROM history
        WHERE user_id = ?
        ORDER BY id DESC
        """,
        (session["user_id"],)
    ).fetchall()

    connection.close()

    history_data = [
        {
            "category": row["category"],
            "service": row["service"],
            "title": row["title"],
            "details": row["details"],
            "created_at": row["created_at"]
        }
        for row in history_rows
    ]

    total_count = len(history_data)

    shrine_count = sum(
        1 for item in history_data
        if item["category"] == "shrine"
    )

    landmark_count = sum(
        1 for item in history_data
        if item["category"] == "landmark"
    )

    theater_count = sum(
        1 for item in history_data
        if item["category"] == "theater"
    )

    return render_template(
        "history.html",
        history=history_data,
        username=session.get("username"),
        avatar=session.get("avatar", "profile1.png"),
        total_count=total_count,
        shrine_count=shrine_count,
        landmark_count=landmark_count,
        theater_count=theater_count
    )


# ==========================================================
# LANDMARK OPTION 1 - VIEW LANDMARK INFO
# ==========================================================

@app.route("/landmark-info/<landmark_id>")
def landmark_info(landmark_id):
    from landmark_logic import view_landmark_info

    landmark_map = {
        "hirosaki": "Hirosaki Park",
        "matsushima": "Matsushima Bay",
        "towada": "Lake Towada",
        "oirase": "Oirase Gorge",
        "yamadera": "Yamadera (Risshaku-ji Temple)",
        "ginzan": "Ginzan Onsen",
        "kakunodate": "Kakunodate Samurai District",
        "dewasan": "Dewa Sanzan",
        "nebuta": "Aomori Nebuta Museum Wa Rasse",
        "shirakami": "Shirakami Sanchi",
        "hakkoda": "Hakkoda Ropeway",
        "chusonji": "Chuson-ji Temple",
        "naruko": "Naruko Gorge",
        "osore": "Osore-zan Bodai-ji Temple"
    }

    image_map = {
        "hirosaki": "hirosaki park.jpg",
        "matsushima": "matsushima_bay.jpg",
        "towada": "lake_towada.jpg",
        "oirase": "oirase_george.jpg",
        "yamadera": "risshaku-ji.jpg",
        "ginzan": "ginzan_onsen.jpg",
        "kakunodate": "samurai_district.jpg",
        "dewasan": "dewa_sanzan.jpg",
        "nebuta": "nebuta_museum.jpg",
        "shirakami": "shirakami_sanchi.jpg",
        "hakkoda": "hakkoda_ropeway.jpg",
        "chusonji": "chuson-ji_temple.jpg",
        "naruko": "naruko_gorge.jpg",
        "osore": "osorezan_bodai-ji.jpg"
    }

    landmark_id = landmark_id.lower()

    if landmark_id not in landmark_map:
        return jsonify({"error": "Landmark not found"}), 404

    info = view_landmark_info(
        landmark_map[landmark_id]
    )

    save_user_history(
        category="landmark",
        service="View Landmark Info",
        title=landmark_map[landmark_id],
        details=f"Viewed information for {landmark_map[landmark_id]}"
    )

    return jsonify({
        "name": info["name"],
        "prefecture": info["prefecture"],
        "best_time": info["best_time"],
        "fees": info["fees"],
        "image": image_map[landmark_id]
    })


# ==========================================================
# LANDMARK OPTION 2 - CROWD PREDICTOR
# ==========================================================

@app.route("/landmark-crowd/<landmark_id>/<day>/<weather>")
def landmark_crowd(landmark_id, day, weather):
    from landmark_logic import landmark_crowd_predictor

    landmark_map = {
        "hirosaki": "Hirosaki Park",
        "matsushima": "Matsushima Bay",
        "towada": "Lake Towada",
        "oirase": "Oirase Gorge",
        "yamadera": "Yamadera (Risshaku-ji Temple)",
        "ginzan": "Ginzan Onsen",
        "kakunodate": "Kakunodate Samurai District",
        "dewasan": "Dewa Sanzan",
        "nebuta": "Aomori Nebuta Museum Wa Rasse",
        "shirakami": "Shirakami Sanchi",
        "hakkoda": "Hakkoda Ropeway",
        "chusonji": "Chuson-ji Temple",
        "naruko": "Naruko Gorge",
        "osore": "Osore-zan Bodai-ji Temple"
    }

    image_map = {
        "hirosaki": "landmark1.jpg",
        "matsushima": "landmark2.jpg",
        "towada": "landmark3.jpg",
        "oirase": "landmark4.jpg",
        "yamadera": "landmark5.jpg",
        "ginzan": "landmark6.jpg",
        "kakunodate": "landmark7.jpg",
        "dewasan": "landmark8.jpg",
        "nebuta": "landmark9.jpg",
        "shirakami": "landmark10.jpg",
        "hakkoda": "landmark11.jpg",
        "chusonji": "landmark12.jpg",
        "naruko": "landmark13.jpg",
        "osore": "landmark14.jpg"
    }

    landmark_id = landmark_id.lower()

    if landmark_id not in landmark_map:
        return jsonify({"error": "Landmark not found"}), 404

    result = landmark_crowd_predictor(
        landmark_map[landmark_id],
        day,
        weather
    )

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="landmark",
        service="Crowd Predictor",
        title=landmark_map[landmark_id],
        details=f"{day} - {weather}"
    )

    return jsonify({
        "name": landmark_map[landmark_id],
        "prefecture": result["prefecture"],
        "best_time": result["best_time"],
        "fees": result["fees"],
        "score_text": result["score_text"],
        "status": result["status"],
        "message": result["message"],
        "image": image_map[landmark_id]
    })


# ==========================================================
# LANDMARK OPTION 3 - LIST ALL LANDMARKS
# ==========================================================

@app.route("/list-all-landmarks-api")
def list_all_landmarks_api():
    from landmark_logic import list_landmarks

    landmarks = list_landmarks()

    save_user_history(
        category="landmark",
        service="List All Landmarks",
        title="Landmark List",
        details="Viewed all available landmarks"
    )

    image_map = {
        "Hirosaki Park": "landmark1.jpg",
        "Matsushima Bay": "landmark2.jpg",
        "Lake Towada": "landmark3.jpg",
        "Oirase Gorge": "landmark4.jpg",
        "Yamadera (Risshaku-ji Temple)": "landmark5.jpg",
        "Ginzan Onsen": "landmark6.jpg",
        "Kakunodate Samurai District": "landmark7.jpg",
        "Dewa Sanzan": "landmark8.jpg",
        "Aomori Nebuta Museum Wa Rasse": "landmark9.jpg",
        "Shirakami Sanchi": "landmark10.jpg",
        "Hakkoda Ropeway": "landmark11.jpg",
        "Chuson-ji Temple": "landmark12.jpg",
        "Naruko Gorge": "landmark13.jpg",
        "Osore-zan Bodai-ji Temple": "landmark14.jpg"
    }

    return jsonify([
        {
            "name": l["name"],
            "prefecture": l["prefecture"],
            "best_time": l["best_time"],
            "fees": l["fees"],
            "image": image_map[l["name"]]
        }
        for l in landmarks
    ])

# ==========================================================
# LANDMARK OPTION 4 - RECOMMENDATION
# ==========================================================

@app.route("/landmark-recommendation-ranked-api/<day>/<weather>/<order>")
def landmark_recommendation_ranked_api(day, weather, order):
    from landmark_logic import landmark_recommendation

    result = landmark_recommendation(day, weather, order)

    if isinstance(result, list) and len(result) > 0 and "error" in result[0]:
        return jsonify(result[0]), 400

    save_user_history(
        category="landmark",
        service="Landmark Recommendation",
        title="Recommended Landmarks",
        details=f"{day} - {weather} - {order}"
    )

    image_map = {
        "Hirosaki Park": "landmark1.jpg",
        "Matsushima Bay": "landmark2.jpg",
        "Lake Towada": "landmark3.jpg",
        "Oirase Gorge": "landmark4.jpg",
        "Yamadera (Risshaku-ji Temple)": "landmark5.jpg",
        "Ginzan Onsen": "landmark6.jpg",
        "Kakunodate Samurai District": "landmark7.jpg",
        "Dewa Sanzan": "landmark8.jpg",
        "Aomori Nebuta Museum Wa Rasse": "landmark9.jpg",
        "Shirakami Sanchi": "landmark10.jpg",
        "Hakkoda Ropeway": "landmark11.jpg",
        "Chuson-ji Temple": "landmark12.jpg",
        "Naruko Gorge": "landmark13.jpg",
        "Osore-zan Bodai-ji Temple": "landmark14.jpg"
    }

    return jsonify({
        "day": day,
        "weather": weather,
        "order": order,
        "landmarks": [
            {
                "name": l["name"],
                "prefecture": l["prefecture"],
                "best_time": l["best_time"],
                "score": l["score_text"],
                "image": image_map[l["name"]]
            }
            for l in result
        ]
    })


# ==========================================================
# LANDMARK OPTION 5 - POPULARITY
# ==========================================================

@app.route("/landmark-popularity-api/<day>")
def landmark_popularity_api(day):
    from landmark_logic import landmark_popularity

    result = landmark_popularity(day)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="landmark",
        service="Landmark Popularity",
        title="Popular Landmarks",
        details=f"{day} popularity"
    )

    image_map = {
        "Hirosaki Park": "landmark1.jpg",
        "Matsushima Bay": "landmark2.jpg",
        "Lake Towada": "landmark3.jpg",
        "Oirase Gorge": "landmark4.jpg",
        "Yamadera (Risshaku-ji Temple)": "landmark5.jpg",
        "Ginzan Onsen": "landmark6.jpg",
        "Kakunodate Samurai District": "landmark7.jpg",
        "Dewa Sanzan": "landmark8.jpg",
        "Aomori Nebuta Museum Wa Rasse": "landmark9.jpg",
        "Shirakami Sanchi": "landmark10.jpg",
        "Hakkoda Ropeway": "landmark11.jpg",
        "Chuson-ji Temple": "landmark12.jpg",
        "Naruko Gorge": "landmark13.jpg",
        "Osore-zan Bodai-ji Temple": "landmark14.jpg"
    }

    result = sorted(
        result,
        key=lambda x: x["crowd"],
        reverse=True
    )

    top3 = result[:3]

    return jsonify({
        "day": day,
        "landmarks": [
            {
                "name": l["name"],
                "prefecture": l["prefecture"],
                "best_time": Landmarks[l["name"]]["Best time"],
                "crowd": l["crowd_text"],
                "image": image_map[l["name"]]
            }
            for l in top3
        ]
    })


# ==========================================================
# LANDMARK OPTION 6 - ADVANCED RANKING
# ==========================================================

@app.route("/landmark-ranking-api/<day>/<weather>/<order>")
def landmark_ranking_api(day, weather, order):
    from landmark_logic import landmark_ranking

    result = landmark_ranking(day, weather, order)

    if "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="landmark",
        service="Advanced Ranking",
        title="Landmark Ranking",
        details=f"{day} - {weather} - {order}"
    )

    image_map = {
        "Hirosaki Park": "landmark1.jpg",
        "Matsushima Bay": "landmark2.jpg",
        "Lake Towada": "landmark3.jpg",
        "Oirase Gorge": "landmark4.jpg",
        "Yamadera (Risshaku-ji Temple)": "landmark5.jpg",
        "Ginzan Onsen": "landmark6.jpg",
        "Kakunodate Samurai District": "landmark7.jpg",
        "Dewa Sanzan": "landmark8.jpg",
        "Aomori Nebuta Museum Wa Rasse": "landmark9.jpg",
        "Shirakami Sanchi": "landmark10.jpg",
        "Hakkoda Ropeway": "landmark11.jpg",
        "Chuson-ji Temple": "landmark12.jpg",
        "Naruko Gorge": "landmark13.jpg",
        "Osore-zan Bodai-ji Temple": "landmark14.jpg"
    }

    return jsonify({
        "day": day,
        "weather": weather,
        "order": order,
        "landmarks": [
            {
                "name": l["name"],
                "prefecture": l["prefecture"],
                "best_time": l["best_time"],
                "score": l["score_text"],
                "image": image_map[l["name"]]
            }
            for l in result
        ]
    })


# ==========================================================
# THEATER OPTION 1 - VIEW THEATER INFO
# ==========================================================

@app.route("/theater-info/<theater_id>")
def theater_info(theater_id):

    id_to_name = {
        "toho-sendai": "Toho Cinemas Sendai",
        "forum-morioka": "Forum Morioka",
        "movix-sendai": "Movix Sendai",
        "warner-hirosaki": "Warner Mycal Cinemas Hirosaki",
        "forum-yamagata": "Forum Yamagata",
        "forum-sendai": "Forum Sendai",
        "toho-akita": "Toho Cinemas Akita",
        "109-tomiya": "109 Cinemas Tomiya",
    }

    theater_id = theater_id.lower()

    if theater_id not in id_to_name:
        return jsonify({"error": "Theater not found"}), 404

    name = id_to_name[theater_id]
    data = view_theater_info(theater_id=theater_id)

    if isinstance(data, dict) and "error" in data:
        return jsonify(data), 404

    save_user_history(
        category="theater",
        service="View Theater Info",
        title=name,
        details=f"Viewed information for {name}"
    )

    return jsonify(data)


# ==========================================================
# THEATER OPTION 2 - IMAX OR NOT
# ==========================================================

@app.route("/imax-theaters-api")
def imax_theaters_api():

    result = imax_or_not()

    if isinstance(result, dict) and "error" in result:
        return jsonify(result), 400

    save_user_history(
        category="theater",
        service="IMAX or Not",
        title="IMAX Theaters",
        details="Viewed available IMAX theaters in Tohoku"
    )

    return jsonify(result)


# ==========================================================
# RUN
# ==========================================================

if __name__ == "__main__":
    app.run(debug=True)