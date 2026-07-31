const BASE_URL = "http://localhost:8080/api";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

    }
);



// ===============================
// GET VOLUNTEER ID
// ===============================

function getVolunteerId(){

    return localStorage.getItem("volunteerId");

}





// ===============================
// LOAD PROFILE
// ===============================

async function loadProfile(){

    const volunteerId = getVolunteerId();


    if(!volunteerId){

        console.error("Volunteer ID missing");

        return;

    }



    try{


        const response = await fetch(

            `${BASE_URL}/volunteers/${volunteerId}`

        );



        if(!response.ok){

            throw new Error(
                "Failed to load profile"
            );

        }



        const volunteer =
        await response.json();



        console.log(
            "Volunteer Profile:",
            volunteer
        );



        displayProfile(
            volunteer
        );


    }


    catch(error){


        console.error(
            "Profile Error:",
            error
        );


    }

}







// ===============================
// DISPLAY PROFILE
// ===============================

function displayProfile(volunteer){

    document.getElementById("volunteerName").innerText =
    volunteer.fullName || "-";


    document.getElementById("volunteerStatus").innerText =
    volunteer.status || "ACTIVE";


    document.getElementById("phone").innerText =
    volunteer.phone || "-";


    document.getElementById("email").innerText =
    volunteer.email || "-";


    document.getElementById("gender").innerText =
    volunteer.gender || "-";


    document.getElementById("city").innerText =
    volunteer.city || "-";


    document.getElementById("address").innerText =
    volunteer.address || "-";


    document.getElementById("availability").innerText =
    volunteer.availability || "-";

}


function updateProfile(){

    document.querySelectorAll(".editable").forEach(
        field => {

            field.removeAttribute("readonly");

        }
    );


    document.getElementById("saveBtn")
    .style.display = "block";


}

async function saveProfile(){

    const volunteerId =
    getVolunteerId();


    const data={

        phone:
        document.getElementById("phone").value,

        gender:
        document.getElementById("gender").value,

        city:
        document.getElementById("city").value,

        address:
        document.getElementById("address").value,

        availability:
        document.getElementById("availability").value

    };



    const response =
    await fetch(

    `${BASE_URL}/volunteers/${volunteerId}`,

    {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });


    if(response.ok){

        alert("Profile updated successfully");

        location.reload();

    }

}


// ===============================
// LOGOUT
// ===============================

function logout(){

    localStorage.clear();

    window.location.href="/login";

}