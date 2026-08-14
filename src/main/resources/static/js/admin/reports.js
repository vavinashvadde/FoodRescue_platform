const BASE_URL = "/api";



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadReports();

    }
);






// ======================================
// LOAD REPORT DATA
// ======================================


async function loadReports(){


    try{


        const response =
        await fetch(
            `${BASE_URL}/admin-reports`
        );



        if(!response.ok){

            throw new Error(
                "Failed to load reports"
            );

        }



        const report =
        await response.json();



        console.log(
            report
        );



        updateReportCards(
            report
        );



        updateSummary(
            report
        );



    }


    catch(error){


        console.error(
            "Report Error:",
            error
        );


    }


}









// ======================================
// UPDATE CARDS
// ======================================


function updateReportCards(
    report
){



    document.getElementById(
        "totalDonations"
    ).innerText =

    report.totalDonations || 0;





    document.getElementById(
        "completedDonations"
    ).innerText =

    report.completedDonations || 0;






    document.getElementById(
        "pendingDonations"
    ).innerText =

    report.pendingDonations || 0;






    document.getElementById(
        "expiredDonations"
    ).innerText =

    report.expiredDonations || 0;







    document.getElementById(
        "totalRestaurants"
    ).innerText =

    report.totalRestaurants || 0;







    document.getElementById(
        "totalNgos"
    ).innerText =

    report.totalNgos || 0;







    document.getElementById(
        "totalVolunteers"
    ).innerText =

    report.totalVolunteers || 0;



}









// ======================================
// SUMMARY
// ======================================


function updateSummary(
    report
){



    let total =
    report.totalDonations || 0;



    let completed =
    report.completedDonations || 0;





    let percentage = 0;



    if(total > 0){


        percentage =
        ((completed / total) * 100)
        .toFixed(2);


    }





    document.getElementById(
        "completionRate"
    ).innerText =

    percentage + "%";






    document.getElementById(
        "distributionStatus"
    ).innerText =



    completed > 0

    ?

    "Food successfully delivered"

    :

    "No completed deliveries yet";



}









// ======================================
// LOGOUT
// ======================================


function logout(){


    localStorage.clear();


    window.location.href="/login";


}
