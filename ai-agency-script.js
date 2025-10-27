/* ========================================
   AI AGENCY LANDING PAGE JAVASCRIPT
   Handles animations, form submission, and scroll effects
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. SCROLL ANIMATIONS =====
    initScrollAnimations();

    // ===== 2. SMOOTH SCROLL FOR CTA BUTTONS =====
    initSmoothScroll();

    // ===== 3. CAPTURE UTM PARAMETERS =====
    captureUTMParameters();

    // ===== 4. FORM SUBMISSION =====
    initFormSubmission();

    // ===== 5. FORM VALIDATION =====
    initFormValidation();

});


/* ========================================
   SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
   ======================================== */
function initScrollAnimations() {

    // Create observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.aa-pain-card, .aa-step, .aa-pricing-card, ' +
        '.aa-case-study-featured, .aa-mini-case'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll(
        '.aa-section-title, .aa-section-intro'
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}


/* ========================================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ======================================== */
function initSmoothScroll() {

    // Select all links with .smooth-scroll class or href starting with #
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"], .smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Track scroll to form in analytics
                    if (targetId === 'contact-form' && typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_to_form', {
                            'event_category': 'engagement',
                            'event_label': 'CTA Click'
                        });
                    }
                }
            }
        });
    });
}


/* ========================================
   CAPTURE UTM PARAMETERS FROM URL
   ======================================== */
function captureUTMParameters() {

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // UTM parameters to capture
    const utmParams = {
        'utm_source': 'aaUtmSource',
        'utm_medium': 'aaUtmMedium',
        'utm_campaign': 'aaUtmCampaign',
        'utm_term': 'aaUtmTerm'
    };

    // Populate hidden form fields
    Object.keys(utmParams).forEach(param => {
        const value = urlParams.get(param);
        const fieldId = utmParams[param];
        const field = document.getElementById(fieldId);

        if (field && value) {
            field.value = value;
        }
    });

    // Also store in sessionStorage for tracking
    if (urlParams.has('utm_source')) {
        sessionStorage.setItem('utm_params', JSON.stringify({
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign'),
            term: urlParams.get('utm_term')
        }));
    }
}


/* ========================================
   FORM SUBMISSION HANDLING
   ======================================== */
function initFormSubmission() {

    const form = document.getElementById('aaLeadForm');
    const submitBtn = document.getElementById('aaSubmitBtn');
    const successMessage = document.getElementById('aaSuccessMessage');
    const errorMessage = document.getElementById('aaErrorMessage');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Track form submission attempt
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_attempt', {
                'event_category': 'Lead Generation',
                'event_label': 'AI Agency Landing Page'
            });
        }

        try {
            // OPTION 1: Send to your API endpoint
            // Replace '/api/submit-lead' with your actual endpoint
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success!
                handleFormSuccess(form, submitBtn, successMessage, originalText, data);
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);

            // FALLBACK: Try alternative submission method
            // You can use FormSpree, Basin, or email fallback
            try {
                await sendViaAlternative(data);
                handleFormSuccess(form, submitBtn, successMessage, originalText, data);
            } catch (fallbackError) {
                handleFormError(submitBtn, errorMessage, originalText);
            }
        }
    });
}


/* ========================================
   FORM SUCCESS HANDLER
   ======================================== */
function handleFormSuccess(form, submitBtn, successMessage, originalText, data) {

    // Hide form
    form.style.display = 'none';

    // Show success message
    successMessage.style.display = 'block';

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Track conversion in Google Ads
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17682757490', // Google Ads Conversion ID
            'event_category': 'Lead Generation',
            'event_label': 'Form Submitted',
            'value': 1.0,
            'currency': 'GBP'
        });

        // Also track as general form submission
        gtag('event', 'generate_lead', {
            'event_category': 'Lead Generation',
            'event_label': 'AI Agency Landing Page',
            'industry': data.industry,
            'budget': data.budget
        });
    }

    // Optional: Redirect to thank you page after 2 seconds
    // setTimeout(() => {
    //     window.location.href = '/thank-you?source=' + (data.utm_source || 'direct');
    // }, 2000);

    // Reset button state (in case user goes back)
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = originalText;
}


/* ========================================
   FORM ERROR HANDLER
   ======================================== */
function handleFormError(submitBtn, errorMessage, originalText) {

    // Show error message
    errorMessage.style.display = 'block';

    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = originalText;

    // Hide error after 10 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 10000);
}


/* ========================================
   ALTERNATIVE SUBMISSION METHOD (FALLBACK)
   ======================================== */
async function sendViaAlternative(data) {

    // OPTION A: Use FormSpree
    // Replace 'YOUR_FORMSPREE_ID' with your actual FormSpree form ID
    /*
    const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!formspreeResponse.ok) {
        throw new Error('FormSpree submission failed');
    }
    return formspreeResponse;
    */

    // OPTION B: Email fallback using mailto (not ideal but works)
    const subject = encodeURIComponent('New AI Agency Lead from ' + data.name);
    const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Company: ${data.company || 'Not provided'}\n` +
        `Industry: ${data.industry}\n` +
        `Budget: ${data.budget || 'Not specified'}\n\n` +
        `Message:\n${data.message}\n\n` +
        `UTM Source: ${data.utm_source || 'Direct'}\n` +
        `UTM Campaign: ${data.utm_campaign || 'N/A'}\n` +
        `UTM Term: ${data.utm_term || 'N/A'}`
    );

    // This will open user's email client
    // window.location.href = `mailto:hello@webcraftio.com?subject=${subject}&body=${body}`;

    // For demo purposes, we'll just log and resolve
    console.log('Form data:', data);
    return Promise.resolve();
}


/* ========================================
   FORM VALIDATION (REAL-TIME)
   ======================================== */
function initFormValidation() {

    const form = document.getElementById('aaLeadForm');
    if (!form) return;

    // Email validation
    const emailInput = document.getElementById('aaEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && !emailRegex.test(email)) {
                this.style.borderColor = 'rgba(255, 50, 50, 0.5)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }

    // Phone validation (UK format)
    const phoneInput = document.getElementById('aaPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-digits
            let phone = this.value.replace(/\D/g, '');

            // Format as UK phone number
            if (phone.length > 0) {
                if (phone.startsWith('44')) {
                    // International format
                    phone = '+' + phone;
                } else if (phone.startsWith('0')) {
                    // UK format starting with 0
                    // Keep as is
                }
            }

            // Basic validation - UK numbers are typically 10-11 digits
            const digitsOnly = phone.replace(/\D/g, '');
            if (digitsOnly.length >= 10 && digitsOnly.length <= 13) {
                this.style.borderColor = 'rgba(0, 255, 100, 0.3)';
            } else if (this.value.length > 0) {
                this.style.borderColor = 'rgba(255, 50, 50, 0.3)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }

    // Required field highlighting
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'rgba(255, 50, 50, 0.3)';
            } else {
                this.style.borderColor = 'rgba(0, 255, 100, 0.3)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
}


/* ========================================
   TRACK SCROLL DEPTH (ANALYTICS)
   ======================================== */
(function() {

    if (typeof gtag === 'undefined') return;

    let scrollDepths = [25, 50, 75, 100];
    let triggeredDepths = [];

    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
                triggeredDepths.push(depth);

                gtag('event', 'scroll_depth', {
                    'event_category': 'Engagement',
                    'event_label': depth + '%',
                    'value': depth
                });
            }
        });
    });

})();


/* ========================================
   TRACK TIME ON PAGE
   ======================================== */
(function() {

    if (typeof gtag === 'undefined') return;

    const startTime = Date.now();

    // Track at 30 seconds, 60 seconds, 2 minutes, 5 minutes
    const timeThresholds = [30, 60, 120, 300];
    const triggeredTimes = [];

    setInterval(function() {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

        timeThresholds.forEach(threshold => {
            if (timeOnPage >= threshold && !triggeredTimes.includes(threshold)) {
                triggeredTimes.push(threshold);

                gtag('event', 'time_on_page', {
                    'event_category': 'Engagement',
                    'event_label': threshold + ' seconds',
                    'value': threshold
                });
            }
        });
    }, 5000); // Check every 5 seconds

})();


/* ========================================
   TRACK CTA BUTTON CLICKS
   ======================================== */
document.querySelectorAll('.aa-cta-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'Engagement',
                'event_label': this.textContent.trim(),
                'button_location': this.closest('section')?.id || 'unknown'
            });
        }
    });
});


/* ========================================
   PAGE LOAD PERFORMANCE TRACKING
   ======================================== */
window.addEventListener('load', function() {

    if (typeof gtag === 'undefined') return;

    // Track page load time
    setTimeout(function() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        gtag('event', 'page_load_time', {
            'event_category': 'Performance',
            'event_label': 'Load Time',
            'value': Math.round(pageLoadTime / 1000), // Convert to seconds
            'non_interaction': true
        });

        // Log to console for debugging
        console.log('Page load time:', Math.round(pageLoadTime / 1000) + 's');

        // Warn if load time is too slow
        if (pageLoadTime > 3000) {
            console.warn('⚠️ Page load time exceeds 3 seconds. Consider optimization.');
        }
    }, 0);
});


/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


/* ========================================
   CONSOLE MESSAGE (OPTIONAL)
   ======================================== */
console.log('%c🤖 AI Agency Landing Page', 'font-size: 20px; font-weight: bold; color: #fff; background: #000; padding: 10px;');
console.log('%cPowered by WebCraftio | https://webcraftio.com', 'font-size: 12px; color: #999;');
