const BASE_URL = "/api";



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadNgos();

    }
);




// ======================================
// LOAD NGOs
// ======================================


async function loadNgos(){

    try{


        const response =
        await fetch(
            `${BASE_URL}/admin-ngos`
        );



        if(!response.ok){

            throw new Error(
                "Failed to load NGOs"
            );

        }



        const ngos =
        await response.json();



        console.log(
            "NGOs:",
            ngos
        );



        updateCards(ngos);


        displayNgos(ngos);



    }


    catch(error){


        console.error(
            "NGO Error:",
            error
        );


        document.getElementById(
            "ngoTable"
        ).innerHTML = `

        <tr>
        <td colspan="7">
        Failed to load NGOs
        </td>
        </tr>

        `;


    }

}








// ======================================
// UPDATE CARDS
// ======================================


function updateCards(ngos){


    document.getElementById(
        "totalNgos"
    ).innerText =
    ngos.length;



    document.getElementById(
        "activeNgos"
    ).innerText =

    ngos.filter(
        ngo =>
        ngo.status === "ACTIVE" ||
        ngo.status === "APPROVED"
    ).length;




    document.getElementById(
        "pendingNgos"
    ).innerText =

    ngos.filter(
        ngo =>
        ngo.status === "PENDING"
    ).length;




    document.getElementById(
        "blockedNgos"
    ).innerText =

    ngos.filter(
        ngo =>
        ngo.status === "BLOCKED"
    ).length;



}









// ======================================
// DISPLAY NGO TABLE
// ======================================


function displayNgos(ngos){


    const table =
    document.getElementById(
        "ngoTable"
    );



    table.innerHTML = "";




    if(ngos.length === 0){


        table.innerHTML = `

        <tr>

        <td colspan="7">

        No NGOs available

        </td>

        </tr>

        `;


        return;

    }






    ngos.forEach(
        ngo => {



        table.innerHTML += `


        <tr>



        <td>
        ${ngo.ngoName || "-"}
        </td>



        <td>
        ${ngo.ownerName || "-"}
        </td>




        <td>
        ${ngo.phone || "-"}
        </td>




        <td>
        ${ngo.city || "-"}
        </td>




        <td>
        ${ngo.registrationNumber || "-"}
        </td>




        <td>


        <span class="status ${getStatusClass(ngo.status)}">

        ${ngo.status || "-"}

        </span>


        </td>




        <td>

        ${getActions(ngo)}

        </td>




        </tr>



        `;



    });


}









// ======================================
// ACTION BUTTONS
// ======================================


function getActions(ngo){


    let id =
    ngo.ngoId;




    if(
        ngo.status === "PENDING"
    ){


        return `


        <button class="action-btn approve-btn"
        onclick="approveNgo(${id})">

        Approve

        </button>



        <button class="action-btn reject-btn"
        onclick="rejectNgo(${id})">

        Reject

        </button>


        `;


    }






    if(
        ngo.status === "ACTIVE" ||
        ngo.status === "APPROVED"
    ){


        return `


        <button class="action-btn block-btn"
        onclick="blockNgo(${id})">

        Block

        </button>


        `;


    }







    if(
        ngo.status === "BLOCKED"
    ){


        return `


        <button class="action-btn unblock-btn"
        onclick="unblockNgo(${id})">

        Unblock

        </button>


        `;


    }



    return "-";


}









// ======================================
// API ACTIONS
// ======================================


async function approveNgo(id){

    updateNgoStatus(
        id,
        "approve"
    );

}



async function rejectNgo(id){

    updateNgoStatus(
        id,
        "reject"
    );

}



async function blockNgo(id){

    updateNgoStatus(
        id,
        "block"
    );

}



async function unblockNgo(id){

    updateNgoStatus(
        id,
        "unblock"
    );

}








async function updateNgoStatus(
    id,
    action
){


    try{


        const response =
        await fetch(

            `${BASE_URL}/ngos/${id}/${action}`,

            {
                method:"PUT"
            }

        );



        if(response.ok){


            loadNgos();


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


function getStatusClass(status){


    if(!status)
        return "";


    return status
    .toLowerCase();


}








// ======================================
// LOGOUT
// ======================================


function logout(){


    localStorage.clear();


    window.location.href="/login";


}
