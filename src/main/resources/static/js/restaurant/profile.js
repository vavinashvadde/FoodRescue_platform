const BASE_URL = "/api";

let restaurant = {};

/* =====================================
            PAGE LOAD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    setupLogout();

});

/* =====================================
            LOAD PROFILE
===================================== */

async function loadProfile() {

    try {

        const restaurantId =
            localStorage.getItem("restaurantId");

        const response = await fetch(

            `${BASE_URL}/restaurants/${restaurantId}`

        );

        if (!response.ok)
            throw new Error();

        restaurant =
            await response.json();

        populateProfile();

    }

    catch (error) {

        console.error(error);

        showToast(

            "error",

            "Profile",

            "Unable to load profile."

        );

    }

}

/* =====================================
        POPULATE PROFILE
===================================== */

function populateProfile() {

    document.getElementById("restaurantName").value =
        restaurant.restaurantName || "";

    document.getElementById("ownerName").value =
        restaurant.ownerName || "";

    document.getElementById("email").value =
        restaurant.email || "";

    document.getElementById("phone").value =
        restaurant.phone || "";

    document.getElementById("licenseNumber").value =
        restaurant.licenseNumber || "";

    document.getElementById("address").value =
        restaurant.address || "";

    document.getElementById("city").value =
        restaurant.city || "";

    document.getElementById("status").value =
        restaurant.status || "";

    document.getElementById("createdAt").value =
        formatDate(restaurant.createdAt);

}
/* =====================================
        UPDATE PROFILE
===================================== */

document
    .getElementById("profileForm")
    .addEventListener("submit", updateProfile);

async function updateProfile(event) {

    event.preventDefault();

    const restaurantId =
        localStorage.getItem("restaurantId");

    restaurant.phone =
        document.getElementById("phone").value.trim();

    restaurant.address =
        document.getElementById("address").value.trim();

    restaurant.city =
        document.getElementById("city").value.trim();

    if (!validateProfile()) {

        return;

    }

    const button =
        document.querySelector(".save-btn");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    try {

        const response = await fetch(

            `${BASE_URL}/restaurants/${restaurantId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(restaurant)

            }

        );

        if (!response.ok)
            throw new Error();

        restaurant =
            await response.json();

        populateProfile();

        showToast(

            "success",

            "Success",

            "Profile updated successfully."

        );

    }

    catch (error) {

        console.error(error);

        showToast(

            "error",

            "Update Failed",

            "Unable to update profile."

        );

    }

    finally {

        button.disabled = false;

        button.innerHTML =

            `<i class="fa-solid fa-floppy-disk"></i>
             Save Changes`;

    }

}

/* =====================================
        VALIDATION
===================================== */

function validateProfile() {

    const phone =
        restaurant.phone;

    const address =
        restaurant.address;

    const city =
        restaurant.city;

    if (phone === "") {

        showToast(

            "warning",

            "Phone",

            "Phone number is required."

        );

        return false;

    }

    if (!/^[0-9]{10}$/.test(phone)) {

        showToast(

            "warning",

            "Invalid Phone",

            "Phone number must contain exactly 10 digits."

        );

        return false;

    }

    if (address === "") {

        showToast(

            "warning",

            "Address",

            "Address is required."

        );

        return false;

    }

    if (city === "") {

        showToast(

            "warning",

            "City",

            "City is required."

        );

        return false;

    }

    return true;

}
/* =====================================
            LOGOUT
===================================== */

function setupLogout() {

    document
        .getElementById("logoutBtn")
        .addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.clear();

            sessionStorage.clear();

            showToast(

                "success",

                "Logged Out",

                "You have been logged out successfully."

            );

            setTimeout(() => {

                window.location.href = "/login";

            }, 1200);

        });

}

/* =====================================
        FORMAT DATE
===================================== */

function formatDate(date) {

    if (!date)
        return "-";

    const d = new Date(date);

    return d.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}

/* =====================================
        REFRESH PROFILE
===================================== */

function refreshProfile() {

    loadProfile();

}

/* =====================================
        KEYBOARD SHORTCUTS
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "r") {

        event.preventDefault();

        refreshProfile();

    }

});

/* =====================================
        PAGE READY
===================================== */

console.log("Restaurant Profile Loaded Successfully");	
