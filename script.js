// document.addEventListener("DOMContentLoaded", function () {
//     var prevScrollpos = window.pageYOffset;
//     var navbar = document.getElementById("navbar");

//     navbar.style.top = "-50px";

//     window.onscroll = function () {
//         var currentScrollPos = window.pageYOffset;
//         if (prevScrollpos > currentScrollPos) {
//             navbar.style.top = "0";
//         } else {
//             navbar.style.top = "-50px";
//         }
//         prevScrollpos = currentScrollPos;
//     };
// });

let minLoadTime = 250;
let startTime = Date.now();
let progressBar = document.getElementById("progress");
let interval = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let progress = Math.min((elapsedTime / minLoadTime) * 100, 100);
    progressBar.style.width = progress + "%";
}, 100);

// Disable scrolling
document.body.style.overflow = "hidden";

function hideLoader() {
    clearInterval(interval);
    document.getElementById("loader-wrapper").style.opacity = "0";
    setTimeout(function() {
        document.getElementById("loader-wrapper").style.display = "none";
        
        // Re-enable scrolling
        document.body.style.overflow = "";
    }, 500);
}

window.addEventListener("load", function() {
    let elapsedTime = Date.now() - startTime;
    let remainingTime = Math.max(0, minLoadTime - elapsedTime);
    setTimeout(hideLoader, remainingTime);
});

const flag = "picoCTF{r15h4v_p0rtf0l10_w3b51t3}"

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
const paginationArrows = document.querySelector('.pagination-arrows');

let index = 0;
let isAnimating = false;
const totalImages = images.length;

let startX = 0;
let currentX = 0;
let isDragging = false;

// Prevent pagination arrows from interfering with touch events
paginationArrows.addEventListener('touchstart', (e) => e.stopPropagation());
paginationArrows.addEventListener('touchmove', (e) => e.stopPropagation());
paginationArrows.addEventListener('touchend', (e) => e.stopPropagation());

// Create dots
const dots = Array.from({ length: totalImages }, (_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', () => moveTo(i));
    dotsContainer.appendChild(dot);
    return dot;
});

function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    carousel.style.transition = 'transform 0.3s ease-in-out';
    carousel.style.transform = `translateX(-${index * imageWidth}px)`;
    updateDots();
}

function moveTo(i) {
    if (isAnimating) return;
    index = i;
    updateCarousel();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

prev.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
});

next.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index + 1) % totalImages;
    updateCarousel();
});

// Reset `isAnimating` after animation
carousel.addEventListener('transitionend', () => {
    isAnimating = false;
});

// Initialize dots
updateDots();

// Experiences hover effect

// Function to check if the device supports touch (i.e., it's a mobile device)
function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Run only if NOT a touch device
if (!isTouchDevice()) {
    document.getElementById("experiences").onmousemove = e => {
        for (const card of document.getElementsByClassName("experience-card")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    const cards = document.querySelectorAll('.experience-card');

    cards.forEach(el => {
        const height = el.clientHeight;
        const width = el.clientWidth;

        el.addEventListener('mousemove', (e) => {
            const xVal = e.layerX;
            const yVal = e.layerY;
            const yRotation = 3.5 * ((xVal - width / 2) / width);
            const xRotation = -3.5 * ((yVal - height / 2) / height);
            const transformString = `perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            el.style.transform = transformString;
        });

        el.addEventListener('mouseout', () => {
            el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
        });
    });
}

// const startTime = performance.now();
// console.log("User entered the website at: " + new Date().toLocaleString());

// let lastLoggedProgress = 0;
// const observer = new PerformanceObserver((list) => {
//     list.getEntries().forEach((entry) => {
//         if (entry.name === 'first-contentful-paint' || entry.name === 'largest-contentful-paint') {
//             let progress = Math.round((entry.startTime / performance.timing.domComplete) * 100);
//             if (progress >= lastLoggedProgress + 10) {
//                 console.log(`Page load progress: ${progress}%`);
//                 lastLoggedProgress = progress;
//             }
//         }
//     });
// });

// observer.observe({ type: "paint", buffered: true });

// document.addEventListener("DOMContentLoaded", function() {
//     const endTime = performance.now();
//     console.log("Page fully loaded at: " + new Date().toLocaleString());
//     console.log("Page load time: " + (endTime - startTime) + " ms");
// });

window.addEventListener("scroll", function () {
    const myDiv = document.querySelector(".social-box");
    if (window.scrollY > 100
    ) {
        myDiv.style.transform = "scale(1) translateX(0px)"; // scrolled
    } else {
        myDiv.style.transform = "scale(0) translateX(200px)"; // top
    }
});