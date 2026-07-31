/* ==========================================
        BASE URL
========================================== */

console.log("Current URL:", window.location.href);
console.log("Search:", window.location.search);
console.log("Assign Volunteer JS Loaded");

const BASE_URL = "http://localhost:8080/api";





/* ==========================================
        PAGE LOAD
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log("Assign page loaded");

        loadDonation();

        loadVolunteers();

    }
);







/* ==========================================
        GET DONATION ID
========================================== */


function getDonationId(){

    const params =
    new URLSearchParams(
        window.location.search
    );

    return params.get("id");

}







/* ==========================================
        LOAD DONATION DETAILS
========================================== */


async function loadDonation(){

    const donationId = getDonationId();

    console.log("Donation ID:", donationId);


    if(!donationId){

        alert("Donation ID missing");

        return;

    }


    try{

        const response = await fetch(
            `${BASE_URL}/donations/${donationId}`
        );


        console.log(
            "Donation API Status:",
            response.status
        );


        const donation = await response.json();


        console.log(
            "Donation Data:",
            donation
        );



        // ==============================
        // DISPLAY DONATION DETAILS
        // ==============================


        document.getElementById("foodName").textContent =
        donation.foodName || "-";


        document.getElementById("quantity").textContent =
        donation.quantity || "-";


        document.getElementById("donationStatus").textContent =
        donation.status || "-";


        document.getElementById("restaurantName").textContent =
        donation.restaurantName || "Restaurant ID: " + donation.restaurantId;



    }


    catch(error){

        console.error(
            "Donation Error:",
            error
        );

    }

}








/* ==========================================
        LOAD AVAILABLE VOLUNTEERS
========================================== */


async function loadVolunteers(){

    console.log("Loading Volunteers");


    try{

        const response = await fetch(
            `${BASE_URL}/volunteers/availability/AVAILABLE`
        );


        console.log(
            "Volunteer API Status:",
            response.status
        );


		const volunteers =
		await response.json();


		console.log(
		    "Volunteers:",
		    volunteers
		);


		displayVolunteers(volunteers);

    }

    catch(error){

        console.error(
            "Volunteer Error:",
            error
        );

    }

}







/* ==========================================
        DISPLAY VOLUNTEERS
========================================== */


function displayVolunteers(volunteers){


    const table =
    document.getElementById(
        "volunteerTableBody"
    );



    table.innerHTML = "";



    if(volunteers.length === 0){


        table.innerHTML = `

        <tr>

        <td colspan="5"
        class="empty-message">

        No available volunteers.

        </td>

        </tr>

        `;


        return;

    }






    volunteers.forEach(
        volunteer => {



        table.innerHTML += `


        <tr>


        <td>

        ${volunteer.fullName}

        </td>



        <td>

        ${volunteer.phone}

        </td>



        <td>

        ${volunteer.city}

        </td>



        <td>


        <span class="availability AVAILABLE">

        ${volunteer.availability}

        </span>


        </td>




        <td>


        <button

        class="assign-btn"

        onclick="
        assignVolunteer(${volunteer.volunteerId})
        ">


        <i class="fa-solid fa-user-plus"></i>


        Assign


        </button>


        </td>



        </tr>


        `;


    });


}








/* ==========================================
        ASSIGN VOLUNTEER
========================================== */


async function assignVolunteer(
    volunteerId
){


    const donationId =
    getDonationId();



    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/${donationId}/assign/${volunteerId}`,

            {

                method:"PUT"

            }

        );



        if(!response.ok){


            throw new Error(
                "Assignment failed"
            );


        }



        alert(
            "Volunteer assigned successfully!"
        );



        window.location.href =
        "/received-food";


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