document.addEventListener("DOMContentLoaded", () => {

    const avatarPopup =
        document.getElementById("profileAvatarPopup");

    const avatarConfirmPopup =
        document.getElementById("profileAvatarConfirmPopup");

    const openAvatarPicker =
        document.getElementById("profileOpenAvatarPicker");

    const closeAvatarPicker =
        document.getElementById("profileCloseAvatarPicker");

    const avatarOptions =
        document.querySelectorAll(".profile-avatar-option");

    const confirmAvatarImage =
        document.getElementById("profileConfirmAvatarImage");

    const confirmAvatar =
        document.getElementById("profileConfirmAvatar");

    const cancelAvatar =
        document.getElementById("profileCancelAvatar");

    const selectedAvatarPreview =
        document.getElementById("profileSelectedAvatarPreview");

    const selectedAvatarInput =
        document.getElementById("profileSelectedAvatarInput");


    let pendingAvatar = null;
    let pendingAvatarSrc = null;
    let pendingAvatarNumber = null;


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
            pendingAvatarNumber = avatar.dataset.avatarFrame;

            confirmAvatarImage.src = pendingAvatarSrc;

            avatarPopup.classList.remove("active");
            avatarConfirmPopup.classList.add("active");

        });

    });


    // CONFIRM NEW AVATAR

    confirmAvatar.addEventListener("click", () => {

        if (!pendingAvatar) {
            return;
        }

        selectedAvatarInput.value = pendingAvatar;
        selectedAvatarPreview.src = pendingAvatarSrc;

        selectedAvatarPreview.className = "";

const avatarClass = pendingAvatar.replace(".png", "");

selectedAvatarPreview.classList.add(
    `profile-selected-${avatarClass}`
);

        avatarOptions.forEach((avatar) => {

            avatar.classList.remove("current-avatar");

            if (avatar.dataset.avatar === pendingAvatar) {

                avatar.classList.add("current-avatar");

            }

        });


        avatarConfirmPopup.classList.remove("active");


        pendingAvatar = null;
        pendingAvatarSrc = null;
        pendingAvatarNumber = null;

    });


    // CANCEL AVATAR

    cancelAvatar.addEventListener("click", () => {

        avatarConfirmPopup.classList.remove("active");
        avatarPopup.classList.add("active");

    });


    // CLOSE GALLERY BACKGROUND

    avatarPopup.addEventListener("click", (event) => {

        if (event.target === avatarPopup) {

            avatarPopup.classList.remove("active");

        }

    });


    // CLOSE CONFIRMATION BACKGROUND

    avatarConfirmPopup.addEventListener("click", (event) => {

        if (event.target === avatarConfirmPopup) {

            avatarConfirmPopup.classList.remove("active");
            avatarPopup.classList.add("active");

        }

    });

});