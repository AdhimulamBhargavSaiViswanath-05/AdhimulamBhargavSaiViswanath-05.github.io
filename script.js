// Loader

window.addEventListener("load",()=>{

    setTimeout(()=>{

        document.getElementById("loader")
        .style.display="none";

    },1500);

});

// Typing Effect

const typingText = document.querySelector(".typing-text");

if (typingText) {
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
        const currentWord = words[wordIndex];

        if(!isDeleting){
            typingText.textContent = currentWord.substring(0,charIndex++);
        }else{
            typingText.textContent = currentWord.substring(0,charIndex--);
        }

        let speed = isDeleting ? 50 : 100;

        if(charIndex === currentWord.length + 1){
            isDeleting = true;
            speed = 1200;
        }

        if(charIndex === 0){
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect,speed);
    }

    typeEffect();
}

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

// Mobile Nav Toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = navToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = navToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });
}

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

// Scroll Progress & Active Link Update
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

    // Active Link Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll(".nav-links a");

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinksList.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Horizontal Grid Scroll
function scrollGrid(gridId, amount) {
    const grid = document.getElementById(gridId);
    grid.scrollBy({ left: amount, behavior: 'smooth' });
}

// Cursor Glow & Mouse Interactions
const cards = document.querySelectorAll(".skill-card, .project-card, .stat-card, .quote-card");

if (window.innerWidth > 1024) { // Only run 3D tilt on desktop
    document.addEventListener("mousemove", (e) => {
        // 3D Tilt Effect
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20; // Reduced intensity
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
            }
        });
    });
}

// ML Data Stream Effect
const dataStream = document.getElementById("data-stream");
if (dataStream && window.innerWidth > 1024) { // Only run on desktop
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
}

// Neural Dots Background with Connections
const canvasContainer = document.getElementById("neural-canvas");
const dotsCount = window.innerWidth < 768 ? 40 : 80; // Optimize for mobile
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
        z-index: 1;
    `;
    
    const speedX = (Math.random() - 0.5) * 0.5;
    const speedY = (Math.random() - 0.5) * 0.5;
    
    dots.push({ 
        element: dot, 
        x: Math.random() * window.innerWidth, 
        y: Math.random() * window.innerHeight, 
        vx: speedX, 
        vy: speedY,
        color: color
    });
    canvasContainer.appendChild(dot);
}

// Create Lines Container
const linesContainer = document.createElement("div");
linesContainer.className = "lines-container";
canvasContainer.appendChild(linesContainer);

function animateDots() {
    linesContainer.innerHTML = ""; // Clear lines for this frame
    
    dots.forEach((dot, index) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        if (dot.x < 0 || dot.x > window.innerWidth) dot.vx *= -1;
        if (dot.y < 0 || dot.y > window.innerHeight) dot.vy *= -1;
        
        dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;

        // Draw connections
        for (let j = index + 1; j < dots.length; j++) {
            const nextDot = dots[j];
            const dx = dot.x - nextDot.x;
            const dy = dot.y - nextDot.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 180) { // Increased distance range
                const line = document.createElement("div");
                line.className = "neural-line";
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                line.style.width = dist + "px";
                line.style.left = nextDot.x + "px";
                line.style.top = nextDot.y + "px";
                line.style.transform = `rotate(${angle}deg)`;
                line.style.setProperty('--line-color', dot.color);
                line.style.opacity = (1 - dist/180) * 0.6; // Increased multiplier
                linesContainer.appendChild(line);
            }
        }
    });
    requestAnimationFrame(animateDots);
}
// Use simple dots for mobile, connections for desktop to save performance
if (window.innerWidth > 768) {
    animateDots();
} else {
    // Simple animation for mobile
    function animateMobile() {
        dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;
            if (dot.x < 0 || dot.x > window.innerWidth) dot.vx *= -1;
            if (dot.y < 0 || dot.y > window.innerHeight) dot.vy *= -1;
            dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        });
        requestAnimationFrame(animateMobile);
    }
    animateMobile();
}

// Optimization: Remove scroll reveal delays for mobile load speed
if (window.innerWidth < 768) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
}

// Project Graph Constellation
const graphContainer = document.getElementById('project-graph-container');
const graphCanvas = document.getElementById('graph-canvas');
const ctx = graphCanvas.getContext('2d');

const projects = [
    { name: "LipiSathi", tags: ["OCR", "DL"] },
    { name: "Timetable AI", tags: ["CSP", "Optimization"] },
    { name: "Stemming Engine", tags: ["NLP", "Regex"] },
    { name: "Bus Prediction", tags: ["ML", "Regression"] },
    { name: "Amazon Scraping", tags: ["EDA", "Scraping"] }
];

let nodes = [];
const nodeElements = [];

function initGraph() {
    graphCanvas.width = graphContainer.offsetWidth;
    graphCanvas.height = graphContainer.offsetHeight;
    
    projects.forEach((p, i) => {
        const node = document.createElement('div');
        node.className = 'graph-node';
        node.innerText = p.name;
        node.style.left = (Math.random() * (graphCanvas.width - 150) + 50) + 'px';
        node.style.top = (Math.random() * (graphCanvas.height - 50) + 25) + 'px';
        
        graphContainer.appendChild(node);
        nodeElements.push(node);
        
        nodes.push({
            el: node,
            x: parseFloat(node.style.left),
            y: parseFloat(node.style.top),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            width: node.offsetWidth,
            height: node.offsetHeight
        });
    });
}

function updateGraph() {
    ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') + '44';
    ctx.lineWidth = 1;

    nodes.forEach((node, i) => {
        // Update physics
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x + node.width >= graphCanvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y + node.height >= graphCanvas.height) node.vy *= -1;

        node.el.style.transform = `translate(${node.vx}px, ${node.vy}px)`;
        node.el.style.left = node.x + 'px';
        node.el.style.top = node.y + 'px';

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
            ctx.moveTo(node.x + node.width/2, node.y + node.height/2);
            ctx.lineTo(nodes[j].x + nodes[j].width/2, nodes[j].y + nodes[j].height/2);
        }
    });
    ctx.stroke();
    requestAnimationFrame(updateGraph);
}

if (graphContainer) {
    initGraph();
    updateGraph();
}

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