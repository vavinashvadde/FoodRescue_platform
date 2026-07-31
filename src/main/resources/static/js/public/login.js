// ======================================================
// FOOD RESCUE PLATFORM
// LOGIN PAGE JAVASCRIPT
// PART 1
// ======================================================

// ======================================================
// SELECTED ROLE
// ======================================================

let selectedRole = "restaurant";

// ======================================================
// PREMIUM YELLOW THEME
// ======================================================

const theme = {

    primary: "#F4B400",

    secondary: "#FFD54F",

    hover: "#E6A700",

    background: "#FFF8E1",

    white: "#FFFFFF",

    border: "#FFE082",

    icon: "#C88700"

};

// ======================================================
// ROLE CARD SELECTION
// ======================================================

const roleCards = document.querySelectorAll(".role-card");

function resetCards() {

    roleCards.forEach(card => {

        card.classList.remove("active");

        card.style.borderColor = theme.border;

        card.style.background = theme.white;

        card.style.boxShadow = "none";

        const icon = card.querySelector("i");
		if (icon) {

		    icon.style.color = theme.icon;

		}

		const text = card.querySelector("span");

		if (text) {

		    text.style.color = "#374151";

		}
		
    });

}

function activateCard(card) {

    resetCards();

    selectedRole = card.dataset.role;

    card.classList.add("active");

    card.style.borderColor = theme.primary;

    card.style.background = theme.background;

    card.style.boxShadow =
        "0 18px 40px rgba(244,180,0,.25)";

    const icon = card.querySelector("i");

    if (icon) {

        icon.style.color = theme.primary;

    }

}

// ======================================================
// ROLE EVENTS
// ======================================================

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        activateCard(card);

    });

    card.addEventListener("mouseenter", () => {

        if (card.classList.contains("active")) return;

        card.style.borderColor = theme.hover;

        card.style.background = "#FFF9F0";

        card.style.boxShadow =
            "0 15px 35px rgba(244,180,0,.18)";

        const icon = card.querySelector("i");

        if (icon) {

            icon.style.color = theme.hover;

        }

    });

    card.addEventListener("mouseleave", () => {

        if (card.classList.contains("active")) {

            card.style.borderColor = theme.primary;

            card.style.background = theme.background;

            card.style.boxShadow =
                "0 18px 40px rgba(244,180,0,.25)";

            const icon = card.querySelector("i");

			if (icon) {

			    icon.style.color = theme.icon;

			}

			const text = card.querySelector("span");

			if (text) {

			    text.style.color = "#374151";

			}

        } else {

            card.style.borderColor = theme.border;

            card.style.background = theme.white;

            card.style.boxShadow = "none";

            const icon = card.querySelector("i");

            if (icon) {

                icon.style.color = theme.icon;

            }

        }

    });

});

// ======================================================
// DEFAULT ROLE
// ======================================================

const defaultRole = document.querySelector(
    ".role-card[data-role='restaurant']"
);

if (defaultRole) {

    activateCard(defaultRole);

}

// ======================================================
// PASSWORD SHOW / HIDE
// ======================================================

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        togglePassword.classList.toggle("fa-eye");

        togglePassword.classList.toggle("fa-eye-slash");

    });

}
// ======================================================
// LOGIN FORM
// ======================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", loginUser);

}

// ======================================================
// LOGIN FUNCTION
// ======================================================

async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (email === "" || password === "") {

        alert("Please enter Email and Password.");

        return;

    }

    const loginButton = document.querySelector(".login-btn");

    const originalButtonText = loginButton.innerHTML;

    loginButton.disabled = true;

    loginButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Signing In...';

    try {

        // ==========================================
        // API CALL
        // ==========================================

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: email,

                password: password,

                role: selectedRole.toUpperCase()

            })

        });

        const data = await response.json();

        // ==========================================
        // LOGIN FAILED
        // ==========================================

        if (!response.ok) {

            alert(data.message || "Invalid Email or Password.");

            loginButton.disabled = false;

            loginButton.innerHTML = originalButtonText;

            return;

        }

        // ==========================================
        // STORE USER DATA
        // ==========================================

        localStorage.clear();

        localStorage.setItem("token", data.token);

        localStorage.setItem("userId", data.userId);

        localStorage.setItem("role", data.role);

        // Restaurant

        if (data.restaurantId) {

            localStorage.setItem(
                "restaurantId",
                data.restaurantId
            );

            localStorage.setItem(
                "restaurantName",
                data.restaurantName
            );

        }

        // NGO

        if (data.ngoId) {

            localStorage.setItem(
                "ngoId",
                data.ngoId
            );

            localStorage.setItem(
                "ngoName",
                data.ngoName
            );

        }

        // Volunteer

        if (data.volunteerId) {

            localStorage.setItem(
                "volunteerId",
                data.volunteerId
            );

        }

        // Admin

        if (data.adminId) {

            localStorage.setItem(
                "adminId",
                data.adminId
            );

        }

        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================

        loginButton.innerHTML =
            '<i class="fas fa-check-circle"></i> Login Successful';

        // ==========================================
        // REDIRECT USER
        // ==========================================

        setTimeout(() => {

            switch (data.role.toUpperCase()) {

                case "RESTAURANT":

                    window.location.href =
                        "/restaurant-dashboard";

                    break;

                case "NGO":

                    window.location.href =
                        "/ngo-dashboard";

                    break;

                case "VOLUNTEER":

                    window.location.href =
                        "/volunteer-dashboard";

                    break;

                case "ADMIN":

                    window.location.href =
                        "/admin-dashboard";

                    break;

                default:

                    alert("Unknown User Role.");

                    loginButton.disabled = false;

                    loginButton.innerHTML =
                        originalButtonText;

            }

        }, 700);

    }

    // ==========================================
    // SERVER ERROR
    // ==========================================

    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

        loginButton.disabled = false;

        loginButton.innerHTML = originalButtonText;

    }

}

// ======================================================
// ENTER KEY SUPPORT
// ======================================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const activeElement = document.activeElement;

        if (
            activeElement &&
            (activeElement.id === "email" ||
             activeElement.id === "password")
        ) {

            loginForm.requestSubmit();

        }

    }

});

// ======================================================
// AUTO FOCUS EMAIL FIELD
// ======================================================

window.addEventListener("load", () => {

    const emailField = document.getElementById("email");

    if (emailField) {

        emailField.focus();

    }

});

// ======================================================
// END OF LOGIN.JS
// ======================================================