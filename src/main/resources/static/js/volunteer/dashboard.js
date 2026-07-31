/* ==========================================
        BASE URL
========================================== */

const BASE_URL = "http://localhost:8080/api";



/* ==========================================
        PAGE LOAD
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadVolunteer();

        loadDashboard();

    }
);





/* ==========================================
        LOAD VOLUNTEER DETAILS
========================================== */


function loadVolunteer(){


    const name =
    localStorage.getItem("volunteerName");


    document.getElementById(
        "volunteerName"
    ).textContent =
    name || "Volunteer";


}







/* ==========================================
        LOAD DASHBOARD
========================================== */


async function loadDashboard(){


    const volunteerId =
    localStorage.getItem("volunteerId");



    if(!volunteerId){

        alert("Volunteer login required");

        window.location.href="/login";

        return;

    }



    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/volunteer/${volunteerId}`

        );



        if(!response.ok){

            throw new Error(
                "Unable to load donations"
            );

        }



        const donations =
        await response.json();



        updateCards(donations);


        displayDonations(donations);



    }

    catch(error){


        console.error(error);


    }


}







/* ==========================================
        UPDATE CARDS
========================================== */


function updateCards(donations){



    document.getElementById(
        "totalPickups"
    ).textContent =
    donations.length;



    const pending =
    donations.filter(
        d =>
        d.status === "ASSIGNED" ||
        d.status === "PENDING"
    ).length;



    const completed =
    donations.filter(
        d =>
        d.status === "COMPLETED"
    ).length;



    document.getElementById(
        "pendingPickups"
    ).textContent =
    pending;



    document.getElementById(
        "completedDeliveries"
    ).textContent =
    completed;



}







/* ==========================================
        DISPLAY DONATIONS
========================================== */


function displayDonations(donations){



    const table =
    document.getElementById(
        "donationTableBody"
    );



    table.innerHTML = "";




    if(donations.length === 0){


        table.innerHTML = `

        <tr>

            <td colspan="6"
                class="empty-message">

                No assigned donations.

            </td>

        </tr>

        `;


        return;

    }






    donations.forEach(
        donation => {



        table.innerHTML += `

        <tr>


            <td>
                ${donation.restaurantName || "-"}
            </td>



            <td>
                ${donation.foodName || "-"}
            </td>



            <td>
                ${donation.quantity || "-"}
            </td>



            <td>
                ${donation.pickupTime || "-"}
            </td>



            <td>

                <span class="status ${donation.status}">

                    ${donation.status}

                </span>

            </td>




            <td>

                ${getActionButton(donation)}

            </td>



        </tr>

        `;


    });



}







/* ==========================================
        ACTION BUTTONS
========================================== */


function getActionButton(donation){



    if(donation.status === "ASSIGNED"){


        return `

        <button

        class="action-btn pickup-btn"

        onclick="pickupDonation(${donation.donationId})">

        Pickup

        </button>

        `;


    }




    if(donation.status === "PICKED"){


        return `

        <button

        class="action-btn deliver-btn"

        onclick="deliverDonation(${donation.donationId})">

        Deliver

        </button>

        `;


    }





    if(donation.status === "DELIVERED"){


        return `

        <button

        class="action-btn complete-btn"

        onclick="completeDonation(${donation.donationId})">

        Complete

        </button>

        `;


    }



    return "-";


}







/* ==========================================
        PICKUP
========================================== */


async function pickupDonation(id){


    await updateDonationStatus(

        `${BASE_URL}/donations/${id}/pickup`

    );


}







/* ==========================================
        DELIVER
========================================== */


async function deliverDonation(id){


    await updateDonationStatus(

        `${BASE_URL}/donations/${id}/deliver`

    );


}







/* ==========================================
        COMPLETE
========================================== */


async function completeDonation(id){


    await updateDonationStatus(

        `${BASE_URL}/donations/${id}/complete`

    );


}







/* ==========================================
        UPDATE STATUS
========================================== */


async function updateDonationStatus(url){


    try{


        const response =
        await fetch(

            url,

            {

                method:"PUT"

            }

        );



        if(!response.ok){

            throw new Error(
                "Action failed"
            );

        }



        alert(
            "Updated successfully"
        );



        loadDashboard();


    }


    catch(error){


        alert(
            error.message
        );


    }


}







/* ==========================================
        LOGOUT
========================================== */


function logout(){


    localStorage.clear();


    window.location.href="/login";


}