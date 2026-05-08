// Loader

window.addEventListener("load",()=>{

    setTimeout(()=>{

        document.getElementById("loader")
        .style.display="none";

    },1500);

});

// Typing Effect

const typingText =
document.querySelector(".typing-text");

const words = [

    "Aspiring AI Engineer",
    "Machine Learning Developer",
    "NLP Enthusiast",
    "Cloud Learner",
    "Frontend Designer"

];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord =
    words[wordIndex];

    if(!isDeleting){

        typingText.textContent =
        currentWord.substring(0,charIndex++);

    }else{

        typingText.textContent =
        currentWord.substring(0,charIndex--);

    }

    let speed =
    isDeleting ? 50 : 100;

    if(charIndex ===
       currentWord.length + 1){

        isDeleting = true;
        speed = 1200;

    }

    if(charIndex === 0){

        isDeleting = false;

        wordIndex =
        (wordIndex + 1)
        % words.length;

    }

    setTimeout(typeEffect,speed);

}

typeEffect();

// Theme Toggle

const toggleBtn =
document.getElementById("theme-toggle");

// Theme Toggle Logic Updated
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    
    // Update theme toggle icon
    const icon = toggleBtn.querySelector("i");
    icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

// Load Theme

if(localStorage.getItem("theme")
=== "light"){

    document.body.classList.add(
    "light-theme");

}

// Scroll Reveal

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

    reveals.forEach((element)=>{

        const windowHeight =
        window.innerHeight;

        const revealTop =
        element.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){

            element.classList.add("active");

        }

    });

});

// Scroll Progress

window.addEventListener("scroll",()=>{

    const scrollTop =
    document.documentElement.scrollTop;

    const scrollHeight =
    document.documentElement.scrollHeight
    -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop / scrollHeight) * 100;

    document.getElementById(
    "progress-bar").style.width =
    progress + "%";

});

// Cursor Glow & Mouse Interactions
const cards = document.querySelectorAll(".skill-card, .project-card, .stat-card, .quote-card");

document.addEventListener("mousemove", (e) => {
    // 3D Tilt Effect
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
        }
    });
});

// ML Data Stream Effect
const dataStream = document.getElementById("data-stream");
const cols = Math.floor(window.innerWidth / 50);

for(let i=0; i<cols; i++) {
    const col = document.createElement("div");
    col.className = "data-column";
    col.style.left = (i * 50) + "px";
    col.style.animationDelay = (Math.random() * 10) + "s";
    col.style.animationDuration = (5 + Math.random() * 10) + "s";
    
    let binary = "";
    for(let j=0; j<50; j++) {
        binary += Math.round(Math.random()) + "<br>";
    }
    col.innerHTML = binary;
    dataStream.appendChild(col);
}

// Neural Dots Background
const canvasContainer = document.getElementById("neural-canvas");
const dotsCount = 100; // Increased count
const dots = [];
const googleColors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];

for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    const color = googleColors[Math.floor(Math.random() * googleColors.length)];
    dot.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        opacity: ${0.6 + Math.random() * 0.4};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 8px ${color};
    `;
    
    const speedX = (Math.random() - 0.5) * 0.8;
    const speedY = (Math.random() - 0.5) * 0.8;
    
    dots.push({ element: dot, x: Math.random() * 100, y: Math.random() * 100, vx: speedX, vy: speedY });
    canvasContainer.appendChild(dot);
}

function animateDots() {
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        if (dot.x < 0 || dot.x > 100) dot.vx *= -1;
        if (dot.y < 0 || dot.y > 100) dot.vy *= -1;
        
        dot.element.style.left = dot.x + "%";
        dot.element.style.top = dot.y + "%";
    });
    requestAnimationFrame(animateDots);
}
animateDots();

// Resume Preview Modal Logic
const resumeModal = document.getElementById("resume-modal");
const viewResumeBtn = document.getElementById("view-resume-btn");
const closeModal = document.getElementById("close-modal");
const printResume = document.getElementById("print-resume");
const resumeIframe = document.getElementById("resume-iframe");

if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
        resumeModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "auto";
    });
}

// Close on outside click
resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

if (printResume) {
    printResume.addEventListener("click", () => {
        resumeIframe.contentWindow.focus();
        resumeIframe.contentWindow.print();
    });
}