/* ==========================================
                BASE URL
========================================== */

const BASE_URL = "http://localhost:8080/api";

/* ==========================================
            PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePasswordToggle();

    initializeRegister();

});

/* ==========================================
        PASSWORD TOGGLE
========================================== */

function initializePasswordToggle() {

    const password = document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirm =
        document.getElementById("toggleConfirmPassword");

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        } else {

            password.type = "password";

            togglePassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }

    });

    toggleConfirm.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirm.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        } else {

            confirmPassword.type = "password";

            toggleConfirm.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }

    });

}

/* ==========================================
            REGISTER
========================================== */

function initializeRegister() {

    document
        .getElementById("registerForm")
        .addEventListener("submit", registerUser);

}

/* ==========================================
        REGISTER FUNCTION
========================================== */

async function registerUser(event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const role =
        document.getElementById("role").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    /* ===============================
            VALIDATION
    =============================== */

    if (fullName === "") {

        alert("Enter Full Name");
        return;

    }

    if (email === "") {

        alert("Enter Email");
        return;

    }

    if (!email.includes("@")) {

        alert("Enter Valid Email");
        return;

    }

    if (role === "") {

        alert("Select Role");
        return;

    }

    if (password.length < 6) {

        alert("Password must contain at least 6 characters");
        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match");
        return;

    }

    const button =
        document.querySelector(".register-btn");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {

        const response = await fetch(

            `${BASE_URL}/auth/register`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    fullName,

                    email,

                    password,

                    confirmPassword,

                    role

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        // Save userId for profile registration
        localStorage.setItem("userId", data.userId);

        alert(data.message);

        /* ===========================
            ROLE REDIRECTION
        =========================== */

        switch (role) {

            case "NGO":

                window.location.href =
                    "/ngo-register";

                break;

            case "RESTAURANT":

                window.location.href =
                    "/restaurant-register";

                break;

            case "VOLUNTEER":

                window.location.href =
                    "/volunteer-register";

                break;

            default:

                window.location.href =
                    "/login";

        }

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            '<i class="fa-solid fa-user-plus"></i> Create Account';

    }

}