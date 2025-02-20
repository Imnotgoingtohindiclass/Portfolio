document.addEventListener("DOMContentLoaded", function () {
    let prevScrollpos = window.pageYOffset;
    const navbar = document.getElementById("navbar");
    let scrollTimeout;

    navbar.style.top = "-50px";

    window.addEventListener("scroll", () => {
        if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
        scrollTimeout = requestAnimationFrame(() => {
            let currentScrollPos = window.pageYOffset;
            navbar.style.top = prevScrollpos > currentScrollPos ? "0" : "-50px";
            prevScrollpos = currentScrollPos;
        });
    });

    // Preload Images
    const images = document.querySelectorAll('.carousel img');
    images.forEach(img => {
        const preloadedImg = new Image();
        preloadedImg.src = img.src;
    });

    const carousel = document.querySelector('.carousel');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let index = 0;
    let totalImages = images.length;

    function updateCarousel() {
        requestAnimationFrame(() => {
            carousel.style.transition = 'transform 0.3s ease-out';
            carousel.style.transform = `translateX(-${index * 600}px)`;
            updateDots();
        });
    }

    prev.addEventListener('click', () => {
        index = (index - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    next.addEventListener('click', () => {
        index = (index + 1) % totalImages;
        updateCarousel();
    });

    // updateDots();

    // Optimized Hover Effect for Experience Cards
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(el => {
        const height = el.clientHeight;
        const width = el.clientWidth;

        el.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const xRotation = -3 * ((e.layerY - height / 2) / height);
                const yRotation = 3 * ((e.layerX - width / 2) / width);
                el.style.transform = `perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            });
        });

        el.addEventListener('mouseout', () => {
            requestAnimationFrame(() => {
                el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
            });
        });
    });
});


document.getElementById("experiences").onmousemove = e => {
    for(const card of document.getElementsByClassName("experience-card")) {
    const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    };
}