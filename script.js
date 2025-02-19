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

console.log(window.innerWidth)

function matchHeight() {
    let div1 = document.getElementById("gradient");
    let div2 = document.getElementById("card");

    if (!div1 || !div2) return; // Ensure both divs exist

    // Reset height to auto to allow recalculation in case of content changes
    div1.style.height = "auto";
    div2.style.height = "auto";

    // Get the new max height and apply it
    let maxHeight = Math.max(div1.offsetHeight, div2.offsetHeight);
    div1.style.height = maxHeight + "px";
    div2.style.height = maxHeight + "px";
}

// Run when the page loads and when the window resizes
window.addEventListener("load", matchHeight);
window.addEventListener("resize", matchHeight);

// If the content inside divs might change dynamically, use a MutationObserver
const observer = new MutationObserver(matchHeight);
observer.observe(document.getElementById("div1"), { childList: true, subtree: true });
observer.observe(document.getElementById("div2"), { childList: true, subtree: true });
