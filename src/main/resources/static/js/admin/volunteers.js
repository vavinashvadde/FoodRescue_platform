const BASE_URL = "/api";



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadVolunteers();

    }
);





// ======================================
// LOAD VOLUNTEERS
// ======================================


async function loadVolunteers(){


    try{


        const response =
        await fetch(
            `${BASE_URL}/admin-volunteers`
        );



        if(!response.ok){

            throw new Error(
                "Failed to load volunteers"
            );

        }



        const volunteers =
        await response.json();



        console.log(
            "Volunteers:",
            volunteers
        );



        updateCards(
            volunteers
        );


        displayVolunteers(
            volunteers
        );



    }


    catch(error){


        console.error(
            "Volunteer Error:",
            error
        );



        document.getElementById(
            "volunteerTable"
        ).innerHTML = `


        <tr>

        <td colspan="7">

        Failed to load volunteers

        </td>

        </tr>


        `;


    }

}








// ======================================
// UPDATE CARDS
// ======================================


function updateCards(
    volunteers
){



    document.getElementById(
        "totalVolunteers"
    ).innerText =
    volunteers.length;





    document.getElementById(
        "activeVolunteers"
    ).innerText =

    volunteers.filter(
        volunteer =>
        volunteer.status === "ACTIVE" ||
        volunteer.status === "APPROVED"

    ).length;







    document.getElementById(
        "pendingVolunteers"
    ).innerText =

    volunteers.filter(
        volunteer =>
        volunteer.status === "PENDING"

    ).length;







    document.getElementById(
        "blockedVolunteers"
    ).innerText =

    volunteers.filter(
        volunteer =>
        volunteer.status === "BLOCKED"

    ).length;



}









// ======================================
// DISPLAY TABLE
// ======================================


function displayVolunteers(
    volunteers
){



    const table =
    document.getElementById(
        "volunteerTable"
    );



    table.innerHTML = "";





    if(volunteers.length === 0){


        table.innerHTML = `


        <tr>

        <td colspan="7">

        No volunteers available

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
        ${volunteer.volunteerName || "-"}
        </td>



        <td>
        ${volunteer.email || "-"}
        </td>




        <td>
        ${volunteer.phone || "-"}
        </td>




        <td>
        ${volunteer.city || "-"}
        </td>




        <td>
        ${volunteer.vehicleType || "-"}
        </td>




        <td>


        <span class="status ${getStatusClass(volunteer.status)}">


        ${volunteer.status || "-"}


        </span>


        </td>




        <td>


        ${getActions(volunteer)}


        </td>



        </tr>



        `;


    });



}









// ======================================
// ACTION BUTTONS
// ======================================


function getActions(
    volunteer
){


    let id =
    volunteer.volunteerId;





    if(
        volunteer.status === "PENDING"
    ){


        return `


        <button class="action-btn approve-btn"
        onclick="approveVolunteer(${id})">

        Approve

        </button>




        <button class="action-btn reject-btn"
        onclick="rejectVolunteer(${id})">

        Reject

        </button>



        `;


    }








    if(
        volunteer.status === "ACTIVE" ||
        volunteer.status === "APPROVED"
    ){


        return `


        <button class="action-btn block-btn"
        onclick="blockVolunteer(${id})">

        Block

        </button>


        `;


    }







    if(
        volunteer.status === "BLOCKED"
    ){


        return `


        <button class="action-btn unblock-btn"
        onclick="unblockVolunteer(${id})">

        Unblock

        </button>


        `;


    }



    return "-";


}









// ======================================
// API ACTIONS
// ======================================


async function approveVolunteer(id){


    updateVolunteerStatus(
        id,
        "approve"
    );


}



async function rejectVolunteer(id){


    updateVolunteerStatus(
        id,
        "reject"
    );


}



async function blockVolunteer(id){


    updateVolunteerStatus(
        id,
        "block"
    );


}



async function unblockVolunteer(id){


    updateVolunteerStatus(
        id,
        "unblock"
    );


}








async function updateVolunteerStatus(
    id,
    action
){


    try{


        const response =
        await fetch(

            `${BASE_URL}/volunteers/${id}/${action}`,

            {
                method:"PUT"
            }

        );



        if(response.ok){


            loadVolunteers();


        }



    }


    catch(error){


        console.error(
            "Update Error:",
            error
        );


    }


}









// ======================================
// STATUS CLASS
// ======================================


function getStatusClass(
    status
){


    if(!status)
        return "";


    return status.toLowerCase();


}








// ======================================
// LOGOUT
// ======================================


function logout(){


    localStorage.clear();


    window.location.href="/login";


}
