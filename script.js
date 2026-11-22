
let currentPage = 1;
const totalPages = 6;

const pages = document.querySelectorAll(".page");
const pageCounter = document.querySelector("#pageCounter");

const noBtn = document.querySelector("#noBtn");
const yesBtn = document.querySelector("#yesBtn");
const loveArea = document.querySelector(".love-area");

let noPositioned = false;

// PAGE NAVIGATION
function nextPage() {
    if (currentPage >= totalPages) return;

    pages[currentPage - 1].classList.remove("active");
    currentPage++;

    pages[currentPage - 1].classList.add("active");

    pageCounter.textContent =
        String(currentPage).padStart(2, "0") +
        " / " +
        String(totalPages).padStart(2, "0");

    if (currentPage === 6) {
        placeNoButton();
    }
}

// CAKE INTERACTION
const cake = document.querySelector("#cake");
const cakeText = document.querySelector("#cakeText");

cake.addEventListener("click", () => {
    cake.classList.add("blown");

    cakeText.textContent =
        "Wish made? May it come true ❤️";

    createHearts(15);
});

// POSITION NO BUTTON ANYWHERE IN VIEWPORT
function placeNoButton() {
    const padding = 20;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = padding + Math.random() * Math.max(0, maxX - padding);
    const randomY = padding + Math.random() * Math.max(0, maxY - padding);

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    noPositioned = true;
}

// ESCAPE FROM CURSOR
window.addEventListener("pointermove", (e) => {
    if (currentPage !== 6) return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
    );

    if (distance < 120) {
        placeNoButton();
    }
});

// ESCAPE FROM TOUCH
noBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    placeNoButton();
});

// EVEN IF IT GETS CLICKED
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    placeNoButton();
});

// YES BUTTON
yesBtn.addEventListener("click", () => {
    document.querySelector("#finalMessage").innerHTML =
        "I knew ittt! 🥹❤️<br>" +
        "Sending you the biggest hug ever! 💗";

    createHearts(40);
});

// HEART ANIMATION
function createHeart() {
    const heart = document.createElement("div");

    heart.className = "heart";

    const heartList = ["❤️", "💗", "💕", "💖", "💘", "💝"];
    heart.textContent =
        heartList[Math.floor(Math.random() * heartList.length)];

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (20 + Math.random() * 25) + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// BACKGROUND STARS
const particles = document.querySelector("#particles");

for (let i = 0; i < 90; i++) {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";

    particles.appendChild(star);
}

// IF WINDOW RESIZES WHILE ON PAGE 6
window.addEventListener("resize", () => {
    if (currentPage === 6 && noPositioned) {
        placeNoButton();
    }
});
