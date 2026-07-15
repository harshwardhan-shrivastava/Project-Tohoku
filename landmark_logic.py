# landmark_logic.py

def fmt(score: float) -> str:
    return f"{score:g}%"

# Landmarks data (matches your CLI file)
Landmarks = {
    "Hirosaki Park": {
        "Weekday": 20,
        "Weekend": 95,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Late April-Early May, October",
        "Fees": "Park Free | Castle ¥320 Adult ¥100 Child | Combo ¥520 Adult ¥160 Child"
    },
    "Matsushima Bay": {
        "Weekday": 45,
        "Weekend": 80,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Miyagi",
        "Best time": "April-May, October",
        "Fees": "Bay Free | Zuiganji Temple ¥1000 Adult ¥500 Child | Cruise ¥1650 Adult ¥840 Child"
    },
    "Lake Towada": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori/Akita",
        "Best time": "October, Summer",
        "Fees": "Lake Free | Boat ¥1440-1650 Adult ¥720-840 Child"
    },
    "Oirase Gorge": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Late October",
        "Fees": "Trail Free | Shuttle ¥400 Adult ¥200 Child"
    },
    "Yamadera (Risshaku-ji Temple)": {
        "Weekday": 30,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "October, Summer",
        "Fees": "Temple ¥300-500 Adult ¥100-200 Child"
    },
    "Ginzan Onsen": {
        "Weekday": 20,
        "Weekend": 95,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "January-February",
        "Fees": "Town Free | Shuttle ¥1000 Adult ¥500 Child | Onsen ¥1000-2000"
    },
    "Kakunodate Samurai District": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Akita",
        "Best time": "Late April, October",
        "Fees": "District Free | Samurai Houses ¥800 Adult ¥400 Child"
    },
    "Dewa Sanzan": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "July-September",
        "Fees": "Trails Free | Shrines ¥500-1000 | Bus ¥1000 Adult ¥500 Child"
    },
    "Aomori Nebuta Museum Wa Rasse": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Year-round",
        "Fees": "Museum ¥600 Adult ¥260 Child"
    },
    "Shirakami Sanchi": {
        "Weekday": 10,
        "Weekend": 30,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori/Akita",
        "Best time": "June-October",
        "Fees": "Forest Free | Guided Tours ¥3000+"
    },
    "Hakkoda Ropeway": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Winter, October",
        "Fees": "Ropeway ¥1800 Adult ¥900 Child"
    },
    "Chuson-ji Temple": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Iwate",
        "Best time": "May, October",
        "Fees": "Temple ¥800 Adult ¥500 High School ¥300 Child"
    },
    "Naruko Gorge": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Miyagi/Yamagata",
        "Best time": "Late October",
        "Fees": "Gorge Free | Onsen ¥600-1000 Adult ¥300-500 Child"
    },
    "Osore-zan Bodai-ji Temple": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "July-September",
        "Fees": "Temple Free | Shuttle ¥1400 Adult ¥700 Child"
    }
}

# Option 2: Landmark Crowd Predictor (for Flask)
def landmark_crowd_predictor(landmark_name, day, weather):
    if landmark_name not in Landmarks:
        return {"error": "Landmark not found"}

    valid_days = ["Weekday", "Weekend"]
    valid_weather = ["Rainy", "Cloudy", "Sunny"]

    day = day.title() if day else None
    weather = weather.title() if weather else None

    if day not in valid_days or weather not in valid_weather:
        return {"error": "Invalid day or weather. Use: Weekday/Weekend and Rainy/Cloudy/Sunny."}

    data = Landmarks[landmark_name]
    score = data[day] * data[weather]

    score_text = fmt(score)

    if score < 30:
        status = "low"
        message = "✨ Great news: It's very empty!"
        if weather == "Rainy":
            message += " But don't forget an umbrella."
    elif score < 60:
        status = "moderate"
        message = "⚠️ Moderate crowds expected."
    else:
        status = "high"
        message = "🚫 High crowds expected!"

    return {
        "prefecture": data["Prefecture"],
        "best_time": data["Best time"],
        "fees": data["Fees"],
        "score_text": score_text,
        "status": status,
        "message": message
    }

# Option 1: View Landmark Info (for Flask)
def view_landmark_info(landmark_name):
    if landmark_name not in Landmarks:
        return {"error": "Landmark not found"}
    data = Landmarks[landmark_name]
    return {
        "name": landmark_name,
        "prefecture": data["Prefecture"],
        "best_time": data["Best time"],
        "fees": data["Fees"]
    }

# Option 3: List all landmarks (for Flask)
def list_landmarks():
    return [
        {
            "name": name,
            "prefecture": d["Prefecture"],
            "best_time": d["Best time"],
            "fees": d["Fees"]
        }
        for name, d in Landmarks.items()
    ]
#option 4
def landmark_recommendation(day, weather, order):
    """
    Recommendation is just a ranked list sorted by quietness (low score first).
    We can ignore 'order' from the route and always use 'low', or use it as given.
    """
    # For a true "recommendation" feel, default to lowest crowd first:
    return landmark_ranking(day, weather, order)


# Option 5: Landmark Popularity (for Flask)
def landmark_popularity(day):
    valid_days = ["Weekday", "Weekend"]
    day = day.title() if day else None
    if day not in valid_days:
        return [{"error": "Invalid day. Use: Weekday/Weekend."}]

    result = []
    for name, d in Landmarks.items():
        score = d[day]  # no weather factor
        if score < 30:
            crowd_text = "Low"
        elif score < 60:
            crowd_text = "Moderate"
        else:
            crowd_text = "High"
        result.append({
            "name": name,
            "prefecture": d["Prefecture"],
            "crowd": score,
            "crowd_text": crowd_text
        })
    return result

# Option 6: Advanced Ranking (for Flask)
def landmark_ranking(day, weather, order):
    valid_days = ["Weekday", "Weekend"]
    valid_weather = ["Rainy", "Cloudy", "Sunny"]
    valid_orders = ["quiet", "popular"]

    day = day.title() if day else None
    weather = weather.title() if weather else None

    if day not in valid_days or weather not in valid_weather or order not in valid_orders:
        return [{"error": "Invalid day/weather/order. Use: Weekday/Weekend, Rainy/Cloudy/Sunny, quiet/popular."}]

    result = []
    for name, d in Landmarks.items():
        score = d[day] * d[weather]
        result.append({
            "name": name,
            "prefecture": d["Prefecture"],
            "best_time": d["Best time"],
            "score": score,
            "score_text": fmt(score)
        })

    reverse = (order == "popular")
    result.sort(key=lambda x: x["score"], reverse=reverse)
    return result