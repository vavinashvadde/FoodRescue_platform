const BASE_URL = "/api";

document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
    loadRecentDonations();
    loadRecentUsers();
});


// ======================================
// LOAD DASHBOARD CARDS
// ======================================

async function loadDashboard(){

    try{

        const response = await fetch(
            `${BASE_URL}/dashboard`
        );

        if(!response.ok){
            throw new Error("Dashboard loading failed");
        }

        const data = await response.json();

        console.log("Dashboard:", data);

        updateCards(data);

    }

    catch(error){

        console.error(
            "Dashboard Error:",
            error
        );

    }

}



// ======================================
// UPDATE CARDS
// ======================================

function updateCards(data){

    document.getElementById("totalUsers").innerText =
        data.totalUsers || 0;


    document.getElementById("totalRestaurants").innerText =
        data.totalRestaurants || 0;


    document.getElementById("totalNgos").innerText =
        data.totalNgos || 0;


    document.getElementById("totalVolunteers").innerText =
        data.totalVolunteers || 0;


    document.getElementById("totalDonations").innerText =
        data.totalDonations || 0;


    document.getElementById("completedDeliveries").innerText =
        data.completedDeliveries || 0;

}



// ======================================
// RECENT DONATIONS
// ======================================

async function loadRecentDonations(){

    const table =
        document.getElementById(
            "recentDonationTable"
        );


    try{

        const response = await fetch(
            `${BASE_URL}/recent-donations`
        );


        const donations =
            await response.json();


        table.innerHTML = "";


        if(donations.length === 0){

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

            <td>
            ${donation.foodName || "-"}
            </td>


            <td>
            ${donation.restaurant?.restaurantName || "-"}
            </td>


            <td>
            ${donation.ngo?.ngoName || "-"}
            </td>


            <td>
            ${donation.quantity || "-"}
            </td>


            <td>
            <span class="status ${getStatusClass(donation.status)}">
            ${donation.status || "-"}
            </span>
            </td>


            <td>
            ${formatDate(donation.createdAt)}
            </td>


            </tr>

            `;

        });


    }

    catch(error){

        console.error(
            "Donation Error:",
            error
        );


        table.innerHTML = `
        <tr>
        <td colspan="6">
        Failed to load donations
        </td>
        </tr>
        `;

    }

}





// ======================================
// RECENT USERS
// ======================================

async function loadRecentUsers(){

    const table =
        document.getElementById(
            "recentUsersTable"
        );


    try{

        const response = await fetch(
            `${BASE_URL}/recent-users`
        );


        const users =
            await response.json();



        table.innerHTML = "";


        if(users.length === 0){

            table.innerHTML = `
            <tr>
            <td colspan="5">
            No users available
            </td>
            </tr>
            `;

            return;

        }



        users.forEach(user => {


            table.innerHTML += `

            <tr>


            <td>
            ${user.fullName || "-"}
            </td>


            <td>
            ${user.email || "-"}
            </td>


            <td>
            ${user.role || "-"}
            </td>


            <td>

            <span class="status ${getStatusClass(user.status)}">

            ${user.status || "-"}

            </span>

            </td>


            <td>
            ${formatDate(user.createdAt)}
            </td>


            </tr>

            `;


        });


    }


    catch(error){

        console.error(
            "Users Error:",
            error
        );


        table.innerHTML = `
        <tr>
        <td colspan="5">
        Failed to load users
        </td>
        </tr>
        `;

    }

}





// ======================================
// STATUS CLASS
// ======================================

function getStatusClass(status){

    if(!status)
        return "";

    return status
        .toLowerCase()
        .replace("_"," ");

}




// ======================================
// DATE FORMAT
// ======================================

function formatDate(date){

    if(!date)
        return "-";


    return new Date(date)
        .toLocaleDateString(
            "en-IN"
        );

}




// ======================================
// LOGOUT
// ======================================

function logout(){

    localStorage.clear();

    window.location.href="/login";

}
