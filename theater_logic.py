# ================= THEATER DATA =================

Theaters = {
    "Toho Cinemas Sendai": {
        "Ratings": "4.6",
        "Nearest Station": "Sendai Station (JR East, Sendai Subway)",
        "Access": "Located in Sendai Parco 2 (26F), directly connected to the station via underground walkways and concourses (approx. 2-5 min walk)",
        "Nearest Landmark": "Sendai Parco shopping complex and the AER Building observation deck nearby",
        "IMAX": "Yes",
        "Prefecture": "Miyagi Prefecture"
    },
    "Forum Morioka": {
        "Ratings": "4.6",
        "Nearest Station": "Morioka Station (JR East)",
        "Access": "Located in the MOSS Building (5F), approx. 5-7 minutes walk from the station's West Exit",
        "Nearest Landmark": "Malios Observatory (tallest building in Tohoku, nearby) and Morioka Castle Ruins Park (15 min walk)",
        "IMAX": "No",
        "Prefecture": "Iwate Prefecture"
    },
    "Movix Sendai": {
        "Ratings": "4.6",
        "Nearest Station": "Nagamachi-Minami Station (Sendai Subway Namboku Line)",
        "Access": "3-5 minutes walk from the station.",
        "Nearest Landmark": "The Mall Sendai Nagamachi (large shopping mall directly adjacent/connected)",
        "IMAX": "No",
        "Prefecture": "Miyagi Prefecture"
    },
    "Warner Mycal Cinemas Hirosaki": {
        "Ratings": "4.6",
        "Nearest Station": "Hirosaki Station (JR East, Konan Railway)",
        "Access": "Located in the Saty Hirosaki shopping center (approx. 10-15 min walk or short bus ride from the station)",
        "Nearest Landmark": "Hirosaki Castle (famous cherry blossom spot, approx. 15-20 min walk/bus)",
        "IMAX": "No",
        "Prefecture": "Aomori Prefecture"
    },
    "Forum Yamagata": {
        "Ratings": "4.6",
        "Nearest Station": "Yamagata Station (JR East, Yamagata Shinkansen)",
        "Access": "Located in the S-Pal Yamagata or nearby commercial building (approx. 2-5 min walk from the East/West exit)",
        "Nearest Landmark": "SKajo Park (Yamagata Castle ruins, approx. 10-15 min walk)",
        "IMAX": "No",
        "Prefecture": "Yamagata Prefecture"
    },
    "Forum Sendai": {
        "Ratings": "4.6",
        "Nearest Station": "Sendai Station (JR East, Sendai Subway)",
        "Access": "Located in the Forum Sendai building (approx. 5-8 min walk from the West Exit)",
        "Nearest Landmark": "chibancho Arcade (largest shopping arcade in Tohoku, adjacent) and Sendai Mediatheque",
        "IMAX": "No",
        "Prefecture": "Miyagi Prefecture"
    },
    "Toho Cinemas Akita": {
        "Ratings": "4.6",
        "Nearest Station": "Akita Station (JR East, Akita Shinkansen)",
        "Access": "Located in Cubiz Park or a nearby commercial complex (approx. 5-10 min walk). Note: Specific building name often tied to local malls like Alve Akita or similar",
        "Nearest Landmark": "Akita Port (distant) or Senshu Park (nearby)",
        "IMAX": "Yes",
        "Prefecture": "Akita Prefecture"
    },
    "109 Cinemas Tomiya": {
        "Ratings": "4.6",
        "Nearest Station": "Tomiya Station (JR East Tohoku Main Line) or Izumi-Chuo Station (Sendai Subway Namboku Line - Note: Often accessed via bus from Izumi-Chuo)",
        "Access": "Located in AEON MALL Tomiya. Best accessed by bus from Izumi-Chuo Station (approx. 10-15 min bus ride) or a longer walk from Tomiya Station",
        "Nearest Landmark": "AEON MALL Tomiya (the mall itself is the landmark)",
        "IMAX": "Yes",
        "Prefecture": "Miyagi Prefecture"
    }
}

theater_map = {
    "1": "Toho Cinemas Sendai",
    "2": "Forum Morioka",
    "3": "Movix Sendai",
    "4": "Warner Mycal Cinemas Hirosaki",
    "5": "Forum Yamagata",
    "6": "Forum Sendai",
    "7": "Toho Cinemas Akita",
    "8": "109 Cinemas Tomiya",
}

# ================= HISTORY =================

import os

BASE_DIR = os.path.dirname(__file__)
HISTORY_FILE = os.path.join(BASE_DIR, "history.txt")

history = []

if os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "r", encoding="utf-8") as file:
        history = [line.strip() for line in file if line.strip()]
else:
    with open(HISTORY_FILE, "w", encoding="utf-8"):
        pass


def save_history(entry):
    history.append(entry)
    with open(HISTORY_FILE, "a", encoding="utf-8") as file:
        file.write(entry + "\n")


# ================= OPTION 1: VIEW THEATER INFO =================

def view_theater_info(theater_id=None):
    # If called from console with menu number
    if theater_id is None:
        print("\n🍿 View Theater Info")
        print("_" * 30)
        print("Which Theater would you like to know about? Choose by given numbers:")
        print("1. Toho Cinemas Sendai")
        print("2. Forum Morioka")
        print("3. Movix Sendai")
        print("4. Warner Mycal Cinemas Hirosaki")
        print("5. Forum Yamagata")
        print("6. Forum Sendai")
        print("7. Toho Cinemas Akita")
        print("8. 109 Cinemas Tomiya")

        choice = input("Enter Theater number (1-8): ").strip()

        if choice not in theater_map:
            print("❌ Invalid Number!")
            return {"error": "Invalid Number"}

        name = theater_map[choice]
        data = Theaters[name]
    else:
        # If called from Flask with theater_id like "toho-sendai"
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

        if theater_id not in id_to_name:
            return {"error": "Theater not found"}

        name = id_to_name[theater_id]
        data = Theaters[name]

    # Save to history
    save_history(f"Viewed Theater Info: {name}")

    # Return API-friendly format
    return {
        "name": name,
        "prefecture": data["Prefecture"],
        "ratings": data["Ratings"],
        "station": data["Nearest Station"],
        "landmark": data["Nearest Landmark"],
        "imax": data["IMAX"],
        "access": data["Access"]
    }


# ================= OPTION 2: IMAX OR NOT =================

def imax_or_not():
    print("\n🎬 IMAX or Not")
    print("_" * 30)
    print("Theaters that HAVE IMAX screens in Tohoku:")
    print()

    imax_theaters = [
        (name, data) for name, data in Theaters.items()
        if data["IMAX"] == "Yes"
    ]

    if not imax_theaters:
        print("No IMAX theaters found in the data.")
        return {"error": "No IMAX theaters"}

    result = []

    for i, (name, data) in enumerate(imax_theaters, 1):
        print(f"{i}. {name}")
        print(f"   Prefecture: {data['Prefecture']}")
        print(f"   Nearest Station: {data['Nearest Station']}")
        print(f"   Access: {data['Access']}")
        print(f"   Nearest Landmark: {data['Nearest Landmark']}")
        print()

        result.append({
            "name": name,
            "prefecture": data["Prefecture"],
            "station": data["Nearest Station"],
            "landmark": data["Nearest Landmark"],
            "access": data["Access"]
        })

    save_history("Viewed IMAX theaters list")
    return result