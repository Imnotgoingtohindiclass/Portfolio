document.addEventListener("DOMContentLoaded", function () {
    var prevScrollpos = window.pageYOffset;
    var navbar = document.getElementById("navbar");

    navbar.style.top = "-50px";

    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
    };
});

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
let index = 0;
let isAnimating = false;
let totalImages = images.length;

images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', () => moveTo(i));
    dotsContainer.appendChild(dot);
});

function updateCarousel() {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${index * 40}vw)`;
    updateDots();
}

function moveTo(i) {
    index = i;
    updateCarousel();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelector(`.dot[data-index='${index}']`).classList.add('active');
}

prev.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
    setTimeout(() => { isAnimating = false; }, 500);
});

next.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index + 1) % totalImages;
    updateCarousel();
    setTimeout(() => { isAnimating = false; }, 500);
});

updateDots();

document.getElementById("experiences").onmousemove = e => {
    for(const card of document.getElementsByClassName("experience-card")) {
    const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    };
}

const cards = document.querySelectorAll('.experience-card')

cards.forEach(el => {
    const height = el.clientHeight
    const width = el.clientWidth

    el.addEventListener('mousemove', (e) => {
        const xVal = e.layerX
        const yVal = e.layerY
        const yRotation = 3.5 * ((xVal - width / 2) / width)
        const xRotation = -3.5 * ((yVal - height / 2) / height)
        const transformString = `perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
        el.style.transform = transformString
    })

    el.addEventListener('mouseout', () => {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })
})

document.getElementById("experiences").onmousemove = e => {
    for(const card of document.getElementsByClassName("experience-card")) {
    const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    };
}

const startTime = performance.now();
console.log("User entered the website at: " + new Date().toLocaleString());

let lastLoggedProgress = 0;
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint' || entry.name === 'largest-contentful-paint') {
            let progress = Math.round((entry.startTime / performance.timing.domComplete) * 100);
            if (progress >= lastLoggedProgress + 10) {
                console.log(`Page load progress: ${progress}%`);
                lastLoggedProgress = progress;
            }
        }
    });
});

observer.observe({ type: "paint", buffered: true });

document.addEventListener("DOMContentLoaded", function() {
    const endTime = performance.now();
    console.log("Page fully loaded at: " + new Date().toLocaleString());
    console.log("Page load time: " + (endTime - startTime) + " ms");
});

window.addEventListener("scroll", function () {
    const myDiv = document.querySelector(".social-box");
    if (window.scrollY > 10) {
        myDiv.style.transform = "scale(1) translateX(0px)"; // scrolled
    } else {
        myDiv.style.transform = "scale(0) translateX(200px)"; // top
    }
});