
let currentPage = 1;
const totalPages = 6;

const pages = document.querySelectorAll(".page");
const pageCounter = document.getElementById("pageCounter");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const loveArea = document.querySelector(".love-area");

let noPositioned = false;
let chaseCount = 0;
let lastChaseTime = 0;

const chaseMessages = [
    "Are you sure? 🥺",
    "Really? You don't love me?",
    "Please think again! 💗",
    "That was not the right answer!",
    "My heart is breaking! 💔",
    "Ek baar aur soch lo! 🥹",
    "Itna bhi kya attitude?",
    "Please don't do this!",
    "No button bhi kitna bhagega! 😂",
    "Mujhe pata hai tum Yes hi karna chahte ho!",
    "Stop running away from love! ❤️",
    "Arey yaar, seriously?",
    "Dil todna achhi baat nahi hai!",
    "You are making this difficult!",
    "Bas Yes daba do na! 🥺",
    "Ab toh maan jao!",
    "No bolne ka option hi nahi hai! 😜",
    "Pleaseeeee! 💕",
    "Kya milega No dabakar?",
    "Itna bhaagna zaroori hai kya?",
    "AB BAS BHI KARO! YES DABA DO NA! ❤️",
    "Meri feelings samjho!",
    "One last chance!",
    "Tum toh bade dangerous ho!",
    "Bas karo yaar, meri battery khatam ho jayegi! 😂",
    "I am still waiting for your Yes!",
    "Aise kaun karta hai yaar!",
    "Thoda toh reham karo!",
    "You cannot escape forever! 😎",
    "Last warning... Press YES! 💖"
];

const specialMessages = {
    5: "Wait... seriously? 🥺",
    10: "Mujhe pata hai tum Yes hi karna chahte ho!",
    15: "Ab toh maan jao! ❤️",
    20: "AB BAS BHI KARO! YES DABA DO NA! ❤️",
    25: "Arey ab bas bhi karo! 😂",
    30: "Bas karo yaar! YES kar do! 💗"
};


// PAGE NAVIGATION
function nextPage() {
    if (currentPage >= totalPages) return;

    pages[currentPage - 1].classList.remove("active");

    currentPage++;

    pages[currentPage - 1].classList.add("active");

    if (pageCounter) {
        pageCounter.textContent =
            `0${currentPage} / 0${totalPages}`;
    }

    if (currentPage === 6) {
        placeNoButton();
    }
}


// MOVE NO BUTTON
function placeNoButton() {
    if (!noBtn) return;

    const maxX = window.innerWidth - noBtn.offsetWidth - 10;
    const maxY = window.innerHeight - noBtn.offsetHeight - 10;

    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = "9999";

    noPositioned = true;
}


// SHOW MESSAGES
function showChaseMessage() {
    const now = Date.now();

    if (now - lastChaseTime < 450) return;

    lastChaseTime = now;
    chaseCount++;

    const messageElement = document.getElementById("finalMessage");

    if (!messageElement) return;

    let message;

    if (specialMessages[chaseCount]) {
        message = specialMessages[chaseCount];
    } else {
        message = chaseMessages[
            (chaseCount - 1) % chaseMessages.length
        ];
    }

    messageElement.textContent = message;

    messageElement.style.animation = "none";
    void messageElement.offsetWidth;
    messageElement.style.animation = "fadeUp 0.35s ease";
}


// CURSOR APPROACHES NO BUTTON
window.addEventListener("pointermove", (event) => {
    if (currentPage !== 6 || !noBtn || !noPositioned) return;
    if (noBtn.style.display === "none") return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        event.clientX - centerX,
        event.clientY - centerY
    );

    if (distance < 120) {
        showChaseMessage();
        placeNoButton();
    }
});


// NO BUTTON CLICK / TOUCH
if (noBtn) {
    noBtn.addEventListener("pointerdown", (event) => {
        event.preventDefault();

        if (currentPage === 6) {
            showChaseMessage();
            placeNoButton();
        }
    });

    noBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
}


// YES BUTTON
if (yesBtn) {
    yesBtn.addEventListener("click", () => {

        // NO BUTTON DISAPPEARS
        if (noBtn) {
            noBtn.style.display = "none";
        }

        const messageElement = document.getElementById("finalMessage");

        if (messageElement) {
            messageElement.innerHTML =
                "I knew ittt! ❤️ Sending you the biggest hug ever! 🤗";
        }

        createHearts(40);
    });
}


// CAKE INTERACTION
const cake = document.getElementById("cake");
const cakeText = document.getElementById("cakeText");

if (cake) {
    cake.addEventListener("click", () => {
        cake.classList.add("blown");

        if (cakeText) {
            cakeText.textContent = "Make a wish! ✨";
        }

        createHearts(15);
    });
}


// CREATE HEARTS
function createHeart() {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = "💗";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration =
        (2 + Math.random() * 3) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}


// CREATE MULTIPLE HEARTS
function createHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}


// BACKGROUND STARS
const particles = document.getElementById("particles");

if (particles) {
    for (let i = 0; i < 90; i++) {
        const star = document.createElement("div");

        star.classList.add("star");

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        particles.appendChild(star);
    }
}


// WINDOW RESIZE
window.addEventListener("resize", () => {
    if (currentPage === 6 && noBtn &&
        noBtn.style.display !== "none") {
        placeNoButton();
    }
});



// =================================
// SURPRISE FEATURE
// =================================

const surpriseHeart = document.getElementById("surpriseHeart");
const surprisePopup = document.getElementById("surprisePopup");
const openSurprise = document.getElementById("openSurprise");
const loveLetter = document.getElementById("loveLetter");
const closeSurprise = document.getElementById("closeSurprise");

// YES CLICK KE BAAD SURPRISE POPUP
if (yesBtn) {
    yesBtn.addEventListener("click", () => {

        setTimeout(() => {
            surprisePopup.style.display = "flex";
        }, 1000);

    });
}

// POPUP SE HEART SHOW KARNA
if (openSurprise) {
    openSurprise.addEventListener("click", () => {

        surprisePopup.style.display = "none";

        surpriseHeart.style.display = "block";

        createHearts(25);
    });
}

// HEART CLICK KARNE PAR LOVE LETTER
if (surpriseHeart) {
    surpriseHeart.addEventListener("click", () => {

        loveLetter.style.display = "flex";

        createHearts(15);
    });
}

// LOVE LETTER CLOSE
if (closeSurprise) {
    closeSurprise.addEventListener("click", () => {

        loveLetter.style.display = "none";

    });
}



// =====================================
// SUPABASE CONNECTION
// =====================================

const SUPABASE_URL = "https://nmvhgmctbmnmxmmawdim.supabase.co";

// Apni Supabase Publishable Key yahan paste karna
const SUPABASE_KEY = "PASTE_YOUR_PUBsb_publishable_MyteTYCMceEGQZfLfaiB4g_AHq1LmZI";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected successfully!");





/* =====================================
   SELFIE CAMERA & SUPABASE UPLOAD
===================================== */

const captureSelfieBtn = document.getElementById("captureSelfie");

if (captureSelfieBtn) {
    captureSelfieBtn.addEventListener("click", async () => {

        const overlay = document.createElement("div");

        overlay.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.85);
            z-index:20000;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:15px;
        `;

        overlay.innerHTML = `
            <div style="
                background:#fff8f1;
                padding:22px;
                border-radius:20px;
                width:100%;
                max-width:400px;
                text-align:center;
            ">
                <h2>One Last Surprise! 💗</h2>

                <p style="font-size:14px;color:#74505c;">
                    Your selfie will be uploaded and stored privately
                    for the website owner.
                </p>

                <video id="selfieVideo"
                    autoplay playsinline
                    style="width:100%;border-radius:15px;">
                </video>

                <canvas id="selfieCanvas" hidden></canvas>

                <p id="selfieStatus"></p>

                <button id="takeSelfie">📸 Take Selfie</button>
                <button id="retakeSelfie" style="display:none;">
                    Retake
                </button>
                <button id="submitSelfie" style="display:none;">
                    Submit My Selfie ❤️
                </button>
                <button id="cancelSelfie">Cancel</button>
            </div>
        `;

        document.body.appendChild(overlay);

        const video = overlay.querySelector("#selfieVideo");
        const canvas = overlay.querySelector("#selfieCanvas");
        const status = overlay.querySelector("#selfieStatus");

        const takeBtn = overlay.querySelector("#takeSelfie");
        const retakeBtn = overlay.querySelector("#retakeSelfie");
        const submitBtn = overlay.querySelector("#submitSelfie");
        const cancelBtn = overlay.querySelector("#cancelSelfie");

        let cameraStream = null;
        let selfieBlob = null;

        function stopCamera() {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null;
            }
        }

        function closeCamera() {
            stopCamera();
            overlay.remove();
        }

        cancelBtn.onclick = closeCamera;

        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            });

            video.srcObject = cameraStream;

        } catch (error) {
            status.textContent =
                "Camera permission denied or camera unavailable.";
            takeBtn.disabled = true;
            return;
        }

        takeBtn.onclick = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(video, 0, 0);

            canvas.toBlob(blob => {
                selfieBlob = blob;

                video.style.display = "none";
                canvas.hidden = false;

                takeBtn.style.display = "none";
                retakeBtn.style.display = "inline-block";
                submitBtn.style.display = "inline-block";

                status.textContent = "Looking lovely! 💗";
            }, "image/jpeg", 0.9);
        };

        retakeBtn.onclick = () => {
            selfieBlob = null;
            canvas.hidden = true;
            video.style.display = "block";

            takeBtn.style.display = "inline-block";
            retakeBtn.style.display = "none";
            submitBtn.style.display = "none";

            status.textContent = "";
        };

        submitBtn.onclick = async () => {
            if (!selfieBlob) return;

            submitBtn.disabled = true;
            status.textContent = "Uploading your selfie... 💗";

            const fileName =
                `selfie-${Date.now()}.jpg`;

            const { data, error } = await supabaseClient
                .storage
                .from("selfie-uploads")
                .upload(fileName, selfieBlob, {
                    contentType: "image/jpeg",
                    upsert: false
                });

            if (error) {
                status.textContent =
                    "Upload failed. Please try again.";
                submitBtn.disabled = false;
                console.error(error);
                return;
            }

            stopCamera();

            video.style.display = "none";
            canvas.hidden = true;
            takeBtn.style.display = "none";
            retakeBtn.style.display = "none";
            submitBtn.style.display = "none";
            cancelBtn.textContent = "Done";

            status.textContent =
                "Your selfie has been sent successfully! Thank you! ❤️";

            console.log("Selfie uploaded:", data.path);
        };
    });
}
