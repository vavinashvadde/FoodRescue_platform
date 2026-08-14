/* ==========================================
                BASE URL
========================================== */

const BASE_URL = "/api";


/* ==========================================
                PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadNGO();

    loadAvailableFood();

});


/* ==========================================
                LOAD NGO NAME
========================================== */

function loadNGO() {

    const ngoName = localStorage.getItem("ngoName");

    document.getElementById("ngoName").textContent =
        ngoName || "NGO";

}


/* ==========================================
            LOAD AVAILABLE FOOD
========================================== */

async function loadAvailableFood() {

    try {

        const response =
            await fetch(`${BASE_URL}/donations/available`);

        if (!response.ok) {

            throw new Error("Unable to load donations");

        }

        const donations =
            await response.json();

        displayDonations(donations);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/* ==========================================
            DISPLAY DONATIONS
========================================== */

function displayDonations(donations) {

    const table =
        document.getElementById("foodTableBody");

    table.innerHTML = "";

    if (donations.length === 0) {

        table.innerHTML =

            `<tr>

                <td colspan="8">

                    No food donations available.

                </td>

            </tr>`;

        return;

    }

    donations.forEach(donation => {

        table.innerHTML +=

        `<tr>

            <td>${donation.restaurantName}</td>

            <td>${donation.foodName}</td>

            <td>${donation.foodType}</td>

            <td>${donation.quantity}</td>

            <td>${donation.approxMeals}</td>

            <td>${formatDate(donation.expiryTime)}</td>

            <td>

                <span class="status available">

                    ${donation.status}

                </span>

            </td>

            <td>

                <button
                    class="accept-btn"
                    onclick="acceptDonation(${donation.donationId})">

                    Accept

                </button>

            </td>

        </tr>`;

    });

}


/* ==========================================
            ACCEPT DONATION
========================================== */

async function acceptDonation(donationId) {

    const ngoId =
        localStorage.getItem("ngoId");

    if (!ngoId) {

        alert("NGO not logged in.");

        return;

    }

    if (!confirm("Accept this donation?")) {

        return;

    }

    try {

        const response =
            await fetch(

                `${BASE_URL}/donations/${donationId}/accept/${ngoId}`,

                {

                    method: "PUT"

                }

            );

        if (!response.ok) {

            const message =
                await response.text();

            throw new Error(message);

        }

        alert("Donation accepted successfully.");

        loadAvailableFood();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/* ==========================================
            FORMAT DATE
========================================== */

function formatDate(date) {

    if (!date)
        return "-";

    return new Date(date)
        .toLocaleString();

}


/* ==========================================
                LOGOUT
========================================== */

function logout() {

    localStorage.clear();

    window.location.href = "/login";

}
