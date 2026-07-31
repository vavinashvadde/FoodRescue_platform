const BASE_URL = "/api/admin";


let adminId = 1;




document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

    }
);







// ======================================
// LOAD PROFILE
// ======================================


async function loadProfile(){


    try{


        const response =
        await fetch(
            `${BASE_URL}/profile/${adminId}`
        );



        if(!response.ok){

            throw new Error(
                "Failed to load profile"
            );

        }



        const admin =
        await response.json();



        console.log(admin);



        document.getElementById(
            "adminName"
        ).innerText =
        admin.adminName;





        document.getElementById(
            "adminRole"
        ).innerText =
        admin.role;






        document.getElementById(
            "name"
        ).value =
        admin.adminName;






        document.getElementById(
            "email"
        ).value =
        admin.email;






        document.getElementById(
            "role"
        ).value =
        admin.role;






        document.getElementById(
            "status"
        ).value =
        admin.status;



    }


    catch(error){


        console.error(
            "Profile Error:",
            error
        );


    }


}









// ======================================
// UPDATE PROFILE
// ======================================


async function updateProfile(){


    const data = {


        adminName:
        document.getElementById(
            "name"
        ).value



    };







    try{


        const response =
        await fetch(

            `${BASE_URL}/profile/${adminId}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(data)


            }

        );





        if(response.ok){


            showToast(
                "Profile Updated Successfully"
            );


            loadProfile();


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
// LOGOUT
// ======================================


function logout(){


    localStorage.clear();


    window.location.href="/login";


}