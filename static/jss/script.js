// =========================
// START BUTTON
// =========================

const startBtn = document.getElementById("startBtn");
const cards = document.getElementById("cards");

startBtn.addEventListener("click", function (e) {

    e.preventDefault();

    cards.scrollIntoView({
        behavior: "smooth"
    });

});

// =========================
// NAVBAR SMOOTH SCROLL
// =========================

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// =========================
// LANDMARK VIEW MORE
// =========================

const btn = document.getElementById("toggleBtn");
const more = document.getElementById("moreLandmarks");

btn.addEventListener("click", function () {

    if (more.style.display === "grid") {

        more.style.display = "none";
        btn.innerHTML = "View More";

    } else {

        more.style.display = "grid";
        btn.innerHTML = "View Less";

    }

});

// =========================
// THEATER VIEW MORE
// =========================

const theaterBtn = document.getElementById("theaterToggleBtn");
const moreTheaters = document.getElementById("moreTheaters");

if (theaterBtn && moreTheaters) {

    theaterBtn.addEventListener("click", function () {

        if (moreTheaters.style.display === "grid") {

            moreTheaters.style.display = "none";
            theaterBtn.innerHTML = "View More";

        } else {

            moreTheaters.style.display = "grid";
            theaterBtn.innerHTML = "View Less";

        }

    });

}