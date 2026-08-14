/* ==========================================
                BASE URL
========================================== */

const BASE_URL = "/api";



/* ==========================================
                PAGE LOAD
========================================== */


document.addEventListener("DOMContentLoaded",()=>{


    loadDonationDetails();


});



/* ==========================================
            LOAD DONATION DETAILS
========================================== */


async function loadDonationDetails(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    const donationId =
    params.get("id");



    if(!donationId){


        alert(
            "Donation ID not found"
        );

        return;

    }



    try{


        const response =
        await fetch(

            `${BASE_URL}/donations/${donationId}`

        );



        if(!response.ok){


            throw new Error(
                "Unable to load donation"
            );


        }



        const donation =
        await response.json();



        displayDonation(donation);



    }


    catch(error){


        console.error(error);


        alert(
            error.message
        );


    }


}



/* ==========================================
            DISPLAY DATA
========================================== */


function displayDonation(donation){



    document.getElementById(
        "foodName"
    ).textContent =
    donation.foodName || "-";



    document.getElementById(
        "restaurantName"
    ).textContent =
    donation.restaurantName || "-";



    document.getElementById(
        "foodType"
    ).textContent =
    donation.foodType || "-";



    document.getElementById(
        "quantity"
    ).textContent =
    donation.quantity + " kg";



    document.getElementById(
        "meals"
    ).textContent =
    donation.approxMeals || "-";



    document.getElementById(
        "status"
    ).textContent =
    donation.status || "-";



    document.getElementById(
        "address"
    ).textContent =
    donation.pickupAddress || "-";



    document.getElementById(
        "expiry"
    ).textContent =
    formatDate(
        donation.expiryTime
    );



    document.getElementById(
        "instructions"
    ).textContent =
    donation.specialInstructions || "None";



}



/* ==========================================
            DATE FORMAT
========================================== */


function formatDate(date){


    if(!date)

        return "-";



    return new Date(date)
    .toLocaleString(
        "en-IN"
    );


}
/* ==========================================
                LOGOUT
========================================== */

function logout(){

    localStorage.clear();

    window.location.href="/login";

}
