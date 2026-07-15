/* ================= CORE POPUP FUNCTIONS ================= */

const core = {
    showPopup: function(id) {
        const popup = document.getElementById(id);

        if (popup) {
            popup.style.display = "flex";
        }
    },

    hidePopup: function(id) {
        const popup = document.getElementById(id);

        if (popup) {
            popup.style.display = "none";
        }
    }
};


/* ================= LANGUAGE HELPERS ================= */

function getTheaterLanguage() {
    return localStorage.getItem("tohokuLanguage") || "en";
}


function getTheaterTranslation(key, fallback = "") {

    const language = getTheaterLanguage();

    if (
        typeof translations !== "undefined" &&
        translations[language] &&
        translations[language][key] !== undefined
    ) {
        return translations[language][key];
    }

    return fallback;
}


function getTheaterValueTranslation(type, value) {

    if (!value) {
        return "";
    }

    const normalizedValue = String(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");

    const key =
        `theater_${type}_${normalizedValue}`;

    return getTheaterTranslation(
        key,
        value
    );
}


/* ================= THEATER TRANSLATION MAP ================= */

const theaterTranslationMap = {

    "Toho Cinemas Sendai":
        "toho_sendai",

    "Forum Morioka":
        "forum_morioka",

    "Movix Sendai":
        "movix_sendai",

    "Warner Mycal Cinemas Hirosaki":
        "warner_hirosaki",

    "Forum Yamagata":
        "forum_yamagata",

    "Forum Sendai":
        "forum_sendai",

    "Toho Cinemas Akita":
        "toho_akita",

    "109 Cinemas Tomiya":
        "109_tomiya"
};


function getTheaterDataTranslations(data) {

    const theaterKey =
        theaterTranslationMap[data.name];


    return {

        name:
            theaterKey
                ? getTheaterTranslation(
                    `theater_name_${theaterKey}`,
                    data.name
                )
                : data.name,


        prefecture:
            getTheaterValueTranslation(
                "prefecture",
                data.prefecture
            ),


        ratings:
            data.ratings,


        station:
            theaterKey
                ? getTheaterTranslation(
                    `theater_${theaterKey}_station`,
                    data.station
                )
                : data.station,


        landmark:
            theaterKey
                ? getTheaterTranslation(
                    `theater_${theaterKey}_landmark`,
                    data.landmark
                )
                : data.landmark,


        imax:
            getTheaterValueTranslation(
                "imax",
                data.imax
            ),


        access:
            theaterKey
                ? getTheaterTranslation(
                    `theater_${theaterKey}_access`,
                    data.access
                )
                : data.access
    };
}


/* ================= POPUP OPEN/CLOSE ================= */

function openTheaterInfoPopup() {
    core.showPopup("theaterInfoPopup");
}


function closeTheaterInfoPopup() {
    core.hidePopup("theaterInfoPopup");
}


function closeTheaterInfoResult() {
    core.hidePopup("theaterInfoResult");
}


function openImaxPopup() {
    core.showPopup("imaxPopup");
}


function closeImaxPopup() {
    core.hidePopup("imaxPopup");
}


function closeImaxResult() {
    core.hidePopup("imaxResult");
}


/* ================= OPTION 1: VIEW THEATER INFO ================= */

async function viewTheaterInfo() {

    const select =
        document.getElementById(
            "theaterSelect"
        );


    if (!select) {

        console.error(
            "theaterSelect not found"
        );

        return;
    }


    const theaterId =
        select.value;


    const response =
        await fetch(
            `/theater-info/${theaterId}`
        );


    const data =
        await response.json();


    if (data.error) {

        alert(data.error);

        return;
    }


    const resultBox =
        document.getElementById(
            "theaterInfoResult"
        );


    if (!resultBox) {

        console.error(
            "theaterInfoResult not found"
        );

        return;
    }


    const translated =
        getTheaterDataTranslations(data);


    closeTheaterInfoPopup();


    resultBox.style.display =
        "flex";


    document.getElementById(
        "theaterInfoTitle"
    ).textContent =
        translated.name;


    document.getElementById(
        "theaterInfoPrefecture"
    ).textContent =
        translated.prefecture;


    document.getElementById(
        "theaterInfoRatings"
    ).textContent =
        translated.ratings;


    document.getElementById(
        "theaterInfoStation"
    ).textContent =
        translated.station;


    document.getElementById(
        "theaterInfoLandmark"
    ).textContent =
        translated.landmark;


    document.getElementById(
        "theaterInfoImax"
    ).textContent =
        translated.imax;


    document.getElementById(
        "theaterInfoAccess"
    ).textContent =
        translated.access;


    const imgEl =
        document.getElementById(
            "theaterInfoImage"
        );


    if (imgEl) {

        const imgMap = {

            "Toho Cinemas Sendai":
                "theater1.jpg",

            "Forum Morioka":
                "theater2.png",

            "Movix Sendai":
                "theater3.jpg",

            "Warner Mycal Cinemas Hirosaki":
                "theater4.jpg",

            "Forum Yamagata":
                "theater5.jpg",

            "Forum Sendai":
                "theater6.jpg",

            "Toho Cinemas Akita":
                "theater7.jpg",

            "109 Cinemas Tomiya":
                "theater8.jpg"
        };


        imgEl.src =
            "/static/images/" +
            (
                imgMap[data.name] ||
                "default_theater.jpg"
            );
    }


    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ================= OPTION 2: IMAX OR NOT ================= */

async function showImaxTheaters() {

    core.hidePopup(
        "imaxPopup"
    );


    const imaxResult =
        document.getElementById(
            "imaxResult"
        );


    if (!imaxResult) {

        console.error(
            "imaxResult not found"
        );

        return;
    }


    imaxResult.style.display =
        "flex";


    document.getElementById(
        "imaxTitle"
    ).textContent =
        getTheaterTranslation(
            "theater_result_imax_title",
            "IMAX Theaters in Tohoku"
        );


    const imaxList =
        document.getElementById(
            "imaxTheatersList"
        );


    imaxList.innerHTML =
        "";


    const response =
        await fetch(
            "/imax-theaters-api"
        );


    const theaters =
        await response.json();


    if (
        !theaters ||
        theaters.length === 0
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "options-item";


        div.innerHTML = `
            <p>
                ${getTheaterTranslation(
                    "theater_result_no_imax",
                    "No IMAX theaters found in the data."
                )}
            </p>
        `;


        imaxList.appendChild(
            div
        );


        imaxResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        return;
    }


    const imgMap = {

        "Toho Cinemas Sendai":
            "theater1.jpg",

        "Forum Morioka":
            "theater2.png",

        "Movix Sendai":
            "theater3.jpg",

        "Warner Mycal Cinemas Hirosaki":
            "theater4.jpg",

        "Forum Yamagata":
            "theater5.jpg",

        "Forum Sendai":
            "theater6.jpg",

        "Toho Cinemas Akita":
            "theater7.jpg",

        "109 Cinemas Tomiya":
            "theater8.jpg"
    };


    const prefectureLabel =
        getTheaterTranslation(
            "theater_dynamic_prefecture",
            "📍 Prefecture:"
        );


    const stationLabel =
        getTheaterTranslation(
            "theater_dynamic_station",
            "🚉 Nearest Station:"
        );


    const landmarkLabel =
        getTheaterTranslation(
            "theater_dynamic_landmark",
            "🏞 Nearest Landmark:"
        );


    const accessLabel =
        getTheaterTranslation(
            "theater_dynamic_access",
            "🚶 Access:"
        );


    for (
        let i = 0;
        i < theaters.length;
        i++
    ) {

        const t =
            theaters[i];


        const translated =
            getTheaterDataTranslations(t);


        const imgFile =
            imgMap[t.name] ||
            "default_theater.jpg";


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "options-item";


        div.innerHTML = `
            <div class="options-item-left">

                <img
                    src="/static/images/${imgFile}"
                    alt="${translated.name}"
                >

            </div>


            <div class="options-item-right">

                <h4>
                    #${i + 1} ${translated.name}
                </h4>


                <p>
                    <strong>
                        ${prefectureLabel}
                    </strong>

                    ${translated.prefecture}
                </p>


                <p>
                    <strong>
                        ${stationLabel}
                    </strong>

                    ${translated.station}
                </p>


                <p>
                    <strong>
                        ${landmarkLabel}
                    </strong>

                    ${translated.landmark}
                </p>


                <p>
                    <strong>
                        ${accessLabel}
                    </strong>

                    ${translated.access}
                </p>

            </div>
        `;


        imaxList.appendChild(
            div
        );
    }


    imaxResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ================= LANGUAGE CHANGE ================= */

document.addEventListener(
    "tohokuLanguageChanged",
    () => {

        const theaterInfoResult =
            document.getElementById(
                "theaterInfoResult"
            );


        const imaxResult =
            document.getElementById(
                "imaxResult"
            );


        if (
            theaterInfoResult &&
            theaterInfoResult.style.display !== "none"
        ) {

            viewTheaterInfo();
        }


        if (
            imaxResult &&
            imaxResult.style.display !== "none"
        ) {

            showImaxTheaters();
        }

    }
);