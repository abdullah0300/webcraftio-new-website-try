/* ========================================
   LANDING PAGE NAVBAR JAVASCRIPT
   Unique classes to prevent conflicts with main site
   ======================================== */

// GSAP Animations for mobile nav
function lpStartAnimation() {
    gsap.from(".lp-from-top-mobile-nav", {
        y: -100,
        duration: .5,
        opacity: 0,
        delay: .5
    });

    gsap.from(".lp-mobile-nav-links", {
        y: -100,
        duration: .4,
        opacity: 0,
        stagger: .2
    });

    gsap.from(".lp-from-btm-mobile-nav", {
        y: 100,
        duration: .5,
        opacity: 0,
        delay: .5
    });
}

// Get navbar elements with unique landing page classes
let lpMenuBtn = document.querySelector(".lp-menu-btn");
let lpNavLinks = document.querySelector(".lp-nav-links");
let lpMobileNav = document.querySelector(".lp-mobile-nav");
let lpCloseBtn = document.querySelector(".lp-close-btn");

// Menu button click handler
if (lpMenuBtn) {
    lpMenuBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (window.innerWidth >= 769) {
            // Desktop: Toggle nav links
            if (lpNavLinks.classList.contains("lp-display-none") && !lpMenuBtn.classList.contains("lp-display-none")) {
                lpNavLinks.classList.remove("lp-display-none");
                lpMenuBtn.classList.add("lp-display-none");
            } else {
                lpNavLinks.classList.add("lp-display-none");
                lpMenuBtn.classList.remove("lp-display-none");
            }
        } else {
            // Mobile: Open mobile nav
            lpMobileNav.classList.remove("lp-display-none");
            lpStartAnimation();
            lpMobileNav.style.transform = "translateY(0%)";
        }
    });
}

// Close button click handler
if (lpCloseBtn) {
    lpCloseBtn.addEventListener("click", function(e) {
        e.preventDefault();
        lpMobileNav.style.transform = "translateY(-100%)";
    });
}

// Close desktop nav when clicking outside
document.addEventListener("click", function(e) {
    // Only run on desktop
    if (window.innerWidth >= 769) {
        // Check if click is outside nav
        if (!lpMenuBtn.contains(e.target) && !lpNavLinks.contains(e.target)) {
            if (lpMenuBtn.classList.contains("lp-display-none")) {
                lpMenuBtn.classList.remove("lp-display-none");
                lpNavLinks.classList.add("lp-display-none");
            }
        }
    }
});

// Timer function for mobile nav bottom
function lpUpdateTime() {
    const lpTimeElement = document.querySelector(".lp-time");
    if (lpTimeElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        lpTimeElement.textContent = `${hours}:${minutes}`;
    }
}

// Update time every second
setInterval(lpUpdateTime, 1000);
lpUpdateTime(); // Initial call
