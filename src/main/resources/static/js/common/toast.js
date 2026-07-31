let toastContainer;

/* =====================================
        CREATE CONTAINER
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    toastContainer =
        document.createElement("div");

    toastContainer.className =
        "toast-container";

    document.body.appendChild(toastContainer);

});

/* =====================================
        SHOW TOAST
===================================== */

function showToast(

    type,

    title,

    message,

    duration = 3000

){

    const icons = {

        success:"fa-circle-check",

        error:"fa-circle-xmark",

        warning:"fa-triangle-exclamation",

        info:"fa-circle-info"

    };

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.innerHTML =

    `
        <i class="fa-solid ${icons[type]}"></i>

        <div class="toast-message">

            <h4>${title}</h4>

            <p>${message}</p>

        </div>

        <i class="fa-solid fa-xmark toast-close"></i>

    `;

    toastContainer.appendChild(toast);

    toast.querySelector(".toast-close")

        .onclick = () => removeToast(toast);

    setTimeout(() => {

        removeToast(toast);

    }, duration);

}

/* =====================================
        REMOVE TOAST
===================================== */

function removeToast(toast){

    toast.style.animation =
        "slideOut .35s forwards";

    setTimeout(()=>{

        toast.remove();

    },300);

}