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

// console.log(window.innerWidth)

// function matchHeight() {
//     let div1 = document.getElementById("gradient");
//     let div2 = document.getElementById("card");

//     if (!div1 || !div2) return; // Ensure both divs exist

//     // Reset height to auto to allow recalculation in case of content changes
//     div1.style.height = "auto";
//     div2.style.height = "auto";

//     // Get the new max height and apply it
//     let maxHeight = Math.max(div1.offsetHeight, div2.offsetHeight);
//     div1.style.height = maxHeight + "px";
//     div2.style.height = maxHeight + "px";
// }

// // Run when the page loads and when the window resizes
// window.addEventListener("load", matchHeight);
// window.addEventListener("resize", matchHeight);

// // If the content inside divs might change dynamically, use a MutationObserver
// const observer = new MutationObserver(matchHeight);
// observer.observe(document.getElementById("div1"), { childList: true, subtree: true });
// observer.observe(document.getElementById("div2"), { childList: true, subtree: true });


// document.querySelectorAll(".experience-card").forEach(card => {
//     card.addEventListener("mousemove", (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left; 
//         const y = e.clientY - rect.top;
        
//         // Adjust border color dynamically
//         card.style.setProperty("--x", `${x}px`);
//         card.style.setProperty("--y", `${y}px`);

//         // Add glow effect dynamically
//         card.style.boxShadow = `0 0 15px rgba(255, 204, 0, 0.8), 
//                                 ${x / rect.width * 40 - 20}px 
//                                 ${y / rect.height * 40 - 20}px 
//                                 30px rgba(255, 204, 0, 0.6)`;
//     });

//     card.addEventListener("mouseleave", () => {
//         card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
//     });
// });


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

    el.addEventListener('mousedown', () => {
        el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
    })

    el.addEventListener('mouseup', () => {
        el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
    })
})
