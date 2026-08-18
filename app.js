window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            typeWriter();
        }, 500); 
    }, 800);

    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a:not(.btn-primary)');
    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }

    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 80; 

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
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

// Extracted from Schramm AdLabs Brochure
const text = "NO JARGONS, NO BIG PRESENTATIONS. WE KEEP IT SIMPLE. YOUR MARKETING PARTNER TRULY SPEAKING YOUR LANGUAGE.";
let charIndex = 0;
const speed = 40; 
const typeTarget = document.getElementById("typewriter-text");

function typeWriter() {
    if (typeTarget && charIndex < text.length) {
        typeTarget.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    }
}
