// cursor tracker
cursortracker();
function cursortracker() {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    });
}

//cursor expand
expandCursor();
function expandCursor() {
    window.addEventListener("mousemove", e => {
        var targetElement = e.target;
        if (targetElement.tagName.toLowerCase() === 'a' || targetElement.tagName.toLowerCase() === '' || targetElement.tagName.toLowerCase() === 'span') {
            document.querySelector(".cursor").style.width = `64px`;
            document.querySelector(".cursor").style.height = `64px`;
            document.querySelector(".cursor").style.left = `-30px`;
            document.querySelector(".cursor").style.top = `-27px`;
            document.querySelector(".cursor").style.mixBlendMode = `difference`;
        }
        else if (targetElement.tagName.toLowerCase() === 'section') {
            document.querySelector(".cursor").style.width = `64px`;
            document.querySelector(".cursor").style.height = `64px`;
            document.querySelector(".cursor").style.left = `-30px`;
            document.querySelector(".cursor").style.top = `-27px`;
            document.querySelector(".cursor").style.mixBlendMode = `hard-light`;
            document.querySelector(".cursor").innerHTML = "View";

        }
        else {
            document.querySelector(".cursor").innerHTML = "";
            document.querySelector(".cursor").style.width = `12px`;
            document.querySelector(".cursor").style.height = `12px`;
            document.querySelector(".cursor").style.left = `-5px`;
            document.querySelector(".cursor").style.top = `-5px`;
        }
    });
}

// time
setInterval(setTime, 100);
function setTime() {
    var d = new Date();
    var formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: "2-digit" });
    let time = document.querySelectorAll(".time");
    time.forEach((e) => {
        e.innerHTML = formattedTime + " IST";
    });
}

// page 3 image hover effect
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX - 60,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

// gsap
let tl = gsap.timeline();
let tl2 = gsap.timeline();

tl.from(".from-btm-ele", {
    y: "100%",
    duration: .5,
    stagger: .5,
    opacity: 0,
    delay: 3.3
});

tl2.from(".from-top-ele", {
    y: "-100%",
    duration: .5,
    stagger: .5,
    opacity: 0,
    delay: 3.3
});

gsap.from(".from-top-1-ele", {
    y: "-100%",
    duration: .5,
    opacity: 0,
    delay: 3.3
});


gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

gsap.from(".about", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".about",
        scroller: ".main",
    }
});

gsap.from(".subscribe", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".subscribe",
        scroller: ".main",
    }
});

gsap.from(".creator", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".creator",
        scroller: ".main",
    }
});

gsap.from(".footer", {
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".creator",
        scroller: ".main",
    }
});

gsap.to(".intro", {
    y: "-100%",
    delay: 2.3,
    duration: .2
});
gsap.to(".intro1", {
    y: "-100%",
    delay: 2.3,
    duration: .2
});

function start() {
    gsap.from(".from-top-mobile-nav", {
        y: -100,
        duration: .5,
        opacity: 0,
        delay: .5
    });

    gsap.from(".mobile-nav-links", {
        y: -100,
        duration: .4,
        opacity: 0,
        stagger: .2
    });

    gsap.from(".from-btm-mobile-nav", {
        y: 100,
        duration: .5,
        opacity: 0,
        delay: .5
    });
}


let menuBtn = document.querySelector(".menu-btn");
let navLinks = document.querySelector(".nav-links");
let main = document.querySelector(".main");
let mobileNav = document.querySelector(".mobile-nav");

menuBtn.addEventListener("click", function () {
    if (window.innerWidth >= 769) {
        console.log("hello");
        if ((navLinks.classList.contains("display-none") && (!menuBtn.classList.contains("display-none")))) {
            navLinks.classList.remove("display-none");
            menuBtn.classList.add("display-none");
        }
        else {
            navLinks.classList.add("display-none");
            menuBtn.classList.remove("display-none");
        }
    }
    else {
        mobileNav.classList.remove("display-none");
        start();
        mobileNav.style.transform = "translateY(0%)";
    }
});

document.querySelector(".close-btn").addEventListener("click", () => {
    mobileNav.style.transform = "translateY(-100%)"
});

main.addEventListener("click", () => {
    if (menuBtn.classList.contains("display-none")) {
        menuBtn.classList.remove("display-none");
        navLinks.classList.add("display-none");
    }
});

// loader
time();
function time() {
    var a = 0
    setInterval(function () {
        a += Math.floor(Math.random() * 20)
        if (a < 100) {
            document.querySelector(".timer").innerHTML = a + "%"
        } else {
            a = 100
            document.querySelector(".timer").innerHTML = a + "%"
        }
    }, 200);
}
// Create a number of stars for the stars container
document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.querySelector('.stars');
    const numStars = 100; // Number of stars you want

    // Function to create and animate stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position and animation duration for each star
        const size = Math.random() * 2 + 1 + 'px'; // Random star size between 1px and 3px
        const xPosition = Math.random() * 100 + 'vw'; // Random horizontal position
        const yPosition = Math.random() * 100 + 'vh'; // Random vertical position
        const animationDuration = Math.random() * 20 + 15 + 's'; // Random duration for the star's movement

        star.style.width = size;
        star.style.height = size;
        star.style.left = xPosition;
        star.style.top = yPosition;
        star.style.animationDuration = animationDuration;

        // Append the star to the stars container
        starsContainer.appendChild(star);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.querySelector('.custom-chat-button');
    const chatText = document.querySelector('.chat-text');

    // Function to update the text after interaction
    function updateChatText() {
        // Change to just "Chat"
        chatText.textContent = "Chat";
        chatText.classList.add("changed"); // Apply the fade-out animation
        setTimeout(() => {
            chatText.classList.add("final"); // Apply final visibility and reset position
        }, 500); // Wait for the fade-out to finish
    }

    // Detect when user scrolls or moves the cursor
    function onUserInteraction() {
        if (!chatText.classList.contains("changed")) {
            chatText.classList.add("changed"); // Fade out and change text
            setTimeout(() => {
                chatText.textContent = "Chat"; // Set the text after the fade-out
                chatText.classList.add("final"); // Apply final state for "Chat"
            }, 500); // Wait for the fade-out to finish
        }
    }

    // Listen for mouse movement or scroll
    window.addEventListener('mousemove', onUserInteraction);
    window.addEventListener('scroll', onUserInteraction);
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });

    sections.forEach((section) => {
        observer.observe(section);
    });
});


const steps = document.querySelectorAll('.step');
          
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, observerOptions);

steps.forEach(step => {
  observer.observe(step);
});

/// Show popup only once across all pages
if (!localStorage.getItem('popupShown')) {
    setTimeout(function() {
        document.getElementById('consultPopup').classList.add('is-visible');
        localStorage.setItem('popupShown', 'true'); // Mark popup as shown
    }, 10000); // 10 seconds
}

// Close popup when close button is clicked
document.getElementById('closePopup').addEventListener('click', function() {
    const popup = document.getElementById('consultPopup');
    const panel = document.querySelector('.aa-floating-panel');
    const scheduleButton = document.querySelector('.aa-panel-item[data-tooltip="Schedule Meeting"]');

    // Add animation to "suck" the popup into the panel
    popup.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    const panelRect = panel.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    popup.style.transform = `translate(${panelRect.left - popupRect.left}px, ${panelRect.top - popupRect.top}px) scale(0.1)`;
    popup.style.opacity = '0';

    // Open the panel and animate the schedule button
    setTimeout(() => {
        popup.classList.remove('is-visible');
        panel.classList.add('aa-active');

        // Animate the schedule button
        if (scheduleButton) {
            scheduleButton.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                scheduleButton.style.animation = '';
            }, 1000);
        }
    }, 500); // Wait for the animation to complete before hiding the popup
});

// Optional: Add functionality to the schedule button in the popup
document.getElementById('scheduleButton').addEventListener('click', function() {
    window.location.href = 'https://fire.chilipiper.com/me/abdullah-aslam/consultation';
});

// Close popup when clicking outside the popup (on the overlay)
document.getElementById('consultPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('is-visible');
    }
});

// Panel functionality
document.addEventListener('DOMContentLoaded', function() {
    const panel = document.querySelector('.aa-floating-panel');
    const toggleBtn = document.querySelector('.aa-panel-toggle');
    
    // Toggle panel open/close
    toggleBtn.addEventListener('click', function() {
        panel.classList.toggle('aa-active');
        
        // Haptic-like animation on button click
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!panel.contains(event.target) && panel.classList.contains('aa-active')) {
            panel.classList.remove('aa-active');
        }
    });

    // Add hover effect for panel items
    const panelItems = document.querySelectorAll('.aa-panel-item');
    panelItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        item.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('aa-ripple');
            this.appendChild(ripple);
            
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Optional: Auto-close after certain period of inactivity
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        if (panel.classList.contains('aa-active')) {
            inactivityTimer = setTimeout(() => {
                panel.classList.remove('aa-active');
            }, 10000); // Close after 10 seconds of inactivity
        }
    }
    
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    
    // Make panel draggable
    let isDragging = false;
    let dragOffsetY = 0;
    
    toggleBtn.addEventListener('mousedown', function(e) {
        // Don't start drag on regular click (use long press or right-click)
        if (e.button === 2 || e.ctrlKey) {
            e.preventDefault();
            isDragging = true;
            dragOffsetY = e.clientY - panel.getBoundingClientRect().top;
            
            // Change cursor to indicate dragging
            document.body.style.cursor = 'grabbing';
            panel.style.transition = 'none';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const y = e.clientY - dragOffsetY;
            
            // Keep within viewport bounds
            const maxY = window.innerHeight - panel.offsetHeight;
            const boundedY = Math.max(0, Math.min(maxY, y));
            
            panel.style.top = boundedY + 'px';
            panel.style.transform = 'translateY(0)';
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = '';
            panel.style.transition = '';
        }
    });
    
    // Prevent context menu on toggle button for right-click drag
    toggleBtn.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});