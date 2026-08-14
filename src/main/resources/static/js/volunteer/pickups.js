/* ==========================================
        BASE URL
========================================== */
const BASE_URL = "/api";






/* ==========================================
        PAGE LOAD
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPickups();

    }
);







/* ==========================================
        GET VOLUNTEER ID
========================================== */


function getVolunteerId(){

    return localStorage.getItem("volunteerId");

}







/* ==========================================
        LOAD PICKUPS
========================================== */


async function loadPickups(){


    const volunteerId =
    getVolunteerId();



    if(!volunteerId){

        console.error(
            "Volunteer ID missing"
        );

        return;

    }




    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/volunteer/${volunteerId}`

        );



        const donations =
        await response.json();



        console.log(
            "Assigned Donations:",
            donations
        );



        displayPickups(
            donations
        );



        updateCounts(
            donations
        );


    }


    catch(error){


        console.error(
            "Pickup Error:",
            error
        );


    }


}







/* ==========================================
        DISPLAY PICKUPS
========================================== */


function displayPickups(
    donations
){


    const table =
    document.getElementById(
        "pickupTableBody"
    );



    table.innerHTML = "";



    if(
        donations.length === 0
    ){


        table.innerHTML = `

        <tr>

        <td colspan="6"
        class="empty-message">

        No assigned pickups found.

        </td>

        </tr>

        `;


        return;

    }






    donations.forEach(
        donation => {



        let action = "";



        if(
            donation.status === "ASSIGNED"
        ){


            action = `

            <button

            class="action-btn pickup-btn"

            onclick="pickupDonation(${donation.donationId})">


            <i class="fa-solid fa-truck"></i>

            Pickup


            </button>


            `;


        }




        else if(
            donation.status === "PICKED_UP"
        ){


            action = `

            <button

            class="action-btn deliver-btn"

            onclick="deliverDonation(${donation.donationId})">


            <i class="fa-solid fa-location-dot"></i>

            Deliver


            </button>


            `;


        }




        else if(	
            donation.status === "DELIVERED"
        ){


            action = `

            <button

            class="action-btn complete-btn"

            onclick="completeDonation(${donation.donationId})">


            <i class="fa-solid fa-circle-check"></i>

            Complete


            </button>


            `;


        }





        table.innerHTML += `


        <tr>


        <td>

        ${donation.restaurantName || "-"}

        </td>



        <td>

        ${donation.foodName}

        </td>



        <td>

        ${donation.quantity}

        </td>




        <td>

        ${donation.pickupAddress}

        </td>




        <td>


        <span class="status ${donation.status}">

        ${donation.status}

        </span>


        </td>




        <td>

        ${action}

        </td>



        </tr>


        `;



    });


}








/* ==========================================
        UPDATE COUNTS
========================================== */


function updateCounts(
    donations
){


    document.getElementById(
        "assignedCount"
    ).innerText =

    donations.filter(
        d=>d.status==="ASSIGNED"
    ).length;




    document.getElementById(
        "pendingCount"
    ).innerText =

    donations.filter(
        d=>d.status==="ASSIGNED"
    ).length;




	document.getElementById(
	    "pickedCount"
	).innerText =

	donations.filter(
	    d=>d.status==="PICKED_UP"
	).length;


}







/* ==========================================
        PICKUP
========================================== */


async function pickupDonation(donationId){

    try{

        const response = await fetch(
            `${BASE_URL}/donations/${donationId}/pickup`,
            {
                method:"PUT"
            }
        );


        if(!response.ok){

            throw new Error("Pickup update failed");

        }


        alert("Pickup completed successfully");

        loadPickups();


    }
    catch(error){

        console.error(error);

        alert(error.message);

    }

}







/* ==========================================
        DELIVER
========================================== */


async function deliverDonation(donationId){

    try{

        const response = await fetch(
            `${BASE_URL}/donations/${donationId}/deliver`,
            {
                method:"PUT"
            }
        );


        if(!response.ok){

            throw new Error("Delivery update failed");

        }


        alert("Donation delivered successfully");

        loadPickups();


    }
    catch(error){

        console.error(error);

        alert(error.message);

    }

}







/* ==========================================
        COMPLETE
========================================== */


async function completeDonation(donationId){

    try{

        const response = await fetch(
            `${BASE_URL}/donations/${donationId}/complete`,
            {
                method:"PUT"
            }
        );


        if(!response.ok){

            throw new Error("Completion update failed");

        }


        alert("Donation completed successfully");

        loadPickups();


    }
    catch(error){

        console.error(error);

        alert(error.message);

    }

}








/* ==========================================
        UPDATE STATUS API
========================================== */


async function updateStatus(
    donationId,
    status
){


    try{


        const response =
        await fetch(

        `${BASE_URL}/donations/${donationId}/status/${status}`,

        {

            method:"PUT"

        }

        );



        if(!response.ok){


            throw new Error(
                "Status update failed"
            );


        }




        alert(
            "Status updated successfully"
        );



        loadPickups();



    }



    catch(error){


        console.error(
            error
        );


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
