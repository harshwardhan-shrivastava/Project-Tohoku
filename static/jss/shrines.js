/* =========================================================
   PROJECT TOHOKU - SHRINE SYSTEM
========================================================= */


/* =========================================================
   SHRINE LANGUAGE HELPERS
========================================================= */

const shrineText = {

    en: {

        availableShrines: "Available Shrines",
        recommendedShrines: "Recommended Shrines",
        shrinePopularity: "Shrine Popularity",
        advancedRanking: "Advanced Ranking",

        prefecture: "📍 Prefecture:",
        weekdayScore: "⛩ Weekday Score:",
        weekendScore: "⛩ Weekend Score:",
        bestTime: "🕒 Best Time:",
        score: "📊 Score:",
        crowdScore: "📊 Crowd Score:",
        eventCost: "💰 Event Cost:",
        status: "📝 Status:",

        weekday: "Weekday",
        weekend: "Weekend",

        sunny: "Sunny",
        cloudy: "Cloudy",
        rainy: "Rainy",

        quiet: "Quiet",
        popular: "Popular",

        veryLowCrowd: "Very Low Crowd",
        moderateCrowd: "Moderate Crowd",
        highCrowd: "High Crowd",

        veryQuietMessage:
            "Great news! Very quiet.",

        moderateMessage:
            "Moderate crowd expected.",

        highMessage:
            "High crowd expected.",

        selectEvent:
            "Please select an event type.",

        validBudget:
            "Please enter a valid budget.",

        noBudgetMatch:
            "No shrines match your budget for this event type.",

        withinBudget:
            "Shrines Within Your Budget",

        wedding: "Wedding",
        blessing: "Blessing",
        festival: "Festival",
        privateEvent: "Private Event",

        miyagi: "Miyagi",
        aomori: "Aomori",

        aoba: "Aoba Shrine",
        osaki: "Osaki Hachimangu Shrine",
        towada: "Towada Shrine",
        kabushima: "Kabushima Shrine"

    },


    ja: {

        availableShrines: "利用可能な神社",
        recommendedShrines: "おすすめの神社",
        shrinePopularity: "神社の人気度",
        advancedRanking: "神社ランキング",

        prefecture: "📍 都道府県:",
        weekdayScore: "⛩ 平日の混雑スコア:",
        weekendScore: "⛩ 週末の混雑スコア:",
        bestTime: "🕒 おすすめの時間:",
        score: "📊 スコア:",
        crowdScore: "📊 混雑スコア:",
        eventCost: "💰 イベント費用:",
        status: "📝 状況:",

        weekday: "平日",
        weekend: "週末",

        sunny: "晴れ",
        cloudy: "曇り",
        rainy: "雨",

        quiet: "静かな順",
        popular: "人気順",

        veryLowCrowd: "非常に空いています",
        moderateCrowd: "やや混雑",
        highCrowd: "混雑しています",

        veryQuietMessage:
            "とても空いています。ゆっくり参拝できます。",

        moderateMessage:
            "適度な混雑が予想されます。",

        highMessage:
            "高い混雑が予想されます。",

        selectEvent:
            "イベントの種類を選択してください。",

        validBudget:
            "有効な予算を入力してください。",

        noBudgetMatch:
            "このイベントと予算に合う神社はありません。",

        withinBudget:
            "予算内で利用できる神社",

        wedding: "結婚式",
        blessing: "祈祷",
        festival: "祭り",
        privateEvent: "貸切イベント",

        miyagi: "宮城県",
        aomori: "青森県",

        aoba: "青葉神社",
        osaki: "大崎八幡宮",
        towada: "十和田神社",
        kabushima: "蕪嶋神社"

    }

};


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */

function shrineLanguage() {

    return localStorage.getItem("tohokuLanguage") === "ja"
        ? "ja"
        : "en";

}


function st(key) {

    return shrineText[shrineLanguage()][key]
        || shrineText.en[key]
        || key;

}


function translateShrineName(name) {

    const names = {

        "Aoba Shrine": "aoba",

        "Osaki Hachimangu Shrine": "osaki",

        "Osaki Hachimangu": "osaki",

        "Towada Shrine": "towada",

        "Kabushima Shrine": "kabushima"

    };


    return names[name]
        ? st(names[name])
        : name;

}


function translatePrefecture(prefecture) {

    if (prefecture === "Miyagi") {
        return st("miyagi");
    }

    if (prefecture === "Aomori") {
        return st("aomori");
    }

    return prefecture;

}


function translateDay(value) {

    const day =
        String(value).toLowerCase();

    if (day.includes("weekend")) {
        return st("weekend");
    }

    return st("weekday");

}


function translateWeather(value) {

    const weather =
        String(value).toLowerCase();

    if (weather.includes("rain")) {
        return st("rainy");
    }

    if (weather.includes("cloud")) {
        return st("cloudy");
    }

    if (weather.includes("sun")) {
        return st("sunny");
    }

    return value;

}


function translateOrder(value) {

    const order =
        String(value).toLowerCase();

    if (order.includes("popular")) {
        return st("popular");
    }

    return st("quiet");

}


function translateEventType(value) {

    const events = {

        "Wedding": "wedding",

        "Blessing": "blessing",

        "Festival": "festival",

        "Private Event": "privateEvent"

    };


    return events[value]
        ? st(events[value])
        : value;

}


function translateCrowdStatus(status) {

    const value =
        String(status).toLowerCase();


    if (value.includes("very low")) {

        return st("veryLowCrowd");

    }


    if (value.includes("moderate")) {

        return st("moderateCrowd");

    }


    if (value.includes("high")) {

        return st("highCrowd");

    }


    return status;

}


function translateCrowdMessage(message) {

    const value =
        String(message).toLowerCase();


    if (value.includes("very quiet")) {

        return st("veryQuietMessage");

    }


    if (value.includes("moderate")) {

        return st("moderateMessage");

    }


    if (value.includes("high crowd")) {

        return st("highMessage");

    }


    return message;

}


/* =========================================================
   CORE POPUP FUNCTIONS
========================================================= */

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


/* =========================================================
   SHRINE DATA
========================================================= */

const Shrines = {

    "Aoba Shrine": {

        "Weekday": 20,
        "Weekend": 60,

        "Rainy": 0.25,
        "Cloudy": 0.5,
        "Sunny": 1,

        "Prefecture": "Miyagi",

        "Best time":
            "8 AM to 11 AM - Expect a decent crowd throughout the week",

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

        "Best time":
            "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

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

        "Best time":
            "10:00 AM - 2:00 PM - Expect a quieter crowd throughout the week",

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

        "Best time":
            "9:30 AM - 11:00 AM - Expect a quieter crowd throughout the week",

        "WeddingCostMin": 50000,
        "WeddingCostMax": 100000,

        "BlessingCostMin": 5000,
        "BlessingCostMax": 10000,

        "FestivalCostMin": 20000,
        "FestivalCostMax": 50000,

        "PrivateEventCostMin": 30000,
        "PrivateEventCostMax": 70000

    }

};


const shrineMap = {

    "aoba": "Aoba Shrine",

    "osaki": "Osaki Hachimangu Shrine",

    "towada": "Towada Shrine",

    "kabushima": "Kabushima Shrine"

};


const shrineImageMap = {

    "aoba": "/static/images/shrine1.jpg",

    "osaki": "/static/images/shrine2.jpg",

    "towada": "/static/images/shrine3.jpg",

    "kabushima": "/static/images/shrine4.jpg"

};


/* =========================================================
   POPUP OPEN / CLOSE
========================================================= */

function openShrinePopup() {

    core.showPopup("shrinePopup");

}


function closeShrinePopup() {

    core.hidePopup("shrinePopup");

}


function closeShrineResult() {

    const resultBox =
        document.getElementById("result-box");

    if (resultBox) {

        resultBox.classList.remove("show");

        resultBox.style.display = "none";

    }

}


function openCrowdPopup() {

    core.showPopup("crowdPopup");

}


function closeCrowdPopup() {

    core.hidePopup("crowdPopup");

}


function closeCrowdResult() {

    const crowdResult =
        document.getElementById("crowdResult");

    if (crowdResult) {

        crowdResult.classList.remove("show");

        crowdResult.style.display = "none";

    }

}


function openListPopup() {

    core.showPopup("listPopup");

}


function closeListPopup() {

    core.hidePopup("listPopup");

}


function closeOptionsResult() {

    const optionsResult =
        document.getElementById("optionsResult");

    if (optionsResult) {

        optionsResult.style.display = "none";

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


function openEventPlannerPopup() {

    core.showPopup("eventPlannerPopup");

}


function closeEventPlannerPopup() {

    core.hidePopup("eventPlannerPopup");

}


/* =========================================================
   OPTION 1 - VIEW SHRINE INFO
========================================================= */

function viewShrine() {

    const select =
        document.getElementById("shrineSelect");


    if (!select) {

        console.error("shrineSelect not found");

        return;

    }


    const shortId =
        select.value;


    fetch(`/shrine-info/${shortId}`)

        .then(response => response.json())

        .then(data => {


            if (data.error) {

                alert(data.error);

                return;

            }


            const resultBox =
                document.getElementById("result-box");


            if (!resultBox) {

                console.error("result-box not found");

                return;

            }


            resultBox.style.display = "";

            resultBox.classList.add("show");


            document
                .getElementById("shrineTitle")
                .textContent =
                translateShrineName(data.name);


            document
                .getElementById("shrinePrefecture")
                .textContent =
                translatePrefecture(data.prefecture);


            document
                .getElementById("shrineBestTime")
                .textContent =
                data.best_time;


            document
                .getElementById("shrineWedding")
                .textContent =
                `¥${data.wedding_min} – ¥${data.wedding_max}`;


            document
                .getElementById("shrineBlessing")
                .textContent =
                `¥${data.blessing_min} – ¥${data.blessing_max}`;


            document
                .getElementById("shrineFestival")
                .textContent =
                `¥${data.festival_min} – ¥${data.festival_max}`;


            document
                .getElementById("shrinePrivate")
                .textContent =
                `¥${data.private_min} – ¥${data.private_max}`;


            document
                .getElementById("shrineImage")
                .src =
                `/static/images/${data.image}`;


            closeShrinePopup();

        })

        .catch(error => {

            console.error(
                "Shrine info error:",
                error
            );

        });

}


/* =========================================================
   OPTION 2 - CROWD PREDICTOR
========================================================= */

function calculateShrineCrowd(data, day, weather) {

    const score =
        data[day] * data[weather];


    let status;

    let message;


    if (score < 15) {

        status =
            st("veryLowCrowd");

        message =
            st("veryQuietMessage");

    }

    else if (score < 50) {

        status =
            st("moderateCrowd");

        message =
            st("moderateMessage");

    }

    else {

        status =
            st("highCrowd");

        message =
            st("highMessage");

    }


    return {

        score,

        status,

        message

    };

}


function predictCrowd() {

    const select =
        document.getElementById("crowdShrine");

    const day =
        document.getElementById("crowdDay").value;

    const weather =
        document.getElementById("crowdWeather").value;


    const shortId =
        select.value;


    fetch(
        `/crowd/${shortId}/${day}/${weather}`
    )

        .then(response => response.json())

        .then(data => {


            if (data.error) {

                alert(data.error);

                return;

            }


            const crowdResult =
                document.getElementById("crowdResult");


            if (crowdResult) {

                crowdResult.style.display = "flex";

                crowdResult.classList.add("show");

            }


            document
                .getElementById("crowdTitle")
                .textContent =
                translateShrineName(data.name);


            document
                .getElementById("crowdStatus")
                .textContent =
                translateCrowdStatus(data.status);


            document
                .getElementById("crowdScore")
                .textContent =
                Math.round(data.score) + "%";


            document
                .getElementById("crowdMessage")
                .textContent =
                translateCrowdMessage(data.message);


            document
                .getElementById("crowdImage")
                .src =
                shrineImageMap[shortId]
                || "/static/images/default_shrine.jpg";


            closeCrowdPopup();

        })

        .catch(error => {

            console.error(
                "Crowd predictor error:",
                error
            );

        });

}


/* =========================================================
   OPTION 3 - LIST SHRINES
========================================================= */

function showShrineList() {

    fetch("/list-all-shrines-api")

        .then(response => response.json())

        .then(data => {


            core.hidePopup("listPopup");


            const optionsResult =
                document.getElementById("optionsResult");


            optionsResult.style.display = "block";


            document
                .getElementById("optionsTitle")
                .textContent =
                st("availableShrines");


            const optionsList =
                document.querySelector(".options-list");


            optionsList.innerHTML = "";


            data.forEach(shrine => {


                const div =
                    document.createElement("div");


                div.className =
                    "options-item";


                div.innerHTML = `

                    <div class="options-item-left">

                        <img
                            src="/static/images/${shrine.image}"
                            alt="${shrine.name}"
                        >

                    </div>


                    <div class="options-item-right">

                        <h4>
                            ${translateShrineName(shrine.name)}
                        </h4>

                        <p>
                            <strong>${st("prefecture")}</strong>
                            ${translatePrefecture(shrine.prefecture)}
                        </p>

                        <p>
                            <strong>${st("weekdayScore")}</strong>
                            ${shrine.weekday}
                        </p>

                        <p>
                            <strong>${st("weekendScore")}</strong>
                            ${shrine.weekend}
                        </p>

                    </div>

                `;


                optionsList.appendChild(div);

            });

        })

        .catch(error => {

            console.error(
                "Shrine list error:",
                error
            );

        });

}


/* =========================================================
   OPTION 4 - RECOMMENDATION
========================================================= */

function getRecommendation() {

    const day =
        document.getElementById("recDay").value;

    const weather =
        document.getElementById("recWeather").value;

    const order =
        document.getElementById("recOrder").value;


    fetch(
        `/recommendation-ranked-api/${day}/${weather}/${order}`
    )

        .then(response => response.json())

        .then(data => {


            core.hidePopup("recommendPopup");


            const optionsResult =
                document.getElementById("optionsResult");


            optionsResult.style.display = "block";


            document
                .getElementById("optionsTitle")
                .textContent =
                st("recommendedShrines");


            const optionsList =
                document.querySelector(".options-list");


            optionsList.innerHTML = "";


            data.shrines.forEach(
                (shrine, index) => {


                    const div =
                        document.createElement("div");


                    div.className =
                        "options-item";


                    div.innerHTML = `

                        <div class="options-item-left">

                            <img
                                src="/static/images/${shrine.image}"
                                alt="${shrine.name}"
                            >

                        </div>


                        <div class="options-item-right">

                            <h4>
                                #${index + 1}
                                ${translateShrineName(shrine.name)}
                            </h4>

                            <p>
                                <strong>${st("prefecture")}</strong>
                                ${translatePrefecture(shrine.prefecture)}
                            </p>

                            <p>
                                <strong>${st("bestTime")}</strong>
                                ${shrine.best_time}
                            </p>

                            <p>
                                <strong>${st("score")}</strong>
                                ${shrine.score}
                            </p>

                        </div>

                    `;


                    optionsList.appendChild(div);

                }
            );

        })

        .catch(error => {

            console.error(
                "Recommendation error:",
                error
            );

        });

}


/* =========================================================
   OPTION 5 - POPULARITY
========================================================= */

function showPopularity() {

    const day =
        document.getElementById("popDay").value;


    fetch(`/popularity-api/${day}`)

        .then(response => response.json())

        .then(data => {


            core.hidePopup("popularityPopup");


            const optionsResult =
                document.getElementById("optionsResult");


            optionsResult.style.display = "block";


            document
                .getElementById("optionsTitle")
                .textContent =
                `${st("shrinePopularity")} (${translateDay(data.day)})`;


            const optionsList =
                document.querySelector(".options-list");


            optionsList.innerHTML = "";


            data.shrines.forEach(
                (shrine, index) => {


                    const div =
                        document.createElement("div");


                    div.className =
                        "options-item";


                    div.innerHTML = `

                        <div class="options-item-left">

                            <img
                                src="/static/images/${shrine.image}"
                                alt="${shrine.name}"
                            >

                        </div>


                        <div class="options-item-right">

                            <h4>
                                #${index + 1}
                                ${translateShrineName(shrine.name)}
                            </h4>

                            <p>
                                <strong>${st("prefecture")}</strong>
                                ${translatePrefecture(shrine.prefecture)}
                            </p>

                            <p>
                                <strong>${st("crowdScore")}</strong>
                                ${shrine.crowd}
                            </p>

                        </div>

                    `;


                    optionsList.appendChild(div);

                }
            );

        })

        .catch(error => {

            console.error(
                "Popularity error:",
                error
            );

        });

}


/* =========================================================
   OPTION 6 - ADVANCED RANKING
========================================================= */

function showRanking() {

    const day =
        document.getElementById("rankDay").value;

    const weather =
        document.getElementById("rankWeather").value;

    const order =
        document.getElementById("rankOrder").value;


    fetch(
        `/ranking-api/${day}/${weather}/${order}`
    )

        .then(response => response.json())

        .then(data => {


            core.hidePopup("rankingPopup");


            const optionsResult =
                document.getElementById("optionsResult");


            optionsResult.style.display = "block";


            document
                .getElementById("optionsTitle")
                .textContent =

                `${st("advancedRanking")} (` +
                `${translateDay(data.day)}, ` +
                `${translateWeather(data.weather)}, ` +
                `${translateOrder(data.order)})`;


            const optionsList =
                document.querySelector(".options-list");


            optionsList.innerHTML = "";


            data.shrines.forEach(
                (shrine, index) => {


                    const div =
                        document.createElement("div");


                    div.className =
                        "options-item";


                    div.innerHTML = `

                        <div class="options-item-left">

                            <img
                                src="/static/images/${shrine.image}"
                                alt="${shrine.name}"
                            >

                        </div>


                        <div class="options-item-right">

                            <h4>
                                #${index + 1}
                                ${translateShrineName(shrine.name)}
                            </h4>

                            <p>
                                <strong>${st("prefecture")}</strong>
                                ${translatePrefecture(shrine.prefecture)}
                            </p>

                            <p>
                                <strong>${st("bestTime")}</strong>
                                ${shrine.best_time}
                            </p>

                            <p>
                                <strong>${st("score")}</strong>
                                ${shrine.score}
                            </p>

                        </div>

                    `;


                    optionsList.appendChild(div);

                }
            );

        })

        .catch(error => {

            console.error(
                "Ranking error:",
                error
            );

        });

}


/* =========================================================
   OPTION 7 - EVENT PLANNER
========================================================= */

function showEventPlanner() {

    const eventType =
        document.getElementById("eventType").value;

    const budget =
        document.getElementById("eventBudget").value;


    if (!eventType) {

        alert(st("selectEvent"));

        return;

    }


    if (!budget || Number(budget) <= 0) {

        alert(st("validBudget"));

        return;

    }


    fetch(
        `/event-planner-api/${eventType}/${budget}`
    )

        .then(response => response.json())

        .then(data => {


            core.hidePopup("eventPlannerPopup");


            const optionsResult =
                document.getElementById("optionsResult");


            optionsResult.style.display = "block";


            document
                .getElementById("optionsTitle")
                .textContent =

                `${translateEventType(eventType)} - ` +
                `${st("withinBudget")} (¥${budget})`;


            const optionsList =
                document.querySelector(".options-list");


            optionsList.innerHTML = "";


            if (data.length === 0) {


                optionsList.innerHTML = `

                    <div class="options-item">

                        <p>
                            ${st("noBudgetMatch")}
                        </p>

                    </div>

                `;


                return;

            }


            data.forEach(shrine => {


                const div =
                    document.createElement("div");


                div.className =
                    "options-item";


                div.innerHTML = `

                    <div class="options-item-left">

                        <img
                            src="/static/images/${shrine.image}"
                            alt="${shrine.name}"
                        >

                    </div>


                    <div class="options-item-right">

                        <h4>
                            ${translateShrineName(shrine.name)}
                        </h4>

                        <p>
                            <strong>${st("prefecture")}</strong>
                            ${translatePrefecture(shrine.prefecture)}
                        </p>

                        <p>
                            <strong>${st("bestTime")}</strong>
                            ${shrine.best_time}
                        </p>

                        <p>
                            <strong>${st("eventCost")}</strong>
                            ¥${shrine.minimum} – ¥${shrine.maximum}
                        </p>

                        <p>
                            <strong>${st("status")}</strong>
                            ${shrine.status}
                        </p>

                    </div>

                `;


                optionsList.appendChild(div);

            });

        })

        .catch(error => {

            console.error(
                "Event planner error:",
                error
            );

        });

}