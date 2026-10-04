/* =========================================
   FEELINGS JAR
   ========================================= */


const writeButton = document.getElementById("writeButton");

const modal = document.getElementById("modal");

const closeModal = document.getElementById("closeModal");

const feelingInput = document.getElementById("feelingInput");

const crushButton = document.getElementById("crushButton");

const characterCount = document.getElementById("characterCount");

const feelingCount = document.getElementById("feelingCount");

const paperContainer = document.getElementById("paperContainer");

const emptySection = document.getElementById("emptySection");

const emptyButton = document.getElementById("emptyButton");

const aftercare = document.getElementById("aftercare");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const aftercareMessage = document.getElementById("aftercareMessage");


/* =========================================
   DATA
   ========================================= */

let feelings = JSON.parse(
    localStorage.getItem("feelingsJar")
) || [];


/* =========================================
   INITIALIZE
   ========================================= */

updateJar();


/* =========================================
   OPEN MODAL
   ========================================= */

writeButton.addEventListener("click", () => {

    modal.classList.remove("hidden");

    setTimeout(() => {
        feelingInput.focus();
    }, 200);

});


/* =========================================
   CLOSE MODAL
   ========================================= */

closeModal.addEventListener("click", closeWritingModal);

document.querySelector(".modal-overlay")
    .addEventListener("click", closeWritingModal);


function closeWritingModal() {

    modal.classList.add("hidden");

    feelingInput.value = "";

    characterCount.textContent = "0";

}


/* =========================================
   CHARACTER COUNT
   ========================================= */

feelingInput.addEventListener("input", () => {

    characterCount.textContent =
        feelingInput.value.length;

});


/* =========================================
   CRUSH FEELING
   ========================================= */

crushButton.addEventListener("click", () => {

    const feeling =
        feelingInput.value.trim();


    if (!feeling) {

        showToast(
            "You can write even just one little word. 💗"
        );

        feelingInput.focus();

        return;
    }


    /* Save feeling */

    const newFeeling = {

        id: Date.now(),

        date: new Date().toISOString(),

        text: feeling

    };


    feelings.push(newFeeling);


    saveFeelings();


    /* Animate paper */

    const paper = document.querySelector(".paper-modal");

    paper.classList.add("crushing");


    setTimeout(() => {

        modal.classList.add("hidden");

        paper.classList.remove("crushing");

        feelingInput.value = "";

        characterCount.textContent = "0";


        updateJar();


        showToast(
            "It's okay to let it go. 🧋"
        );

    }, 800);

});


/* =========================================
   SAVE
   ========================================= */

function saveFeelings() {

    localStorage.setItem(
        "feelingsJar",
        JSON.stringify(feelings)
    );

}


/* =========================================
   UPDATE JAR
   ========================================= */

function updateJar() {

    const count = feelings.length;


    feelingCount.textContent = count;


    /* Clear existing paper */

    paperContainer.innerHTML = "";


    /* Create visual papers */

    feelings.forEach((feeling, index) => {

        const paper =
            document.createElement("div");

        paper.classList.add(
            "crumpled-paper"
        );


        const positions = [

            { x: 25, y: 245, rotation: -15 },

            { x: 65, y: 230, rotation: 20 },

            { x: 110, y: 250, rotation: -25 },

            { x: 150, y: 235, rotation: 10 },

            { x: 185, y: 250, rotation: -10 },

            { x: 45, y: 205, rotation: 15 },

            { x: 90, y: 195, rotation: -20 },

            { x: 135, y: 205, rotation: 25 },

            { x: 170, y: 190, rotation: -15 },

            { x: 75, y: 170, rotation: 15 },

            { x: 115, y: 165, rotation: -20 },

            { x: 155, y: 175, rotation: 20 },

            { x: 100, y: 140, rotation: -10 },

            { x: 145, y: 135, rotation: 15 },

            { x: 120, y: 105, rotation: -15 }

        ];


        const position =
            positions[index % positions.length];


        paper.style.setProperty(
            "--x",
            `${position.x}px`
        );

        paper.style.setProperty(
            "--y",
            `${position.y}px`
        );

        paper.style.setProperty(
            "--rotation",
            `${position.rotation}deg`
        );


        /* Different paper colors */

        const colors = [

            "#fff0a8",
            "#ffdce7",
            "#e8ddff",
            "#dff4dc",
            "#ffe2c5"

        ];


        paper.style.background =
            colors[index % colors.length];


        paperContainer.appendChild(paper);

    });


    /* Jar fullness */

    if (count >= 15) {

        emptySection.classList.remove(
            "hidden"
        );

    } else {

        emptySection.classList.add(
            "hidden"
        );

    }


    /* Change jar appearance */

    if (count >= 10) {

        document.querySelector(".jar")
            .style.transform =
            "scale(1.02)";

    } else {

        document.querySelector(".jar")
            .style.transform =
            "scale(1)";

    }

}


/* =========================================
   EMPTY JAR
   ========================================= */

emptyButton.addEventListener("click", () => {

    const papers =
        document.querySelectorAll(
            ".crumpled-paper"
        );


    if (papers.length === 0) {

        return;

    }


    /* Throw all papers away */

    papers.forEach((paper, index) => {

        setTimeout(() => {

            paper.style.transition =
                "1s ease";

            paper.style.transform =
                "translate(250px, 500px) rotate(720deg) scale(.2)";

            paper.style.opacity = "0";

        }, index * 80);

    });


    setTimeout(() => {

        feelings = [];

        saveFeelings();

        updateJar();


        emptySection.classList.add(
            "hidden"
        );


        aftercare.classList.remove(
            "hidden"
        );


        showToast(
            "There. A little lighter. 🌷"
        );


        window.scrollTo({

            top: document.body.scrollHeight,

            behavior: "smooth"

        });

    }, 1500);

});


/* =========================================
   AFTERCARE BUTTONS
   ========================================= */

document.querySelectorAll(".after-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                aftercareMessage.textContent =
                    button.dataset.message;

            }
        );

    });


/* =========================================
   TOAST
   ========================================= */

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   RANDOM LITTLE SPARKLES
   ========================================= */

function createSparkle() {

    const sparkle =
        document.createElement("div");

    sparkle.textContent = "✦";

    sparkle.style.position = "fixed";

    sparkle.style.left =
        Math.random() * 100 + "vw";

    sparkle.style.top =
        Math.random() * 100 + "vh";

    sparkle.style.color =
        "#e4b6d0";

    sparkle.style.fontSize =
        Math.random() * 10 + 8 + "px";

    sparkle.style.pointerEvents =
        "none";

    sparkle.style.opacity = "0.5";

    sparkle.style.animation =
        "sparkleFade 3s ease forwards";

    document.body.appendChild(sparkle);


    setTimeout(() => {

        sparkle.remove();

    }, 3000);

}


setInterval(
    createSparkle,
    1800
);
