/* ==========================================
        BASE URL
========================================== */

const BASE_URL = "/api";



/* ==========================================
        FORM SUBMIT
========================================== */


document
.getElementById("volunteerRegisterForm")
.addEventListener(
    "submit",
    registerVolunteer
);





async function registerVolunteer(event){


    event.preventDefault();



    const userId =
        localStorage.getItem("userId");



    if(!userId){


        alert(
            "Please login first."
        );


        window.location.href="/login";


        return;

    }





    const volunteerData = {


        userId: Number(userId),


        fullName:
        document
        .getElementById("fullName")
        .value.trim(),



        phone:
        document
        .getElementById("phone")
        .value.trim(),



        gender:
        document
        .getElementById("gender")
        .value,



        city:
        document
        .getElementById("city")
        .value.trim(),



        address:
        document
        .getElementById("address")
        .value.trim(),



        availability:
        document
        .getElementById("availability")
        .value

    };





    try{


        const response =
        await fetch(

            `${BASE_URL}/volunteers/register`,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(
                    volunteerData
                )

            }

        );





        const data =
        await response.json();





        if(!response.ok){


            alert(
                data.message ||
                "Volunteer registration failed"
            );


            return;


        }





        alert(
            "Volunteer profile created successfully!"
        );




        // Save volunteer details

        if(data.volunteerId){

            localStorage.setItem(

                "volunteerId",

                data.volunteerId

            );

        }



        if(data.fullName){

            localStorage.setItem(

                "volunteerName",

                data.fullName

            );

        }





        window.location.href =
        "/volunteer-dashboard";



    }



    catch(error){


        console.error(error);


        alert(
            "Unable to connect to server."
        );


    }


}
