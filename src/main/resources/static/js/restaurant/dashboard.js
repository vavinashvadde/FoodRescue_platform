const BASE_URL = "/api";

/* ===========================================
            PAGE LOAD
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadRestaurant();

    loadDonations();

    loadRequests();

    loadNotifications();

    setupLogout();

});

/* ===========================================
        LOAD RESTAURANT NAME
=========================================== */

function loadRestaurant() {

    const restaurantName =
        localStorage.getItem("restaurantName");

    if (restaurantName) {

        document.getElementById("restaurantName").textContent =
            restaurantName;

    }

}

/* ===========================================
        LOAD DONATIONS
=========================================== */

async function loadDonations() {

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

        updateDonationCards(donations);

        renderDonationTable(donations);

    }

    catch (error) {

        console.error(error);

    }

}

/* ===========================================
        DONATION STATISTICS
=========================================== */

function updateDonationCards(donations) {

    document.getElementById("totalDonations").textContent =
        donations.length;

    document.getElementById("activeDonations").textContent =
        donations.filter(d =>
            d.status === "AVAILABLE"
        ).length;

    document.getElementById("completedDonations").textContent =
        donations.filter(d =>
            d.status === "COMPLETED"
        ).length;

}

/* ===========================================
        DONATION TABLE
=========================================== */

function renderDonationTable(donations) {

    const tbody =
        document.getElementById("donationTable");

    tbody.innerHTML = "";

    if (donations.length === 0) {

        tbody.innerHTML =

            `<tr>
                <td colspan="4" class="empty">
                    No Donations Found
                </td>
            </tr>`;

        return;

    }

    donations.slice(0,5).forEach(d => {

        tbody.innerHTML += `

        <tr>

            <td>${d.foodName}</td>

            <td>${d.quantity}</td>

            <td>

                <span class="status ${d.status.toLowerCase()}">

                    ${d.status}

                </span>

            </td>

            <td>${formatDate(d.createdAt)}</td>

        </tr>

        `;

    });

}

/* ===========================================
            LOAD REQUESTS
=========================================== */

async function loadRequests() {

    try {

        const response =
            await fetch(`${BASE_URL}/foodrequests`);

        if (!response.ok)
            throw new Error();

        const requests =
            await response.json();

        document.getElementById("acceptedRequests").textContent =

            requests.filter(r =>
                r.status === "ACCEPTED"
            ).length;

        renderRequestTable(requests);

    }

    catch(error){

        console.error(error);

    }

}

/* ===========================================
            REQUEST TABLE
=========================================== */

function renderRequestTable(requests){

    const tbody =
        document.getElementById("requestTable");

    tbody.innerHTML = "";

    if(requests.length===0){

        tbody.innerHTML=

        `<tr>

            <td colspan="4" class="empty">

                No Requests Found

            </td>

        </tr>`;

        return;

    }

    requests.slice(0,5).forEach(r=>{

        tbody.innerHTML+=`

        <tr>

            <td>${r.ngoName}</td>

            <td>${r.foodName}</td>

            <td>

                <span class="status ${r.status.toLowerCase()}">

                    ${r.status}

                </span>

            </td>

            <td>${formatDate(r.requestDate)}</td>

        </tr>

        `;

    });

}

/* ===========================================
        LOAD NOTIFICATIONS
=========================================== */

async function loadNotifications(){

    try{

        const restaurantId =
            localStorage.getItem("restaurantId");

        const response =
            await fetch(

`${BASE_URL}/notifications/recipient/RESTAURANT/${restaurantId}/unread`

            );

        if(!response.ok)
            throw new Error();

        const notifications =
            await response.json();

        document.getElementById("notificationCount")
            .textContent = notifications.length;

    }

    catch(error){

        console.error(error);

    }

}

/* ===========================================
            LOGOUT
=========================================== */

function setupLogout(){

    document
        .getElementById("logoutBtn")
        .addEventListener("click",function(e){

            e.preventDefault();

            localStorage.clear();

            sessionStorage.clear();

            window.location.href="/login";

        });

}

/* ===========================================
            FORMAT DATE
=========================================== */

function formatDate(date){

    if(!date)
        return "-";

    return new Date(date).toLocaleDateString();

}
