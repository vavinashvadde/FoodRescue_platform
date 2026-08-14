const BASE_URL = "/api";

document.addEventListener("DOMContentLoaded", () => {
    loadDonations();
});

// ======================================
// LOAD DONATIONS
// ======================================

async function loadDonations() {

    try {

        const response = await fetch(`${BASE_URL}/admin-donations`);

        if (!response.ok) {
            throw new Error("Failed to load donations");
        }

        let donations = await response.json();

        // Remove expired donations
        donations = donations.filter(
            donation => donation.status !== "EXPIRED"
        );

        console.log(donations);

        updateCards(donations);

        displayDonations(donations);

    }
    catch (error) {

        console.error("Donation Error:", error);

        document.getElementById("donationTable").innerHTML = `
            <tr>
                <td colspan="6">
                    Failed to load donations
                </td>
            </tr>
        `;
    }
}

// ======================================
// UPDATE CARDS
// ======================================

function updateCards(donations) {

    document.getElementById("totalDonations").innerText =
        donations.length;

    document.getElementById("completedDonations").innerText =
        donations.filter(
            donation => donation.status === "COMPLETED"
        ).length;

    document.getElementById("pickedUpDonations").innerText =
        donations.filter(
            donation =>
                donation.status === "PICKED_UP" ||
                donation.status === "PICKED"
        ).length;

    document.getElementById("pendingDonations").innerText =
        donations.filter(
            donation =>
                donation.status === "AVAILABLE" ||
                donation.status === "ASSIGNED"
        ).length;
}

// ======================================
// DISPLAY TABLE
// ======================================

function displayDonations(donations) {

    const table = document.getElementById("donationTable");

    table.innerHTML = "";

    if (donations.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    No donations available
                </td>
            </tr>
        `;

        return;
    }

    donations.forEach(donation => {

        table.innerHTML += `
            <tr>

                <td>${donation.foodName || "-"}</td>

                <td>${donation.restaurantName || "-"}</td>

                <td>${donation.ngoName || "-"}</td>

                <td>${donation.quantity || "-"}</td>

                <td>
                    <span class="status ${getStatusClass(donation.status)}">
                        ${donation.status || "-"}
                    </span>
                </td>

                <td>
                    ${
                        donation.createdAt
                            ? new Date(donation.createdAt).toLocaleDateString()
                            : "-"
                    }
                </td>

            </tr>
        `;
    });
}

// ======================================
// STATUS CLASS
// ======================================

function getStatusClass(status) {

    if (!status) {
        return "";
    }

    return status.toLowerCase();
}

// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.clear();

    sessionStorage.clear();

    window.location.href = "/login";
}
