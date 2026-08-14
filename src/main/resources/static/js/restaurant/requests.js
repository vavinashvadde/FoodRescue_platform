const BASE_URL = "/api";

let donations = [];
let filteredDonations = [];

/* =====================================
            PAGE LOAD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDonations();

    initializeEvents();

    setupLogout();

});

/* =====================================
        INITIALIZE EVENTS
===================================== */

function initializeEvents() {

    document
        .getElementById("searchInput")
        .addEventListener("keyup", filterDonations);

    document
        .getElementById("statusFilter")
        .addEventListener("change", filterDonations);

}

/* =====================================
        LOAD DONATIONS
===================================== */

async function loadDonations() {

    try {

        const restaurantId =
            localStorage.getItem("restaurantId");

        const response = await fetch(

            `${BASE_URL}/donations/restaurant/${restaurantId}`

        );

        if (!response.ok)
            throw new Error("Unable to load donations.");

        donations = await response.json();

        filteredDonations = [...donations];

        await loadRequestCounts();

        updateStatistics();

        renderTable();

    }

    catch (error) {

        console.error(error);

        showToast(
            "error",
            "Error",
            "Unable to load donations."
        );

    }

}

/* =====================================
        LOAD REQUEST COUNTS
===================================== */

async function loadRequestCounts() {

    for (const donation of donations) {

        try {

            const response = await fetch(

`${BASE_URL}/foodrequests/donation/${donation.donationId}`

            );

            if (!response.ok) {

                donation.requestCount = 0;

                continue;

            }

            const requests =
                await response.json();

            donation.requestCount =
                requests.length;

        }

        catch {

            donation.requestCount = 0;

        }

    }

}

/* =====================================
        UPDATE STATISTICS
===================================== */

function updateStatistics() {

    document.getElementById("totalDonations").textContent =
        donations.length;

    document.getElementById("availableDonations").textContent =
        donations.filter(d =>
            d.status === "AVAILABLE"
        ).length;

    document.getElementById("acceptedDonations").textContent =
        donations.filter(d =>
            d.status === "ACCEPTED"
        ).length;

    document.getElementById("completedDonations").textContent =
        donations.filter(d =>
            d.status === "COMPLETED"
        ).length;

}

/* =====================================
        SEARCH + FILTER
===================================== */

function filterDonations() {

    const keyword =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    const status =
        document.getElementById("statusFilter")
            .value;

    filteredDonations = donations.filter(donation => {

        const matchesName =

            donation.foodName
                .toLowerCase()
                .includes(keyword);

        const matchesStatus =

            status === "ALL"

            ||

            donation.status === status;

        return matchesName && matchesStatus;

    });

    renderTable();

}

/* =====================================
        RENDER TABLE
===================================== */

function renderTable() {

    const tbody =
        document.getElementById("donationTable");

    tbody.innerHTML = "";

    if (filteredDonations.length === 0) {

        tbody.innerHTML =

            `<tr>

                <td colspan="7" class="empty">

                    No Donations Found

                </td>

            </tr>`;

        return;

    }

    filteredDonations.forEach(donation => {

        tbody.innerHTML += `

        <tr>

            <td>

                ${donation.foodName}

            </td>

            <td>

                ${donation.foodType}

            </td>

            <td>

                ${donation.quantity}

            </td>

            <td>

                ${donation.approxMeals}

            </td>

            <td>

                <span class="status ${donation.status.toLowerCase()}">

                    ${donation.status}

                </span>

            </td>

            <td>

                <span class="request-count">

                    ${donation.requestCount}

                </span>

            </td>

            <td>

                <div class="actions">

                    <button

                        class="action-btn view-btn"

                        onclick="viewDonation(${donation.donationId})">

                        <i class="fa-solid fa-eye"></i>

                    </button>

                    <button

                        class="action-btn edit-btn"

                        onclick="editDonation(${donation.donationId})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button

                        class="action-btn delete-btn"

                        onclick="deleteDonation(${donation.donationId})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}
/* =====================================
            VIEW DONATION
===================================== */

function viewDonation(id) {

    const donation = donations.find(d => d.donationId === id);

    if (!donation) return;

    document.getElementById("viewBody").innerHTML = `

        <div class="view-grid">

            <p><strong>Food Name :</strong> ${donation.foodName}</p>

            <p><strong>Food Type :</strong> ${donation.foodType}</p>

            <p><strong>Quantity :</strong> ${donation.quantity}</p>

            <p><strong>Approx Meals :</strong> ${donation.approxMeals}</p>

            <p><strong>Status :</strong> ${donation.status}</p>

            <p><strong>Prepared Time :</strong> ${formatDate(donation.preparedTime)}</p>

            <p><strong>Expiry Time :</strong> ${formatDate(donation.expiryTime)}</p>

            <p><strong>Pickup Address :</strong><br>
                ${donation.pickupAddress}
            </p>

            <p><strong>Special Instructions :</strong><br>
                ${donation.specialInstructions || "-" }
            </p>

        </div>

    `;

    document.getElementById("viewModal").style.display = "flex";

}

/* =====================================
            EDIT DONATION
===================================== */

function editDonation(id) {

    const donation = donations.find(d => d.donationId === id);

    if (!donation) return;

    document.getElementById("donationId").value =
        donation.donationId;

    document.getElementById("editQuantity").value =
        donation.quantity;

    document.getElementById("editExpiry").value =
        toDateTimeLocal(donation.expiryTime);

    document.getElementById("editAddress").value =
        donation.pickupAddress;

    document.getElementById("editInstructions").value =
        donation.specialInstructions || "";

    document.getElementById("editModal").style.display = "flex";

}

/* =====================================
            SAVE EDIT
===================================== */

document
    .getElementById("editForm")
    .addEventListener("submit", updateDonation);

async function updateDonation(event) {

    event.preventDefault();

    const id =
        document.getElementById("donationId").value;

    const donation =
        donations.find(d => d.donationId == id);

    if (!donation) return;

    donation.quantity =
        parseInt(document.getElementById("editQuantity").value);

    donation.expiryTime =
        document.getElementById("editExpiry").value;

    donation.pickupAddress =
        document.getElementById("editAddress").value;

    donation.specialInstructions =
        document.getElementById("editInstructions").value;

    try {

        const response = await fetch(

            `${BASE_URL}/donations/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":"application/json"

                },

                body: JSON.stringify(donation)

            }

        );

        if(!response.ok)
            throw new Error();

        showToast(

            "success",

            "Updated",

            "Donation updated successfully."

        );

        document.getElementById("editModal").style.display =
            "none";

        loadDonations();

    }

    catch(error){

        console.error(error);

        showToast(

            "error",

            "Update Failed",

            "Unable to update donation."

        );

    }

}

/* =====================================
            CLOSE MODALS
===================================== */

document.getElementById("closeView")
    .onclick = () => {

        document.getElementById("viewModal").style.display =
            "none";

    };

document.getElementById("closeEdit")
    .onclick = () => {

        document.getElementById("editModal").style.display =
            "none";

    };

window.onclick = function(event){

    if(event.target === document.getElementById("viewModal")){

        document.getElementById("viewModal").style.display =
            "none";

    }

    if(event.target === document.getElementById("editModal")){

        document.getElementById("editModal").style.display =
            "none";

    }

};
/* =====================================
        DELETE DONATION
===================================== */

let deleteDonationId = null;

function deleteDonation(id) {

    deleteDonationId = id;

    document.getElementById("deleteModal").style.display = "flex";

}

/* =====================================
        CANCEL DELETE
===================================== */

document
    .getElementById("cancelDelete")
    .addEventListener("click", () => {

        deleteDonationId = null;

        document.getElementById("deleteModal").style.display = "none";

    });

/* =====================================
        CONFIRM DELETE
===================================== */

document
    .getElementById("confirmDelete")
    .addEventListener("click", confirmDeleteDonation);

async function confirmDeleteDonation() {

    if (!deleteDonationId)
        return;

    try {

        const response = await fetch(

            `${BASE_URL}/donations/${deleteDonationId}`,

            {
                method: "DELETE"
            }

        );

        if (!response.ok)
            throw new Error();

        showToast(

            "success",

            "Deleted",

            "Donation deleted successfully."

        );

        document.getElementById("deleteModal").style.display = "none";

        deleteDonationId = null;

        loadDonations();

    }

    catch (error) {

        console.error(error);

        showToast(

            "error",

            "Delete Failed",

            "Unable to delete donation."

        );

    }

}

/* =====================================
        CLOSE DELETE MODAL
===================================== */

window.addEventListener("click", (event) => {

    const deleteModal =
        document.getElementById("deleteModal");

    if (event.target === deleteModal) {

        deleteModal.style.display = "none";

        deleteDonationId = null;

    }

});

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

                "You have been logged out."

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

    return new Date(date).toLocaleString();

}

/* =====================================
        DATETIME-LOCAL FORMAT
===================================== */

function toDateTimeLocal(date) {

    if (!date)
        return "";

    const d = new Date(date);

    const year = d.getFullYear();

    const month = String(d.getMonth() + 1).padStart(2, "0");

    const day = String(d.getDate()).padStart(2, "0");

    const hour = String(d.getHours()).padStart(2, "0");

    const minute = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;

}

/* =====================================
        REFRESH TABLE
===================================== */

function refreshPage() {

    loadDonations();

}

/* =====================================
        KEYBOARD SHORTCUT
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document.getElementById("viewModal").style.display = "none";

        document.getElementById("editModal").style.display = "none";

        document.getElementById("deleteModal").style.display = "none";

    }

});
