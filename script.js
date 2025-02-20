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

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let interval;

    function updateCarousel() {
        document.querySelector('.carousel-item.active')?.classList.remove('active');
        items[currentIndex].classList.add('active');
    }

    function autoScroll() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function startAutoScroll() {
        stopAutoScroll();
        interval = setInterval(autoScroll, 3000);
    }

    function stopAutoScroll() {
        if (interval) {
            clearInterval(interval);
        }
    }

    updateCarousel();
    startAutoScroll();
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
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

const cards = document.querySelectorAll('.experience-card')

cards.forEach(el => {
    const height = el.clientHeight
    const width = el.clientWidth

    el.addEventListener('mousemove', (e) => {
        const xVal = e.layerX
        const yVal = e.layerY
        const yRotation = 3 * ((xVal - width / 2) / width)
        const xRotation = -3 * ((yVal - height / 2) / height)
        const transformString = `perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
        el.style.transform = transformString
    })

    el.addEventListener('mouseout', () => {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })
})
