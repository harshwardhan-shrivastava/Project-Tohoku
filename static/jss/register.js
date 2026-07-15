document.addEventListener("DOMContentLoaded", () => {

    const avatarPopup = document.getElementById("avatarPopup");
    const avatarConfirmPopup = document.getElementById("avatarConfirmPopup");

    const openAvatarPicker = document.getElementById("openAvatarPicker");
    const closeAvatarPicker = document.getElementById("closeAvatarPicker");

    const avatarOptions = document.querySelectorAll(
        ".avatar-gallery .avatar-option"
    );

    const confirmAvatarImage = document.getElementById("confirmAvatarImage");

    const confirmAvatar = document.getElementById("confirmAvatar");
    const cancelAvatar = document.getElementById("cancelAvatar");

    const selectedAvatarPreview = document.getElementById(
        "selectedAvatarPreview"
    );

    const selectedAvatarInput = document.getElementById(
        "selectedAvatarInput"
    );

    let pendingAvatar = null;
    let pendingAvatarSrc = null;
    let pendingAvatarFrame = null;


    // OPEN AVATAR GALLERY

    openAvatarPicker.addEventListener("click", () => {

        avatarPopup.classList.add("active");

    });


    // CLOSE AVATAR GALLERY

    closeAvatarPicker.addEventListener("click", () => {

        avatarPopup.classList.remove("active");

    });


    // CLICK AVATAR

    avatarOptions.forEach((avatar) => {

        avatar.addEventListener("click", () => {

            const image = avatar.querySelector("img");

            pendingAvatar = avatar.dataset.avatar;
            pendingAvatarSrc = image.src;
            pendingAvatarFrame = avatar.dataset.avatarFrame;

            confirmAvatarImage.src = pendingAvatarSrc;

            avatarPopup.classList.remove("active");
            avatarConfirmPopup.classList.add("active");

        });

    });


    // CONFIRM AVATAR

    confirmAvatar.addEventListener("click", () => {

        if (!pendingAvatar) {
            return;
        }

        selectedAvatarInput.value = pendingAvatar;
        selectedAvatarPreview.src = pendingAvatarSrc;

        selectedAvatarPreview.className = "";

        if (pendingAvatarFrame) {
    selectedAvatarPreview.classList.add(
        `selected-${pendingAvatarFrame}`
    );
}

        avatarConfirmPopup.classList.remove("active");

        pendingAvatar = null;
        pendingAvatarSrc = null;
        pendingAvatarFrame = null;

    });


    // CANCEL AVATAR

    cancelAvatar.addEventListener("click", () => {

        avatarConfirmPopup.classList.remove("active");
        avatarPopup.classList.add("active");

    });


    // CLOSE GALLERY BY CLICKING BACKGROUND

    avatarPopup.addEventListener("click", (event) => {

        if (event.target === avatarPopup) {

            avatarPopup.classList.remove("active");

        }

    });


    // CLOSE CONFIRMATION BY CLICKING BACKGROUND

    avatarConfirmPopup.addEventListener("click", (event) => {

        if (event.target === avatarConfirmPopup) {

            avatarConfirmPopup.classList.remove("active");
            avatarPopup.classList.add("active");

        }

    });

// ==========================================================
// LOGIN POPUP
// ==========================================================

const loginPopup = document.getElementById("loginPopup");
const openLoginPopup = document.getElementById("openLoginPopup");
const closeLoginPopup = document.getElementById("closeLoginPopup");


openLoginPopup.addEventListener("click", (event) => {

    event.preventDefault();

    loginPopup.classList.add("active");

});


closeLoginPopup.addEventListener("click", () => {

    loginPopup.classList.remove("active");

});


loginPopup.addEventListener("click", (event) => {

    if (event.target === loginPopup) {

        loginPopup.classList.remove("active");

    }

});


// ==========================================================
// FORGOT PASSWORD POPUP
// ==========================================================

const forgotPasswordPopup = document.getElementById(
    "forgotPasswordPopup"
);

const openForgotPassword = document.getElementById(
    "openForgotPassword"
);

const closeForgotPassword = document.getElementById(
    "closeForgotPassword"
);


openForgotPassword.addEventListener("click", () => {

    loginPopup.classList.remove("active");

    forgotPasswordPopup.classList.add("active");

});


closeForgotPassword.addEventListener("click", () => {

    forgotPasswordPopup.classList.remove("active");

});


forgotPasswordPopup.addEventListener("click", (event) => {

    if (event.target === forgotPasswordPopup) {

        forgotPasswordPopup.classList.remove("active");

    }

});


});