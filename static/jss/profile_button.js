document.addEventListener("DOMContentLoaded", () => {

    const profileButton =
        document.getElementById("profileMenuButton") ||
        document.getElementById("guestProfileButton");

    const profilePanel =
        document.getElementById("profilePanel");

    const profileOverlay =
        document.getElementById("profilePanelOverlay");

    const guestMessage =
        document.getElementById("guestProfileMessage");


    /* =========================================
       LANGUAGE POPUP
    ========================================= */

    const openLanguagePopup =
        document.getElementById("openLanguagePopup");

    const languagePopup =
        document.getElementById("languagePopup");

    const closeLanguagePopup =
        document.getElementById("closeLanguagePopup");


    /* =========================================
       PROFILE PANEL
    ========================================= */

    function openProfilePanel() {

        if (!profilePanel || !profileOverlay) return;

        profilePanel.classList.add("active");
        profileOverlay.classList.add("active");

        if (guestMessage) {
            guestMessage.classList.add("hidden");
        }

    }


    function closeProfilePanel() {

        if (!profilePanel || !profileOverlay) return;

        profilePanel.classList.remove("active");
        profileOverlay.classList.remove("active");

        if (languagePopup) {
            languagePopup.classList.remove("active");
        }

    }


    if (profileButton) {

        profileButton.addEventListener("click", (event) => {

            event.preventDefault();

            openProfilePanel();

        });

    }


    /* =========================================
       LANGUAGE POPUP OPEN
    ========================================= */

    if (openLanguagePopup && languagePopup) {

        openLanguagePopup.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            languagePopup.classList.add("active");

        });

    }


    /* =========================================
       LANGUAGE POPUP CLOSE
    ========================================= */

    if (closeLanguagePopup && languagePopup) {

        closeLanguagePopup.addEventListener("click", () => {

            languagePopup.classList.remove("active");

        });

    }


    /* =========================================
       OVERLAY
    ========================================= */

    if (profileOverlay) {

        profileOverlay.addEventListener("click", () => {

            if (
                languagePopup &&
                languagePopup.classList.contains("active")
            ) {

                languagePopup.classList.remove("active");

                return;

            }

            closeProfilePanel();

        });

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                languagePopup &&
                languagePopup.classList.contains("active")
            ) {

                languagePopup.classList.remove("active");

                return;

            }

            closeProfilePanel();

        }

    });


    /* =========================================
       GUEST MESSAGE
    ========================================= */

    if (guestMessage) {

        setTimeout(() => {

            guestMessage.classList.add("hidden");

        }, 6000);

    }


    /* =========================================
       PROFILE UPDATE TOAST
    ========================================= */

    const profileUpdateToast =
        document.getElementById("profileUpdateToast");

    const closeProfileUpdateToast =
        document.getElementById("closeProfileUpdateToast");


    if (closeProfileUpdateToast && profileUpdateToast) {

        closeProfileUpdateToast.addEventListener("click", () => {

            profileUpdateToast.remove();

        });

    }


    if (profileUpdateToast) {

        setTimeout(() => {

            profileUpdateToast.remove();

        }, 2250);

    }

/* =========================================
   GUEST AVATAR LOGIN POPUP
========================================= */

const guestAvatarMenu =
    document.getElementById("guestAvatarMenu");

const guestAvatarPopup =
    document.getElementById("guestAvatarPopup");

const closeGuestAvatarPopup =
    document.getElementById("closeGuestAvatarPopup");


if (
    guestAvatarMenu &&
    guestAvatarPopup &&
    closeGuestAvatarPopup
) {

    guestAvatarMenu.addEventListener("click", () => {

    profilePanel.classList.remove("active");

    guestAvatarPopup.classList.add("active");

});


    closeGuestAvatarPopup.addEventListener("click", () => {

    guestAvatarPopup.classList.remove("active");

    profileOverlay.classList.remove("active");

});


    guestAvatarPopup.addEventListener("click", (event) => {

        if (event.target === guestAvatarPopup) {

    guestAvatarPopup.classList.remove("active");

    profileOverlay.classList.remove("active");

}

    });

}


});