const BASE_URL = "/api";


document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    document
        .getElementById("profileForm")
        .addEventListener("submit", updateProfile);

});


// ==========================================
// LOAD NGO PROFILE
// ==========================================

async function loadProfile(){

    const ngoId = localStorage.getItem("ngoId");


    if(!ngoId){

        alert("NGO ID not found");

        return;

    }


    try{


        const response = await fetch(
            `${BASE_URL}/ngos/${ngoId}`
        );


        if(!response.ok){

            throw new Error("Unable to load profile");

        }


        const ngo = await response.json();


        displayProfile(ngo);


    }

    catch(error){

        console.error(error);

        showMessage(
            "Failed to load NGO profile",
            "error"
        );

    }

}



// ==========================================
// DISPLAY PROFILE DATA
// ==========================================

function displayProfile(ngo){

    document.getElementById("ngoName")
        .textContent = ngo.ngoName;


    document.getElementById("status")
        .textContent = ngo.status;


    document.getElementById("ngoNameInput")
        .value = ngo.ngoName || "";


    document.getElementById("ownerName")
        .value = ngo.ownerName || "";


    document.getElementById("email")
        .value = ngo.email || "";


    document.getElementById("phone")
        .value = ngo.phone || "";


    document.getElementById("registrationNumber")
        .value = ngo.registrationNumber || "";


    document.getElementById("city")
        .value = ngo.city || "";


    document.getElementById("address")
        .value = ngo.address || "";

}



// ==========================================
// UPDATE PROFILE
// ==========================================

async function updateProfile(event){


    event.preventDefault();



    const ngoId = localStorage.getItem("ngoId");



    const updatedNGO = {


        ngoName:
        document.getElementById("ngoNameInput").value,


        ownerName:
        document.getElementById("ownerName").value,


        phone:
        document.getElementById("phone").value,


        registrationNumber:
        document.getElementById("registrationNumber").value,


        address:
        document.getElementById("address").value,


        city:
        document.getElementById("city").value


    };



    try{


        const response = await fetch(

            `${BASE_URL}/ngos/${ngoId}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(updatedNGO)

            }

        );



        if(!response.ok){

            throw new Error(
                "Update failed"
            );

        }



        const data = await response.json();



        displayProfile(data);



        localStorage.setItem(
            "ngoName",
            data.ngoName
        );



        showMessage(
            "Profile updated successfully",
            "success"
        );


    }


    catch(error){


        console.error(error);


        showMessage(
            "Unable to update profile",
            "error"
        );


    }


}



// ==========================================
// MESSAGE
// ==========================================

function showMessage(message,type){


    if(typeof showToast === "function"){

        showToast(message,type);

    }

    else{

        alert(message);

    }


}
