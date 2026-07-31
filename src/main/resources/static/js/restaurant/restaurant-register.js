/* ==========================================
                BASE URL
========================================== */

const BASE_URL = "http://localhost:8080/api";

/* ==========================================
            PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRegistration();

});



/* ==========================================
        REGISTER FORM
========================================== */

function initializeRegistration() {

    document
        .getElementById("restaurantRegisterForm")
        .addEventListener("submit", registerRestaurant);

}

/* ==========================================
        REGISTER RESTAURANT
========================================== */

async function registerRestaurant(event) {

    event.preventDefault();

	const restaurant = {

	    userId: Number(localStorage.getItem("userId")),

	    restaurantName:
	        document.getElementById("restaurantName").value.trim(),

	    ownerName:
	        document.getElementById("ownerName").value.trim(),

	    phone:
	        document.getElementById("phone").value.trim(),

	    licenseNumber:
	        document.getElementById("licenseNumber").value.trim(),

	    address:
	        document.getElementById("address").value.trim(),

	    city:
	        document.getElementById("city").value.trim()

	};

    if (!validateRestaurant(restaurant)) {

        return;

    }

    const button =
        document.querySelector(".register-btn");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';

    try {

        const response = await fetch(

            `${BASE_URL}/restaurants/register`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(restaurant)

            }

        );

        if (!response.ok) {

            const error =
                await response.text();

            throw new Error(error);

        }

        const data = await response.json();

        /* ===============================
            SAVE DETAILS
        ============================== */

        localStorage.setItem(
            "restaurantId",
            data.restaurantId
        );

        localStorage.setItem(
            "restaurantName",
            data.restaurantName
        );

        alert("Restaurant Registered Successfully!");

        window.location.href =
            "/restaurant-dashboard";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            '<i class="fa-solid fa-store"></i> Register Restaurant';

    }

}

/* ==========================================
            VALIDATION
========================================== */

function validateRestaurant(data) {

    if (data.restaurantName === "") {

        alert("Enter Restaurant Name");
        return false;

    }

    if (data.ownerName === "") {

        alert("Enter Owner Name");
        return false;

    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(data.phone)) {

        alert("Enter Valid Phone Number");
        return false;

    }

    if (data.licenseNumber === "") {

        alert("Enter License Number");
        return false;

    }

    if (data.city === "") {

        alert("Enter City");
        return false;

    }

    if (data.address === "") {

        alert("Enter Address");
        return false;

    }

    return true;
}