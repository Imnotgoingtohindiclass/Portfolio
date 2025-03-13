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

let minLoadTime = 50;
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

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
const paginationArrows = document.querySelector('.pagination-arrows');

let index = 0;
let isAnimating = false;
const totalImages = images.length;
let autoSlideTimeout;

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
    dot.addEventListener('click', () => {
        moveTo(i);
        resetAutoSlide();
    });
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
    resetAutoSlide();
});

next.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index + 1) % totalImages;
    updateCarousel();
    resetAutoSlide();
});

// Reset `isAnimating` after animation
carousel.addEventListener('transitionend', () => {
    isAnimating = false;
});

// Auto slide function
function autoSlide() {
    autoSlideTimeout = setTimeout(() => {
        next.click();
    }, 5000);
}

function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    autoSlide();
}

// Initialize dots and start auto-slide
updateDots();
autoSlide();


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
// 
// const _0x1122fb=_0x9bd8;function _0x9bd8(_0x1c27a2,_0x23de1d){const _0x543b90=_0x543b();return _0x9bd8=function(_0x9bd801,_0x39660e){_0x9bd801=_0x9bd801-0x98;let _0x2a9e8a=_0x543b90[_0x9bd801];return _0x2a9e8a;},_0x9bd8(_0x1c27a2,_0x23de1d);}(function(_0x233d2e,_0x6b8c7b){const _0x2bc12b=_0x9bd8,_0x31bae6=_0x233d2e();while(!![]){try{const _0x59c867=parseInt(_0x2bc12b(0xc4))/0x1+-parseInt(_0x2bc12b(0x9c))/0x2*(parseInt(_0x2bc12b(0xe5))/0x3)+-parseInt(_0x2bc12b(0xc3))/0x4*(-parseInt(_0x2bc12b(0xb2))/0x5)+-parseInt(_0x2bc12b(0xbc))/0x6*(parseInt(_0x2bc12b(0xe7))/0x7)+-parseInt(_0x2bc12b(0xd8))/0x8*(-parseInt(_0x2bc12b(0xcc))/0x9)+-parseInt(_0x2bc12b(0xa6))/0xa+parseInt(_0x2bc12b(0x99))/0xb;if(_0x59c867===_0x6b8c7b)break;else _0x31bae6['push'](_0x31bae6['shift']());}catch(_0x380b88){_0x31bae6['push'](_0x31bae6['shift']());}}}(_0x543b,0x219db));let minLoadTime=0x32,startTime=Date[_0x1122fb(0xa7)](),progressBar=document[_0x1122fb(0x9a)](_0x1122fb(0xa3)),interval=setInterval(()=>{const _0x124af2=_0x1122fb;let _0x5f3f9d=Date[_0x124af2(0xa7)]()-startTime,_0x594051=Math[_0x124af2(0xa4)](_0x5f3f9d/minLoadTime*0x64,0x64);progressBar['style'][_0x124af2(0xaf)]=_0x594051+'%';},0x64);document['body'][_0x1122fb(0xd6)][_0x1122fb(0xd4)]=_0x1122fb(0xcf);function hideLoader(){const _0x44b762=_0x1122fb;clearInterval(interval),document[_0x44b762(0x9a)](_0x44b762(0xe1))[_0x44b762(0xd6)][_0x44b762(0xbf)]='0',setTimeout(function(){const _0x3c0067=_0x44b762;document['getElementById'](_0x3c0067(0xe1))[_0x3c0067(0xd6)][_0x3c0067(0xc5)]=_0x3c0067(0xbe),document[_0x3c0067(0x9b)]['style'][_0x3c0067(0xd4)]='';},0x1f4);}window[_0x1122fb(0x9d)](_0x1122fb(0x9f),function(){const _0x2d8baf=_0x1122fb;let _0x3bce58=Date['now']()-startTime,_0xc47171=Math[_0x2d8baf(0xb5)](0x0,minLoadTime-_0x3bce58);setTimeout(hideLoader,_0xc47171);});const carousel=document[_0x1122fb(0xd9)](_0x1122fb(0xba)),images=document[_0x1122fb(0xa1)](_0x1122fb(0xd3)),prev=document[_0x1122fb(0xd9)](_0x1122fb(0xab)),next=document[_0x1122fb(0xd9)](_0x1122fb(0xdd)),dotsContainer=document[_0x1122fb(0xd9)](_0x1122fb(0xa0)),paginationArrows=document[_0x1122fb(0xd9)](_0x1122fb(0xac));let index=0x0,isAnimating=![];const totalImages=images[_0x1122fb(0xdf)];let autoSlideTimeout,startX=0x0,currentX=0x0,isDragging=![];paginationArrows[_0x1122fb(0x9d)](_0x1122fb(0xdb),_0x3e6dcd=>_0x3e6dcd[_0x1122fb(0xe4)]()),paginationArrows[_0x1122fb(0x9d)](_0x1122fb(0xcd),_0x383e4b=>_0x383e4b[_0x1122fb(0xe4)]()),paginationArrows[_0x1122fb(0x9d)](_0x1122fb(0xa9),_0x5e7a6a=>_0x5e7a6a[_0x1122fb(0xe4)]());const dots=Array[_0x1122fb(0xde)]({'length':totalImages},(_0x6de959,_0x4cc449)=>{const _0x516c6b=_0x1122fb,_0x9a15e3=document[_0x516c6b(0xe2)]('span');return _0x9a15e3['classList']['add'](_0x516c6b(0xc2)),_0x9a15e3[_0x516c6b(0xc9)]['index']=_0x4cc449,_0x9a15e3['addEventListener'](_0x516c6b(0xb3),()=>{moveTo(_0x4cc449),resetAutoSlide();}),dotsContainer[_0x516c6b(0xb6)](_0x9a15e3),_0x9a15e3;});function updateCarousel(){const _0x2b1892=_0x1122fb,_0x4f5222=images[0x0][_0x2b1892(0xe6)];carousel[_0x2b1892(0xd6)][_0x2b1892(0xa2)]=_0x2b1892(0x98),carousel[_0x2b1892(0xd6)][_0x2b1892(0xe8)]=_0x2b1892(0xd0)+index*_0x4f5222+_0x2b1892(0xc8),updateDots();}function moveTo(_0x5509fe){if(isAnimating)return;index=_0x5509fe,updateCarousel();}function updateDots(){const _0x3cb8dd=_0x1122fb;dots['forEach'](_0x1e5d01=>_0x1e5d01[_0x3cb8dd(0xd1)]['remove'](_0x3cb8dd(0xcb))),dots[index]['classList'][_0x3cb8dd(0xd7)]('active');}prev[_0x1122fb(0x9d)](_0x1122fb(0xb3),()=>{if(isAnimating)return;isAnimating=!![],index=(index-0x1+totalImages)%totalImages,updateCarousel(),resetAutoSlide();}),next[_0x1122fb(0x9d)](_0x1122fb(0xb3),()=>{if(isAnimating)return;isAnimating=!![],index=(index+0x1)%totalImages,updateCarousel(),resetAutoSlide();}),carousel[_0x1122fb(0x9d)](_0x1122fb(0xad),()=>{isAnimating=![];});function autoSlide(){autoSlideTimeout=setTimeout(()=>{const _0x29366c=_0x9bd8;next[_0x29366c(0xb3)]();},0x1388);}function resetAutoSlide(){clearTimeout(autoSlideTimeout),autoSlide();}updateDots(),autoSlide();function isTouchDevice(){const _0x4a3ae7=_0x1122fb;return _0x4a3ae7(0xb8)in window||navigator['maxTouchPoints']>0x0;}if(!isTouchDevice()){document[_0x1122fb(0x9a)](_0x1122fb(0xca))[_0x1122fb(0xd5)]=_0x1b0d6a=>{const _0x1ff5a2=_0x1122fb;for(const _0x534669 of document[_0x1ff5a2(0xdc)](_0x1ff5a2(0xb9))){const _0x5cc425=_0x534669['getBoundingClientRect'](),_0x2df844=_0x1b0d6a['clientX']-_0x5cc425[_0x1ff5a2(0xb4)],_0xc51b08=_0x1b0d6a[_0x1ff5a2(0xbd)]-_0x5cc425[_0x1ff5a2(0xd2)];_0x534669[_0x1ff5a2(0xd6)][_0x1ff5a2(0xbb)](_0x1ff5a2(0xe0),_0x2df844+'px'),_0x534669[_0x1ff5a2(0xd6)]['setProperty'](_0x1ff5a2(0xe3),_0xc51b08+'px');}};const cards=document[_0x1122fb(0xa1)](_0x1122fb(0xc1));cards[_0x1122fb(0xa5)](_0x46bdb1=>{const _0x44c5ae=_0x1122fb,_0x4af991=_0x46bdb1[_0x44c5ae(0xb7)],_0x5263a0=_0x46bdb1[_0x44c5ae(0xe6)];_0x46bdb1[_0x44c5ae(0x9d)](_0x44c5ae(0xb0),_0xb3de58=>{const _0x8efe13=_0x44c5ae,_0x2c1f09=_0xb3de58[_0x8efe13(0xda)],_0x1fbce0=_0xb3de58[_0x8efe13(0xc7)],_0x36e986=3.5*((_0x2c1f09-_0x5263a0/0x2)/_0x5263a0),_0x167236=-3.5*((_0x1fbce0-_0x4af991/0x2)/_0x4af991),_0x477e41='perspective(500px)\x20rotateX('+_0x167236+_0x8efe13(0xaa)+_0x36e986+_0x8efe13(0xae);_0x46bdb1['style']['transform']=_0x477e41;}),_0x46bdb1[_0x44c5ae(0x9d)](_0x44c5ae(0xc6),()=>{const _0x5522a0=_0x44c5ae;_0x46bdb1[_0x5522a0(0xd6)][_0x5522a0(0xe8)]=_0x5522a0(0xce);});});}function _0x543b(){const _0x2e2aab=['mousemove','.social-box','13465NsBysE','click','left','max','appendChild','clientHeight','ontouchstart','experience-card','.carousel','setProperty','6IXVZxq','clientY','none','opacity','scale(0)\x20translateX(200px)','.experience-card','dot','76YNRwSx','245891sIrzHv','display','mouseout','layerY','px)','dataset','experiences','active','1308969ONRXhp','touchmove','perspective(500px)\x20scale(1)\x20rotateX(0)\x20rotateY(0)','hidden','translateX(-','classList','top','.carousel-item','overflow','onmousemove','style','add','8sNkiXq','querySelector','layerX','touchstart','getElementsByClassName','.next','from','length','--mouse-x','loader-wrapper','createElement','--mouse-y','stopPropagation','45QWQXre','clientWidth','470043grxmzH','transform','transform\x200.3s\x20ease-in-out','1338722XhuKFv','getElementById','body','28998qStXFS','addEventListener','scale(1)\x20translateX(0px)','load','.dots','querySelectorAll','transition','progress','min','forEach','1418760emypaW','now','scrollY','touchend','deg)\x20rotateY(','.prev','.pagination-arrows','transitionend','deg)','width'];_0x543b=function(){return _0x2e2aab;};return _0x543b();}window[_0x1122fb(0x9d)]('scroll',function(){const _0xe21f45=_0x1122fb,_0x2e5414=document[_0xe21f45(0xd9)](_0xe21f45(0xb1));window[_0xe21f45(0xa8)]>0x64?_0x2e5414[_0xe21f45(0xd6)]['transform']=_0xe21f45(0x9e):_0x2e5414[_0xe21f45(0xd6)][_0xe21f45(0xe8)]=_0xe21f45(0xc0);});