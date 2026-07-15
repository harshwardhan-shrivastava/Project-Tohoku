/* ================= BILINGUAL LANDMARK HELPERS ================= */

function landmarkT(key, fallback = "") {
    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : (localStorage.getItem("tohokuLanguage") || "en");

    return (
        typeof translations !== "undefined" &&
        translations[language] &&
        translations[language][key]
    ) || fallback;
}


const landmarkTranslationKeys = {

    "Hirosaki Park": "place_hirosaki",
    "Matsushima Bay": "place_matsushima",
    "Lake Towada": "place_lake_towada",
    "Oirase Gorge": "place_oirase",
    "Yamadera (Risshaku-ji Temple)": "place_yamadera",
    "Ginzan Onsen": "place_ginzan",
    "Kakunodate Samurai District": "place_kakunodate",
    "Dewa Sanzan": "place_dewa",
    "Aomori Nebuta Museum Wa Rasse": "place_nebuta",
    "Shirakami Sanchi": "place_shirakami",
    "Hakkoda Ropeway": "place_hakkoda",
    "Chuson-ji Temple": "place_chusonji",
    "Naruko Gorge": "place_naruko",
    "Osore-zan Bodai-ji Temple": "place_osore"

};


function translateLandmarkName(name) {

    const key =
        landmarkTranslationKeys[name];

    return key
        ? landmarkT(key, name)
        : name;

}


function translateLandmarkValue(type, value) {

    const key = `landmark_${type}_${String(value)
        .toLowerCase()
        .replaceAll("/", "_")
        .replaceAll(" ", "_")
        .replaceAll("-", "_")
        .replaceAll(",", "")}`; 

    return landmarkT(key, value);

}


/* ================= CORE POPUP FUNCTIONS ================= */

const core = {

    showPopup: function(id) {

        const popup =
            document.getElementById(id);

        if (popup) {
            popup.style.display = "flex";
        }

    },


    hidePopup: function(id) {

        const popup =
            document.getElementById(id);

        if (popup) {
            popup.style.display = "none";
        }

    }

};


/* ================= LANDMARK DATA ================= */

const Landmarks = {

    "Hirosaki Park": {
        "Weekday": 20,
        "Weekend": 95,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Late April-Early May, October"
    },

    "Matsushima Bay": {
        "Weekday": 45,
        "Weekend": 80,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Miyagi",
        "Best time": "April-May, October"
    },

    "Lake Towada": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori/Akita",
        "Best time": "October, Summer"
    },

    "Oirase Gorge": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Late October"
    },

    "Yamadera (Risshaku-ji Temple)": {
        "Weekday": 30,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "October, Summer"
    },

    "Ginzan Onsen": {
        "Weekday": 20,
        "Weekend": 95,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "January-February"
    },

    "Kakunodate Samurai District": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Akita",
        "Best time": "Late April, October"
    },

    "Dewa Sanzan": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Yamagata",
        "Best time": "July-September"
    },

    "Aomori Nebuta Museum Wa Rasse": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Year-round"
    },

    "Shirakami Sanchi": {
        "Weekday": 10,
        "Weekend": 30,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori/Akita",
        "Best time": "June-October"
    },

    "Hakkoda Ropeway": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "Winter, October"
    },

    "Chuson-ji Temple": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Iwate",
        "Best time": "May, October"
    },

    "Naruko Gorge": {
        "Weekday": 20,
        "Weekend": 75,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Miyagi/Yamagata",
        "Best time": "Late October"
    },

    "Osore-zan Bodai-ji Temple": {
        "Weekday": 20,
        "Weekend": 45,
        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,
        "Prefecture": "Aomori",
        "Best time": "July-September"
    }

};


const landmarkMap = {

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

};


const landmarkImageMap = {

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

};


/* ================= POPUP OPEN/CLOSE ================= */

function openLandmarkPopup() {
    core.showPopup("landmarkPopup");
}

function closeLandmarkPopup() {
    core.hidePopup("landmarkPopup");
}

function closeLandmarkResult() {
    core.hidePopup("result-box");
}


function openCrowdPopup() {
    core.showPopup("crowdPopup");
}

function closeCrowdPopup() {
    core.hidePopup("crowdPopup");
}

function closeCrowdResult() {
    core.hidePopup("crowdResult");
}


function openListPopup() {
    core.showPopup("listPopup");
}

function closeListPopup() {
    core.hidePopup("listPopup");
}


function closeListResult() {

    const list =
        document.getElementById("listResult");

    const options =
        document.getElementById("optionsResult");

    if (list) {
        list.style.display = "none";
    }

    if (options) {
        options.style.display = "none";
    }

}


function openRecommendPopup() {
    core.showPopup("recommendPopup");
}

function closeRecommendPopup() {
    core.hidePopup("recommendPopup");
}


function openPopularityPopup() {
    core.showPopup("popularityPopup");
}

function closePopularityPopup() {
    core.hidePopup("popularityPopup");
}


function openRankingPopup() {
    core.showPopup("rankingPopup");
}

function closeRankingPopup() {
    core.hidePopup("rankingPopup");
}


/* ================= OPTION 1 ================= */

async function viewLandmark() {

    const select =
        document.getElementById("landmarkSelect");

    if (!select) {

        console.error(
            "landmarkSelect not found"
        );

        return;

    }


    const shortId =
        select.value;

    const name =
        landmarkMap[shortId];


    if (!name) {

        alert("Landmark not found.");

        return;

    }


    const response =
        await fetch(
            `/landmark-info/${shortId}`
        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;

    }


    const result =
        document.getElementById("result-box");


    result.style.display = "flex";

    result.style.alignItems =
        "flex-start";

    result.style.justifyContent =
        "center";

    result.style.paddingTop =
        "120px";


    const title =
        document.getElementById(
            "landmarkTitle"
        );


    if (title) {

        title.textContent =
            translateLandmarkName(
                data.name
            );

    }


    const prefecture =
        document.getElementById(
            "landmarkPrefecture"
        );


    if (prefecture) {

        prefecture.textContent =
            translateLandmarkValue(
                "prefecture",
                data.prefecture
            );

    }


    const bestTime =
        document.getElementById(
            "landmarkBestTime"
        );


    if (bestTime) {

        bestTime.textContent =
            translateLandmarkValue(
                "best_time",
                data.best_time
            );

    }


    const fees =
        document.getElementById(
            "landmarkFees"
        );


    if (fees) {

        fees.textContent =
            data.fees;

    }


    const imgEl =
        document.getElementById(
            "landmarkImage"
        );


    if (imgEl) {

        imgEl.src =
            "/static/images/" +
            data.image;

    }


    closeLandmarkPopup();


    result.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= OPTION 2 ================= */

async function predictCrowd() {

    const select =
        document.getElementById(
            "crowdLandmark"
        );


    const dayShort =
        document.getElementById(
            "crowdDay"
        ).value;


    const weatherShort =
        document.getElementById(
            "crowdWeather"
        ).value;


    const day =
        dayShort === "weekday"
            ? "Weekday"
            : "Weekend";


    const weather =
        weatherShort === "rainy"
            ? "Rainy"
            : weatherShort === "cloudy"
                ? "Cloudy"
                : "Sunny";


    const shortId =
        select.value;


    const name =
        landmarkMap[shortId];


    if (!name) {

        alert("Landmark not found.");

        return;

    }


    const response =
        await fetch(

            `/landmark-crowd/${shortId}/${day}/${weather}`

        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;

    }


    const crowdResult =
        document.getElementById(
            "crowdResult"
        );


    if (crowdResult) {

        crowdResult.style.display =
            "flex";

        crowdResult.style.justifyContent =
            "center";

        crowdResult.style.alignItems =
            "flex-start";

        crowdResult.style.paddingTop =
            "120px";

    }


    document
        .getElementById("crowdTitle")
        .textContent =
        translateLandmarkName(
            data.name
        );


    document
        .getElementById("crowdPrefecture")
        .textContent =
        translateLandmarkValue(
            "prefecture",
            data.prefecture
        );


    document
        .getElementById("crowdBestTime")
        .textContent =
        translateLandmarkValue(
            "best_time",
            data.best_time
        );


    document
        .getElementById("crowdFees")
        .textContent =
        data.fees;


    document
        .getElementById("crowdStatus")
        .textContent =
        translateLandmarkValue(
            "status",
            data.status
        );


    document
        .getElementById("crowdScore")
        .textContent =
        data.score_text;


    document
        .getElementById("crowdMessage")
        .textContent =
        translateLandmarkValue(
            "message",
            data.message
        );


    const imgEl =
        document.getElementById(
            "crowdImage"
        );


    if (imgEl) {

        imgEl.src =
            "/static/images/" +
            data.image;

    }


    closeCrowdPopup();


    crowdResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= OPTION 3 ================= */

async function showLandmarkList() {

    core.hidePopup("listPopup");


    const optionsResult =
        document.getElementById(
            "optionsResult"
        );


    if (optionsResult) {

        optionsResult.style.display =
            "block";

    }


    document
        .getElementById("optionsTitle")
        .textContent =
        landmarkT(
            "landmark_result_available",
            "Available Landmarks"
        );


    const optionsList =
        document.querySelector(
            ".options-list"
        );


    optionsList.innerHTML = "";


    const response =
        await fetch(
            "/list-all-landmarks-api"
        );


    const landmarks =
        await response.json();


    for (const l of landmarks) {

        const shortId =
            Object.keys(
                landmarkMap
            ).find(

                id =>
                    landmarkMap[id] ===
                    l.name

            );


        const image =
            "/static/images/" +

            (
                shortId
                    ? landmarkImageMap[shortId]
                    : l.image
            );


        const div =
            document.createElement("div");


        div.className =
            "options-item";


        div.innerHTML = `

            <div class="options-item-left">

                <img
                    src="${image}"
                    alt="${l.name}"
                >

            </div>


            <div class="options-item-right">

                <h4>
                    ${translateLandmarkName(l.name)}
                </h4>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_prefecture",
                            "📍 Prefecture:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "prefecture",
                        l.prefecture
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_best_time",
                            "🗓 Best Time:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "best_time",
                        l.best_time
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_fees",
                            "💰 Fees:"
                        )}
                    </strong>

                    ${l.fees}
                </p>

            </div>

        `;


        optionsList.appendChild(div);

    }


    optionsResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= OPTION 4 ================= */

async function getRecommendation() {

    core.hidePopup(
        "recommendPopup"
    );


    const dayShort =
        document.getElementById(
            "recDay"
        ).value;


    const weatherShort =
        document.getElementById(
            "recWeather"
        ).value;


    const order =
        document.getElementById(
            "recOrder"
        ).value;


    const day =
        dayShort === "weekday"
            ? "Weekday"
            : "Weekend";


    const weather =
        weatherShort === "rainy"
            ? "Rainy"
            : weatherShort === "cloudy"
                ? "Cloudy"
                : "Sunny";


    const response =
        await fetch(

            `/landmark-recommendation-ranked-api/${day}/${weather}/${order}`

        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;

    }


    const optionsResult =
        document.getElementById(
            "optionsResult"
        );


    if (optionsResult) {

        optionsResult.style.display =
            "block";

    }


    document
        .getElementById("optionsTitle")
        .textContent =
        landmarkT(
            "landmark_result_recommended",
            "Recommended Landmarks"
        );


    const optionsList =
        document.querySelector(
            ".options-list"
        );


    optionsList.innerHTML = "";


    const landmarks =
        data.landmarks;


    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const l =
            landmarks[i];


        const shortId =
            Object.keys(
                landmarkMap
            ).find(

                id =>
                    landmarkMap[id] ===
                    l.name

            );


        const image =
            "/static/images/" +

            (
                shortId
                    ? landmarkImageMap[shortId]
                    : l.image
            );


        const div =
            document.createElement("div");


        div.className =
            "options-item";


        div.innerHTML = `

            <div class="options-item-left">

                <img
                    src="${image}"
                    alt="${l.name}"
                >

            </div>


            <div class="options-item-right">

                <h4>
                    #${i + 1}
                    ${translateLandmarkName(l.name)}
                </h4>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_prefecture",
                            "📍 Prefecture:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "prefecture",
                        l.prefecture
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_best_time",
                            "🗓 Best Time:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "best_time",
                        l.best_time
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_score",
                            "📊 Score:"
                        )}
                    </strong>

                    ${l.score}
                </p>

            </div>

        `;


        optionsList.appendChild(div);

    }


    optionsResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= OPTION 5 ================= */

async function showPopularity() {

    core.hidePopup(
        "popularityPopup"
    );


    const dayShort =
        document.getElementById(
            "popDay"
        ).value;


    const day =
        dayShort === "weekday"
            ? "Weekday"
            : "Weekend";


    const response =
        await fetch(

            `/landmark-popularity-api/${day}`

        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;

    }


    const optionsResult =
        document.getElementById(
            "optionsResult"
        );


    if (optionsResult) {

        optionsResult.style.display =
            "block";

    }


    document
        .getElementById("optionsTitle")
        .textContent =

        landmarkT(
            "landmark_result_popularity",
            "Landmark Popularity"
        )

        + " (" +

        translateLandmarkValue(
            "day",
            day
        )

        + ")";


    const optionsList =
        document.querySelector(
            ".options-list"
        );


    optionsList.innerHTML = "";


    const landmarks =
        data.landmarks;


    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const l =
            landmarks[i];


        const shortId =
            Object.keys(
                landmarkMap
            ).find(

                id =>
                    landmarkMap[id] ===
                    l.name

            );


        const image =
            "/static/images/" +

            (
                shortId
                    ? landmarkImageMap[shortId]
                    : l.image
            );


        const div =
            document.createElement("div");


        div.className =
            "options-item";


        div.innerHTML = `

            <div class="options-item-left">

                <img
                    src="${image}"
                    alt="${l.name}"
                >

            </div>


            <div class="options-item-right">

                <h4>
                    #${i + 1}
                    ${translateLandmarkName(l.name)}
                </h4>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_prefecture",
                            "📍 Prefecture:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "prefecture",
                        l.prefecture
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_best_time",
                            "🗓 Best Time:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "best_time",
                        l.best_time || "N/A"
                    )}
                </p>

                <p>
                    <strong>
                        📊
                        ${translateLandmarkValue(
                            "day",
                            day
                        )}
                        Score:
                    </strong>

                    ${l.crowd}
                </p>

            </div>

        `;


        optionsList.appendChild(div);

    }


    optionsResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= OPTION 6 ================= */

async function showRanking() {

    core.hidePopup(
        "rankingPopup"
    );


    const dayShort =
        document.getElementById(
            "rankDay"
        ).value;


    const weatherShort =
        document.getElementById(
            "rankWeather"
        ).value;


    const order =
        document.getElementById(
            "rankOrder"
        ).value;


    const day =
        dayShort === "weekday"
            ? "Weekday"
            : "Weekend";


    const weather =
        weatherShort === "rainy"
            ? "Rainy"
            : weatherShort === "cloudy"
                ? "Cloudy"
                : "Sunny";


    const response =
        await fetch(

            `/landmark-ranking-api/${day}/${weather}/${order}`

        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;

    }


    const optionsResult =
        document.getElementById(
            "optionsResult"
        );


    if (optionsResult) {

        optionsResult.style.display =
            "block";

    }


    document
        .getElementById("optionsTitle")
        .textContent =

        landmarkT(
            "landmark_result_ranking",
            "Advanced Ranking"
        )

        + " (" +

        translateLandmarkValue(
            "day",
            day
        )

        + ", " +

        translateLandmarkValue(
            "weather",
            weather
        )

        + ", " +

        translateLandmarkValue(
            "order",
            order
        )

        + ")";


    const optionsList =
        document.querySelector(
            ".options-list"
        );


    optionsList.innerHTML = "";


    const landmarks =
        data.landmarks;


    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const l =
            landmarks[i];


        const shortId =
            Object.keys(
                landmarkMap
            ).find(

                id =>
                    landmarkMap[id] ===
                    l.name

            );


        const image =
            "/static/images/" +

            (
                shortId
                    ? landmarkImageMap[shortId]
                    : l.image
            );


        const div =
            document.createElement("div");


        div.className =
            "options-item";


        div.innerHTML = `

            <div class="options-item-left">

                <img
                    src="${image}"
                    alt="${l.name}"
                >

            </div>


            <div class="options-item-right">

                <h4>
                    #${i + 1}
                    ${translateLandmarkName(l.name)}
                </h4>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_prefecture",
                            "📍 Prefecture:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "prefecture",
                        l.prefecture
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_best_time",
                            "🗓 Best Time:"
                        )}
                    </strong>

                    ${translateLandmarkValue(
                        "best_time",
                        l.best_time
                    )}
                </p>

                <p>
                    <strong>
                        ${landmarkT(
                            "landmark_dynamic_score",
                            "📊 Score:"
                        )}
                    </strong>

                    ${l.score}
                </p>

            </div>

        `;


        optionsList.appendChild(div);

    }


    optionsResult.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= HELPER ================= */

function getLandmarkShortIdFromName(name) {

    return Object.keys(
        landmarkMap
    ).find(

        id =>
            landmarkMap[id] === name

    );

}