const BASE_URL = "/api";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadRestaurants();

    }
);



// ======================================
// LOAD RESTAURANTS
// ======================================

async function loadRestaurants(){

    try{

        const response =
        await fetch(
            `${BASE_URL}/restaurants`
        );


        if(!response.ok){

            throw new Error(
                "Failed to load restaurants"
            );

        }


        const restaurants =
        await response.json();


        console.log(
            "Restaurants:",
            restaurants
        );


        updateCards(restaurants);

        displayRestaurants(restaurants);


    }


    catch(error){

        console.error(
            "Restaurant Error:",
            error
        );


        document.getElementById(
            "restaurantTable"
        ).innerHTML = `

        <tr>
        <td colspan="7">
        Failed to load restaurants
        </td>
        </tr>

        `;

    }

}






// ======================================
// UPDATE SUMMARY CARDS
// ======================================


function updateCards(restaurants){


    document.getElementById(
        "totalRestaurants"
    ).innerText =
    restaurants.length;



    document.getElementById(
        "activeRestaurants"
    ).innerText =

    restaurants.filter(
        r => r.status === "ACTIVE" ||
             r.status === "APPROVED"
    ).length;



    document.getElementById(
        "pendingRestaurants"
    ).innerText =

    restaurants.filter(
        r => r.status === "PENDING"
    ).length;



    document.getElementById(
        "blockedRestaurants"
    ).innerText =

    restaurants.filter(
        r => r.status === "BLOCKED"
    ).length;


}







// ======================================
// DISPLAY TABLE
// ======================================


function displayRestaurants(
    restaurants
){


    const table =
    document.getElementById(
        "restaurantTable"
    );



    table.innerHTML = "";



    if(restaurants.length === 0){

        table.innerHTML = `

        <tr>
        <td colspan="7">
        No restaurants available
        </td>
        </tr>

        `;

        return;

    }





    restaurants.forEach(
        restaurant => {


        table.innerHTML += `


        <tr>


        <td>
        ${restaurant.restaurantName || "-"}
        </td>


        <td>
        ${restaurant.ownerName || "-"}
        </td>


        <td>
        ${restaurant.phone || "-"}
        </td>


        <td>
        ${restaurant.city || "-"}
        </td>


        <td>
        ${restaurant.licenseNumber || "-"}
        </td>


        <td>

        <span class="status ${getStatusClass(restaurant.status)}">

        ${restaurant.status || "-"}

        </span>

        </td>



        <td>


        ${getActions(restaurant)}


        </td>



        </tr>


        `;


    });


}








// ======================================
// ACTION BUTTONS
// ======================================


function getActions(
    restaurant
){


    let id =
    restaurant.restaurantId;



    if(
        restaurant.status === "PENDING"
    ){

        return `

        <button class="action-btn approve-btn"
        onclick="approveRestaurant(${id})">

        Approve

        </button>


        <button class="action-btn reject-btn"
        onclick="rejectRestaurant(${id})">

        Reject

        </button>

        `;

    }




    if(
        restaurant.status === "APPROVED" ||
        restaurant.status === "ACTIVE"
    ){

        return `

        <button class="action-btn block-btn"
        onclick="blockRestaurant(${id})">

        Block

        </button>

        `;

    }





    if(
        restaurant.status === "BLOCKED"
    ){

        return `

        <button class="action-btn unblock-btn"
        onclick="unblockRestaurant(${id})">

        Unblock

        </button>

        `;

    }



    return "-";


}








// ======================================
// API ACTIONS
// ======================================


async function approveRestaurant(id){

    await updateRestaurantStatus(
        id,
        "approve"
    );

}



async function rejectRestaurant(id){

    await updateRestaurantStatus(
        id,
        "reject"
    );

}



async function blockRestaurant(id){

    await updateRestaurantStatus(
        id,
        "block"
    );

}



async function unblockRestaurant(id){

    await updateRestaurantStatus(
        id,
        "unblock"
    );

}






async function updateRestaurantStatus(
    id,
    action
){


    try{


        const response =
        await fetch(
            `${BASE_URL}/restaurants/${id}/${action}`,
            {
                method:"PUT"
            }
        );



        if(response.ok){

            loadRestaurants();

        }


    }


    catch(error){

        console.error(
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
