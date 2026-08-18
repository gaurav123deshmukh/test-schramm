window.addEventListener('load', function() {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            // Start Typewriter only after preloader finishes
            typeWriter();
        }, 500); 
    }, 800);

    // 2. Active Link Highlighting
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a:not(.btn-primary)');
    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 80; // when to trigger

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // trigger once on load

    // 4. Mobile Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and X
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// 5. Typewriter Effect for Hero Subtitle
const text = "Schramm Ad Labs is a premium digital marketing agency offering coherent and bespoke marketing services for brands ready to scale.";
let charIndex = 0;
const speed = 30; // typing speed in milliseconds
const typeTarget = document.getElementById("typewriter-text");

function typeWriter() {
    if (typeTarget && charIndex < text.length) {
        typeTarget.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    }
}
