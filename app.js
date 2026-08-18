window.addEventListener('load', function() {
    // 1. Handle Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            typeWriter();
        }, 500); 
    }, 800);

    // 2. Active Link
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }

    // 3. Scroll Reveal Observer
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 80;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 
});

// 4. Typewriter Subtitle
let charIndex = 0;
const speed = 30; 

function typeWriter() {
    const typeTarget = document.getElementById("typewriter-text");
    if (typeTarget) {
        const textToType = typeTarget.getAttribute("data-type");
        if (charIndex < textToType.length) {
            typeTarget.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        }
    }
}
