const BASE_URL = "http://localhost:8080/api";

let history = [];
let filteredHistory = [];

/* =====================================
            PAGE LOAD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadHistory();

    initializeEvents();

    setupLogout();

});

/* =====================================
        INITIALIZE EVENTS
===================================== */

function initializeEvents() {

    document
        .getElementById("searchInput")
        .addEventListener("keyup", filterHistory);

    document
        .getElementById("statusFilter")
        .addEventListener("change", filterHistory);

}

/* =====================================
        LOAD HISTORY
===================================== */

async function loadHistory() {

    try {

        const restaurantId =
            localStorage.getItem("restaurantId");

        const response = await fetch(

            `${BASE_URL}/donations/restaurant/${restaurantId}`

        );

        if (!response.ok)
            throw new Error();

        const donations =
            await response.json();

        history = donations.filter(d =>

            d.status === "COMPLETED"

            ||

            d.status === "EXPIRED"

        );

        filteredHistory = [...history];

        updateStatistics();

        renderTable();

    }

    catch (error) {

        console.error(error);

        showToast(

            "error",

            "Error",

            "Unable to load donation history."

        );

    }

}

/* =====================================
        UPDATE STATISTICS
===================================== */

function updateStatistics() {

    document.getElementById("totalHistory").textContent =

        history.length;

    document.getElementById("completedCount").textContent =

        history.filter(d =>

            d.status === "COMPLETED"

        ).length;

    document.getElementById("expiredCount").textContent =

        history.filter(d =>

            d.status === "EXPIRED"

        ).length;

    const totalMeals =

        history.reduce(

            (sum, donation) =>

                sum + donation.approxMeals,

            0

        );

    document.getElementById("mealCount").textContent =

        totalMeals;

}

/* =====================================
        SEARCH + FILTER
===================================== */

function filterHistory() {

    const keyword =

        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const status =

        document
            .getElementById("statusFilter")
            .value;

    filteredHistory = history.filter(donation => {

        const matchName =

            donation.foodName
                .toLowerCase()
                .includes(keyword);

        const matchStatus =

            status === "ALL"

            ||

            donation.status === status;

        return matchName && matchStatus;

    });

    renderTable();

}

/* =====================================
        RENDER TABLE
===================================== */

function renderTable() {

    const tbody =

        document.getElementById("historyTable");

    tbody.innerHTML = "";

    if (filteredHistory.length === 0) {

        tbody.innerHTML =

        `<tr>

            <td colspan="7" class="empty">

                No Donation History Found

            </td>

        </tr>`;

        return;

    }

    filteredHistory.forEach(donation => {

        tbody.innerHTML += `

        <tr>

            <td class="food-name">

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

                ${formatDate(donation.updatedAt || donation.expiryTime)}

            </td>

            <td>

                <button

                    class="view-btn"

                    onclick="viewDonation(${donation.donationId})">

                    <i class="fa-solid fa-eye"></i>

                </button>

            </td>

        </tr>

        `;

    });

}
/* =====================================
            VIEW DONATION
===================================== */

function viewDonation(id) {

    const donation =
        history.find(d => d.donationId === id);

    if (!donation) return;

    document.getElementById("historyDetails").innerHTML = `

        <p>
            <strong>Food Name</strong><br>
            ${donation.foodName}
        </p>

        <p>
            <strong>Food Type</strong><br>
            ${donation.foodType}
        </p>

        <p>
            <strong>Quantity</strong><br>
            ${donation.quantity}
        </p>

        <p>
            <strong>Approx Meals</strong><br>
            ${donation.approxMeals}
        </p>

        <p>
            <strong>Status</strong><br>
            ${donation.status}
        </p>

        <p>
            <strong>Prepared Time</strong><br>
            ${formatDate(donation.preparedTime)}
        </p>

        <p>
            <strong>Expiry Time</strong><br>
            ${formatDate(donation.expiryTime)}
        </p>

        <p>
            <strong>Pickup Address</strong><br>
            ${donation.pickupAddress}
        </p>

        <p>
            <strong>Special Instructions</strong><br>
            ${donation.specialInstructions || "-"}
        </p>

    `;

    document.getElementById("viewModal").style.display =
        "flex";

}

/* =====================================
            CLOSE MODAL
===================================== */

document
    .getElementById("closeView")
    .addEventListener("click", () => {

        document.getElementById("viewModal").style.display =
            "none";

    });

window.addEventListener("click", (event) => {

    const modal =
        document.getElementById("viewModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

/* =====================================
        ESC KEY CLOSE
===================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        document.getElementById("viewModal").style.display =
            "none";

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

    return d.toLocaleString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    });

}

/* =====================================
        REFRESH HISTORY
===================================== */

function refreshHistory() {

    loadHistory();

}

/* =====================================
        PRINT HISTORY
===================================== */

function printHistory() {

    window.print();

}

/* =====================================
        EXPORT CSV
===================================== */

function exportHistoryCSV() {

    if (history.length === 0) {

        showToast(

            "warning",

            "No Data",

            "No donation history available."

        );

        return;

    }

    let csv =

        "Food Name,Food Type,Quantity,Meals,Status\n";

    history.forEach(item => {

        csv +=

            `"${item.foodName}",`

            + `"${item.foodType}",`

            + `"${item.quantity}",`

            + `"${item.approxMeals}",`

            + `"${item.status}"\n`;

    });

    const blob =

        new Blob([csv], {

            type: "text/csv"

        });

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download = "donation-history.csv";

    link.click();

    URL.revokeObjectURL(url);

}

/* =====================================
        PAGE SHORTCUTS
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "r") {

        event.preventDefault();

        refreshHistory();

    }

    if (event.ctrlKey && event.key === "p") {

        event.preventDefault();

        printHistory();

    }

});

/* =====================================
        PAGE READY
===================================== */

console.log("Donation History Loaded Successfully");