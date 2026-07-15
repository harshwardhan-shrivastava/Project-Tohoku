print("Loaded shrine_logic.py")

import os

# ==========================================================
# SHRINE DATABASE
# ==========================================================

Shrines = {

    "Aoba Shrine": {

        "Weekday": 20,
        "Weekend": 60,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Miyagi",

        "Best time": "8 AM to 11 AM - Expect a decent crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Osaki Hachimangu Shrine": {

        "Weekday": 65,
        "Weekend": 85,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Miyagi",

        "Best time": "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Towada Shrine": {

        "Weekday": 8,
        "Weekend": 16,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Aomori",

        "Best time": "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Kabushima Shrine": {

        "Weekday": 5,
        "Weekend": 10,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Aomori",

        "Best time": "9:30 AM - 11:00 AM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    }

}

# ==========================================================
# HISTORY
# ==========================================================

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


# ==========================================================
# HELPER FUNCTIONS
# ==========================================================

def fmt(value):

    return f"{value:g}%"


menu_map = {

    "1": "Aoba Shrine",
    "2": "Osaki Hachimangu Shrine",
    "3": "Towada Shrine",
    "4": "Kabushima Shrine"

}

import os

# ==========================================================
# SHRINE DATABASE
# ==========================================================

Shrines = {

    "Aoba Shrine": {

        "Weekday": 20,
        "Weekend": 60,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Miyagi",

        "Best time": "8 AM to 11 AM - Expect a decent crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Osaki Hachimangu Shrine": {

        "Weekday": 65,
        "Weekend": 85,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Miyagi",

        "Best time": "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Towada Shrine": {

        "Weekday": 8,
        "Weekend": 16,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Aomori",

        "Best time": "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    },

    "Kabushima Shrine": {

        "Weekday": 5,
        "Weekend": 10,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Aomori",

        "Best time": "9:30 AM - 11:00 AM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000
    }

}

# ==========================================================
# HISTORY
# ==========================================================

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


# ==========================================================
# HELPER FUNCTIONS
# ==========================================================

def fmt(value):

    return f"{value:g}%"


menu_map = {

    "1": "Aoba Shrine",
    "2": "Osaki Hachimangu Shrine",
    "3": "Towada Shrine",
    "4": "Kabushima Shrine"

}

# ==========================================================
# OPTION 1 - VIEW SHRINE INFO
# ==========================================================

def view_shrine_info(shrine_name):

    if shrine_name not in Shrines:
        return {"error": "Shrine not found"}

    data = Shrines[shrine_name]

    save_history(f"Viewed Shrine Info: {shrine_name}")

    return {
    "name": shrine_name,
    "prefecture": data["Prefecture"],
    "best_time": data["Best time"],

    "wedding_min": 50000,
    "wedding_max": 100000,

    "blessing_min": 5000,
    "blessing_max": 10000,

    "festival_min": 20000,
    "festival_max": 50000,

    "private_min": 30000,
    "private_max": 70000
}


# ==========================================================
# OPTION 2 - CROWD PREDICTOR
# ==========================================================

def shrine_crowd_predictor(shrine_name, day, weather):

    if shrine_name not in Shrines:
        return {"error": "Shrine not found"}

    day = day.title()
    weather = weather.title()

    if day not in ["Weekday", "Weekend"]:
        return {"error": "Invalid Day"}

    if weather not in ["Rainy", "Cloudy", "Sunny"]:
        return {"error": "Invalid Weather"}

    data = Shrines[shrine_name]

    score = data[day] * data[weather]

    if score < 15:
        status = "Very Low Crowd"
        message = "Great news! Very quiet."

    elif score < 50:
        status = "Moderate Crowd"
        message = "Moderate crowd expected."

    else:
        status = "High Crowd"
        message = "High crowd expected."

    save_history(
        f"Crowd Prediction - {shrine_name} - {day} - {weather}"
    )

    return {

        "shrine": shrine_name,

        "day": day,

        "weather": weather,

        "score": score,

        "score_text": fmt(score),

        "status": status,

        "message": message

    }


# ==========================================================
# OPTION 3 - LIST SHRINES
# ==========================================================

def list_shrines():

    shrine_list = []

    for shrine_name, data in Shrines.items():

        shrine_list.append({

            "name": shrine_name,

            "prefecture": data["Prefecture"],

            "weekday": data["Weekday"],

            "weekend": data["Weekend"]

        })

    save_history("Viewed Shrine List")

    return shrine_list




# ==========================================================
# OPTION 4 - RECOMMENDATION
# ==========================================================

def shrine_recommendation(day, weather):

    day = day.title()
    weather = weather.title()

    if day not in ["Weekday", "Weekend"]:
        return {"error": "Invalid Day"}

    if weather not in ["Rainy", "Cloudy", "Sunny"]:
        return {"error": "Invalid Weather"}

    recommendations = []

    for shrine_name, data in Shrines.items():

        score = data[day] * data[weather]

        recommendations.append({

            "name": shrine_name,

            "prefecture": data["Prefecture"],

            "best_time": data["Best time"],

            "score": score,

            "score_text": fmt(score)

        })

    recommendations.sort(key=lambda x: x["score"])

    best = recommendations[0]

    save_history(
        f"Recommendation Generated - {best['name']}"
    )

    return {

        "best": best,

        "all": recommendations

    }


# ==========================================================
# OPTION 5 - SHRINE POPULARITY
# ==========================================================

def shrine_popularity(day):

    day = day.title()

    if day not in ["Weekday", "Weekend"]:
        return {"error": "Invalid Day"}

    popularity = []

    for shrine_name, data in Shrines.items():

        popularity.append({

            "name": shrine_name,

            "prefecture": data["Prefecture"],

            "crowd": data[day],

            "crowd_text": fmt(data[day])

        })

    popularity.sort(key=lambda x: x["crowd"])

    save_history(
        f"Viewed Shrine Popularity ({day})"
    )

    return popularity


# ==========================================================
# OPTION 6 - ADVANCED RANKING
# ==========================================================

def shrine_ranking(day, weather, order):

    day = day.title()
    weather = weather.title()

    if day not in ["Weekday", "Weekend"]:
        return {"error": "Invalid Day"}

    if weather not in ["Rainy", "Cloudy", "Sunny"]:
        return {"error": "Invalid Weather"}

    ranking = []

    for shrine_name, data in Shrines.items():

        final_score = data[day] * data[weather]

        ranking.append({

            "name": shrine_name,

            "prefecture": data["Prefecture"],

            "best_time": data["Best time"],

            "score": final_score,

            "score_text": fmt(final_score)

        })

    reverse = True if order.lower() == "popular" else False

    ranking.sort(key=lambda x: x["score"], reverse=reverse)

    save_history(
        f"Advanced Ranking - {day} - {weather} - {order}"
    )

    return ranking[:3]

# ==========================================================
# OPTION 7 - EVENT PLANNER
# ==========================================================

def shrine_event_planner(event_type, budget):

    event_type = event_type.title()

    events = {

        "Wedding": (
            "WeddingCostMin",
            "WeddingCostMax"
        ),

        "Blessing": (
            "BlessingCostMin",
            "BlessingCostMax"
        ),

        "Festival": (
            "FestivalCostMin",
            "FestivalCostMax"
        ),

        "Private Event": (
            "PrivateEventCostMin",
            "PrivateEventCostMax"
        )

    }

    if event_type not in events:
        return {"error": "Invalid Event"}

    try:
        budget = float(budget)
    except ValueError:
        return {"error": "Invalid Budget"}

    min_key, max_key = events[event_type]

    available = []

    for shrine_name, data in Shrines.items():

        minimum = data[min_key]
        maximum = data[max_key]

        if budget >= minimum:

            if budget >= maximum:
                status = "Fully Covered"

            else:
                status = f"Need ¥{maximum-budget:,.0f} more"

            available.append({

                "name": shrine_name,

                "prefecture": data["Prefecture"],

                "best_time": data["Best time"],

                "minimum": minimum,

                "maximum": maximum,

                "status": status

            })

    save_history(
        f"Event Planner - {event_type} - ¥{budget:,.0f}"
    )

    return available


# ==========================================================
# HISTORY
# ==========================================================

def get_history():

    return history


# ==========================================================
# SHRINE LIST
# ==========================================================

def get_all_shrines():

    return list(Shrines.keys())


# ==========================================================
# SINGLE SHRINE
# ==========================================================

def get_shrine(shrine_name):

    if shrine_name not in Shrines:
        return None

    return Shrines[shrine_name]

