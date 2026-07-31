/* ==========================================
            HOME PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();

    initializeMobileMenu();

    initializeCounters();

    initializeSmoothScroll();

});

/* ==========================================
            STICKY NAVBAR
========================================== */

function initializeNavbar() {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background = "#ffffff";

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";

        }

        else {

            header.style.background = "#ffffff";

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.08)";

        }

    });

}

/* ==========================================
            MOBILE MENU
========================================== */

function initializeMobileMenu() {

    const menuBtn =
        document.querySelector(".menu-btn");

    const navbar =
        document.querySelector(".navbar");

    if (!menuBtn || !navbar)
        return;

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        icon.classList.toggle("fa-bars");

        icon.classList.toggle("fa-xmark");

    });

}

/* ==========================================
            COUNTERS
========================================== */

function initializeCounters() {

    const counters = [

        ["mealCounter", 12000],
        ["restaurantCounter", 350],
        ["ngoCounter", 120],

        ["mealCounter2", 12000],
        ["restaurantCounter2", 350],
        ["ngoCounter2", 120],
        ["volunteerCounter2", 500]

    ];

    counters.forEach(counter => {

        animateCounter(

            counter[0],

            counter[1]

        );

    });

}

function animateCounter(id, target) {

    const element =
        document.getElementById(id);

    if (!element)
        return;

    let count = 0;

    const increment =
        Math.ceil(target / 100);

    const timer = setInterval(() => {

        count += increment;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.innerHTML =
            count.toLocaleString() + "+";

    }, 20);

}

/* ==========================================
        SMOOTH SCROLL
========================================== */

function initializeSmoothScroll() {

    document
        .querySelectorAll("a[href^='#']")
        .forEach(link => {

            link.addEventListener("click", function (e) {

                const target =
                    document.querySelector(

                        this.getAttribute("href")

                    );

                if (!target)
                    return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

                const navbar =
                    document.querySelector(".navbar");

                navbar.classList.remove("active");

                const icon =
                    document.querySelector(".menu-btn i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            });

        });

}
/* ==========================================
        SCROLL REVEAL ANIMATION
========================================== */

function initializeScrollReveal() {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fade-up");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    document.querySelectorAll(

        ".about,.mission-card,.feature-card,.impact-card,.timeline-card,.statistics-card,.testimonial-card,.contact-card,.contact-form,.feedback-box,.cta"

    ).forEach(element => {

        observer.observe(element);

    });

}

initializeScrollReveal();

/* ==========================================
            CONTACT FORM
========================================== */

const contactForm = document.querySelector(

    ".contact-form form"

);

if(contactForm){

    contactForm.addEventListener("submit",function(e){

        e.preventDefault();

        if(typeof showToast==="function"){

            showToast(

                "success",

                "Message Sent",

                "Thank you! We will contact you soon."

            );

        }

        else{

            alert("Message Sent Successfully!");

        }

        this.reset();

    });

}

/* ==========================================
            FEEDBACK FORM
========================================== */

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const feedback = {

            name: document.getElementById("feedbackName").value,
            email: document.getElementById("feedbackEmail").value,
            rating: document.getElementById("feedbackRating").selectedIndex,
            comments: document.getElementById("feedbackComments").value

        };

        try {

            const response = await fetch("/api/website-feedback", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(feedback)

            });

            if (!response.ok) {

                throw new Error();

            }

            showToast(
                "success",
                "Feedback Submitted",
                "Thank you for your valuable feedback."
            );

            feedbackForm.reset();

        } catch (error) {

            showToast(
                "error",
                "Submission Failed",
                "Please try again later."
            );

        }

    });

}

/* ==========================================
            SCROLL TO TOP
========================================== */

const scrollButton = document.createElement("button");

scrollButton.className = "scroll-top";

scrollButton.innerHTML =

'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(scrollButton);

Object.assign(scrollButton.style,{

    position:"fixed",

    right:"25px",

    bottom:"25px",

    width:"55px",

    height:"55px",

    border:"none",

    borderRadius:"50%",

    background:"#2E7D32",

    color:"#ffffff",

    cursor:"pointer",

    display:"none",

    fontSize:"18px",

    zIndex:"999",

    boxShadow:"0 12px 30px rgba(0,0,0,.25)",

    transition:".3s"

});

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollButton.style.display="block";

    }

    else{

        scrollButton.style.display="none";

    }

});

scrollButton.addEventListener("mouseenter",()=>{

    scrollButton.style.transform="translateY(-5px)";

});

scrollButton.addEventListener("mouseleave",()=>{

    scrollButton.style.transform="translateY(0)";

});

scrollButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================
            PRELOADER
========================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

/* ==========================================
            PAGE READY
========================================== */

console.log("Food Rescue Home Loaded Successfully");