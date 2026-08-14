const BASE_URL = "/api";

const ngoId = localStorage.getItem("ngoId");

document.addEventListener("DOMContentLoaded", () => {

    loadReceivedFood();

    displayCurrentDate();

});

// ==========================================
// Load NGO Donations
// ==========================================

async function loadReceivedFood() {

    try {

        const response = await fetch(
            `${BASE_URL}/donations/ngo/${ngoId}`
        );

        if (!response.ok) {

            throw new Error("Unable to fetch donations.");

        }

        const donations = await response.json();

        displayReceivedFood(donations);

        updateCards(donations);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load received food.", "error");

    }

}


// ==========================================
// Display Donations
// ==========================================

function displayReceivedFood(donations) {

    const tbody = document.getElementById("receivedFoodTableBody");

    tbody.innerHTML = "";

    if (donations.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="8">

                    No received donations found.

                </td>

            </tr>

        `;

        return;

    }

    donations.forEach(donation => {

        tbody.innerHTML += `

        <tr>

            <td>${donation.restaurantName}</td>

            <td>${donation.foodName}</td>

            <td>${donation.foodType}</td>

            <td>${donation.quantity} kg</td>

            <td>${donation.approxMeals}</td>

            <td>${formatDate(donation.acceptedAt)}</td>

            <td>

                <span class="status ${donation.status.toLowerCase()}">

                    ${donation.status.replace("_"," ")}

                </span>

            </td>

			<td>

			    <button class="view-btn"

			        onclick="viewDonation(${donation.donationId})">

			        View

			    </button>


			    ${
			        donation.status === "ACCEPTED"

			        ?

			        `

			        <button class="assign-btn"

			        onclick="openAssignPage(${donation.donationId})">


			        <i class="fa-solid fa-user-plus"></i>

			        Assign Volunteer


			        </button>

			        `

			        :

			        ""

			    }


			</td>

        </tr>

        `;

    });

}


// ==========================================
// Dashboard Cards
// ==========================================

function updateCards(donations) {

    document.getElementById("acceptedCount").textContent =
        donations.filter(d => d.status === "ACCEPTED").length;

    document.getElementById("assignedCount").textContent =
        donations.filter(d => d.status === "ASSIGNED").length;

    document.getElementById("pickedCount").textContent =
        donations.filter(d => d.status === "PICKED_UP").length;

    document.getElementById("completedCount").textContent =
        donations.filter(d => d.status === "COMPLETED").length;

}


// ==========================================
// View Donation
// ==========================================

function viewDonation(id) {

    window.location.href =
        `/donation-details?id=${id}`;

}


// ==========================================
// Format Date
// ==========================================

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {

        dateStyle: "medium",

        timeStyle: "short"

    });

}


// ==========================================
// Current Date
// ==========================================

function displayCurrentDate() {

    document.getElementById("currentDate").innerHTML =
        new Date().toLocaleDateString("en-IN", {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        });

}
/* ==========================================
        OPEN ASSIGN VOLUNTEER PAGE
========================================== */


function openAssignPage(donationId){

    console.log("BUTTON CLICK ID =", donationId);

    window.location.href =
    "/assign-volunteer?id=" + donationId;

}
// ==========================================
// LOGOUT
// ==========================================

function logout(){

    localStorage.clear();

    window.location.href = "/login";

}
