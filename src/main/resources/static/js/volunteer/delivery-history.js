const BASE_URL = "http://localhost:8080/api";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDeliveryHistory();

    }
);



// ===============================
// GET VOLUNTEER ID
// ===============================

function getVolunteerId(){

    return localStorage.getItem("volunteerId");

}




// ===============================
// LOAD DELIVERY HISTORY
// ===============================

async function loadDeliveryHistory(){

    const volunteerId = getVolunteerId();


    if(!volunteerId){

        console.error("Volunteer ID missing");

        return;

    }



    try{


        const response = await fetch(

            `${BASE_URL}/donations/volunteer/${volunteerId}`

        );



        const donations = await response.json();



        console.log(
            "Volunteer Donations:",
            donations
        );



        const completedDonations =
        donations.filter(
            donation =>
            donation.status === "COMPLETED"
        );



        displayHistory(
            completedDonations
        );



        updateCards(
            completedDonations
        );


    }


    catch(error){


        console.error(
            "Delivery History Error:",
            error
        );


    }

}






// ===============================
// DISPLAY HISTORY TABLE
// ===============================

function displayHistory(
    donations
){


    const table =
    document.getElementById(
        "historyTableBody"
    );



    table.innerHTML = "";



    if(
        donations.length === 0
    ){


        table.innerHTML = `

        <tr>

        <td colspan="6"
        class="empty-message">

        No completed deliveries found.

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
        ${donation.ngoName || "-"}
        </td>


        <td>
        ${
            donation.completedAt
            ?
            formatDate(donation.completedAt)
            :
            "-"
        }
        </td>


        <td>

        <span class="status COMPLETED">

        COMPLETED

        </span>

        </td>


        </tr>

        `;


    });


}






// ===============================
// UPDATE SUMMARY CARDS
// ===============================

function updateCards(
    donations
){


    document.getElementById(
        "totalDeliveries"
    ).innerText = donations.length;



    let meals = 0;



    donations.forEach(
        donation => {


            meals +=
            donation.approxMeals || 0;


        }
    );



    document.getElementById(
        "totalMeals"
    ).innerText = meals;


}






// ===============================
// DATE FORMAT
// ===============================

function formatDate(date){


    return new Date(date)
    .toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );


}






// ===============================
// LOGOUT
// ===============================

function logout(){

    localStorage.clear();

    window.location.href="/login";

}