var prevScrollpos = window.pageYOffSet || document.documentElement.scrollTop;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffSet || document.documentElement.scrollTop;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } 
    else {
        document.getElementById("navbar").style.top = "-50px";
    }
        prevScrollpos = currentScrollPos;
}

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carousel");
    let items = Array.from(track.children);
    let index = 0;

    let itemWidth = items[0].getBoundingClientRect().width;

    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    items = Array.from(track.children);

    track.style.transform = `translateX(-${itemWidth}px)`;

    function updateCarousel() {
        index++;
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;

        if (index >= items.length - 2) {
            setTimeout(() => {
                track.style.transition = "none";
                track.style.transform = `translateX(-${itemWidth}px)`;
                index = 0;
            }, 2000);
        }
    }

    window.addEventListener("resize", () => {
        itemWidth = items[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
    });

    setInterval(updateCarousel, 2500);
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
