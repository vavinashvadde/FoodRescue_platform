/* ==========================================
                BASE URL
========================================== */

const BASE_URL = "http://localhost:8080/api";

const ngoId = localStorage.getItem("ngoId");



/* ==========================================
                PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    loadNGO();

    loadDashboardCounts();

    loadAvailableDonations();

});



/* ==========================================
                LOAD NGO NAME
========================================== */

function loadNGO(){

    const ngoName =
        localStorage.getItem("ngoName");


    document.getElementById("ngoName")
    .textContent =
    ngoName || "NGO";

}



/* ==========================================
            LOAD DASHBOARD COUNTS
========================================== */

async function loadDashboardCounts(){


    if(!ngoId){

        console.error("NGO ID missing");

        return;

    }


    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/ngo/${ngoId}`

        );


        if(!response.ok){

            throw new Error(
                "Unable to load dashboard data"
            );

        }


        const donations =
        await response.json();



        let accepted = 0;

        let pending = 0;

        let completed = 0;



        donations.forEach(donation=>{


            if(donation.status==="ACCEPTED"
            || donation.status==="ASSIGNED"
            || donation.status==="PICKED_UP"){

                accepted++;

            }


            if(donation.status==="PENDING"){

                pending++;

            }


            if(donation.status==="COMPLETED"
            || donation.status==="DELIVERED"){

                completed++;

            }


        });



        document.getElementById(
            "acceptedCount"
        ).textContent = accepted;



        document.getElementById(
            "pendingCount"
        ).textContent = pending;



        document.getElementById(
            "completedCount"
        ).textContent = completed;



    }


    catch(error){

        console.error(error);

    }


}



/* ==========================================
        LOAD AVAILABLE DONATIONS
========================================== */

async function loadAvailableDonations(){


    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/available`

        );


        if(!response.ok){

            throw new Error(
                "Unable to load donations"
            );

        }


        const donations =
        await response.json();



        document.getElementById(
            "availableCount"
        ).textContent =
        donations.length;



        displayDonations(donations);


    }


    catch(error){

        console.error(error);

    }


}




/* ==========================================
        DISPLAY DONATIONS TABLE
========================================== */


function displayDonations(donations){


    const table =
    document.getElementById(
        "donationTableBody"
    );


    table.innerHTML="";



    if(donations.length===0){


        table.innerHTML=

        `
        <tr>

            <td colspan="8">

                No donations available.

            </td>

        </tr>
        `;


        return;

    }



    donations.forEach(donation=>{


        table.innerHTML +=


        `
        <tr>


            <td>
                ${donation.restaurantName}
            </td>


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
                ${formatDate(
                    donation.expiryTime
                )}
            </td>


            <td>

                <span class="status available">

                    ${donation.status}

                </span>

            </td>


            <td>

                <button

                class="action-btn accept-btn"

                onclick="
                acceptDonation(
                ${donation.donationId}
                )">

                    Accept

                </button>

            </td>


        </tr>
        `;


    });


}




/* ==========================================
            ACCEPT DONATION
========================================== */


async function acceptDonation(donationId){


    if(!ngoId){

        alert(
            "NGO login required"
        );

        return;

    }



    try{


        const response =
        await fetch(

        `${BASE_URL}/donations/${donationId}/accept/${ngoId}`,

        {

            method:"PUT"

        }

        );



        if(!response.ok){

            throw new Error(
                "Unable to accept donation"
            );

        }



        alert(
            "Donation accepted successfully"
        );



        // Refresh everything

        loadDashboardCounts();

        loadAvailableDonations();



    }


    catch(error){

        alert(
            error.message
        );

    }


}



/* ==========================================
            DATE FORMAT
========================================== */


function formatDate(date){


    if(!date)

        return "-";


    return new Date(date)
    .toLocaleString();


}



/* ==========================================
                LOGOUT
========================================== */


function logout(){

    localStorage.clear();

    window.location.href="/login";

}