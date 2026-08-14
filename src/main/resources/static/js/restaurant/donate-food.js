const BASE_URL = "/api";

let uploadedImage = "";

/* =====================================
            PAGE LOAD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadRestaurant();

    setupImageUpload();

    setupDonationForm();

    setupLogout();

});

/* =====================================
        LOAD RESTAURANT NAME
===================================== */

function loadRestaurant() {

    const restaurantName =
        localStorage.getItem("restaurantName");

    if (restaurantName) {

        document.getElementById("restaurantName").textContent =
            restaurantName;

    }

}

/* =====================================
            IMAGE UPLOAD
===================================== */

function setupImageUpload() {

    const imageInput =
        document.getElementById("foodImage");

    imageInput.addEventListener("change", uploadImage);

}

async function uploadImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await fetch(

            `${BASE_URL}/upload/image`,

            {

                method: "POST",

                body: formData

            }

        );

        if (!response.ok)
            throw new Error("Image upload failed");

        uploadedImage =
            await response.text();

        alert("Image Uploaded Successfully");

    }

    catch (error) {

        console.error(error);

        alert("Image Upload Failed");

    }

}

/* =====================================
        DONATION FORM
===================================== */

function setupDonationForm() {

    document
        .getElementById("donationForm")
        .addEventListener("submit", donateFood);

}

/* =====================================
            DONATE FOOD
===================================== */

async function donateFood(event) {

    event.preventDefault();

    const preparedTime =
        document.getElementById("preparedTime").value;

    const expiryTime =
        document.getElementById("expiryTime").value;

    if (new Date(expiryTime) <= new Date(preparedTime)) {

        alert("Expiry Time must be greater than Prepared Time");

        return;

    }

    const donation = {

        foodName:
            document.getElementById("foodName").value.trim(),

        foodType:
            document.getElementById("foodType").value,

        quantity:
            parseInt(document.getElementById("quantity").value),

        approxMeals:
            parseInt(document.getElementById("approxMeals").value),

        preparedTime,

        expiryTime,

        pickupAddress:
            document.getElementById("pickupAddress").value.trim(),

        foodImage:
            uploadedImage,

        specialInstructions:
            document.getElementById("specialInstructions").value.trim(),

        restaurantId:
            parseInt(localStorage.getItem("restaurantId"))

    };

    if (!validateDonation(donation)) {

        return;

    }

    const button =
        document.querySelector(".submit-btn");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Donating...';

    try {

        const response = await fetch(

            `${BASE_URL}/donations`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(donation)

            }

        );

        if (!response.ok) {

            const error =
                await response.text();

            throw new Error(error);

        }

        alert("Food Donation Added Successfully!");

        document.getElementById("donationForm").reset();

        uploadedImage = "";

		window.location.href =
		    "/requests";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            '<i class="fa-solid fa-hand-holding-heart"></i> Donate Food';

    }

}

/* =====================================
            VALIDATION
===================================== */

function validateDonation(data) {

    if (data.foodName === "") {

        alert("Enter Food Name");

        return false;

    }

    if (data.foodType === "") {

        alert("Select Food Type");

        return false;

    }

    if (data.quantity <= 0) {

        alert("Enter Valid Quantity");

        return false;

    }

    if (data.approxMeals <= 0) {

        alert("Enter Approximate Meals");

        return false;

    }

    if (data.pickupAddress === "") {

        alert("Enter Pickup Address");

        return false;

    }

    if (data.restaurantId == null) {

        alert("Restaurant not found. Please login again.");

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

            window.location.href = "/login";

        });

}
