// ============================================
// LANDING PAGE JAVASCRIPT
// Handles form submission, animations, and tracking
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. SCROLL ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections for scroll animation
    const elementsToAnimate = document.querySelectorAll(
        '.lp-stat-card, .lp-step-card, .lp-pricing-card, .lp-trust-card, .lp-benefit-item'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 2. SMOOTH SCROLL TO FORM
    // ============================================

    document.querySelectorAll('a[href="#form"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.querySelector('#form');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 3. CAPTURE UTM PARAMETERS
    // ============================================

    const urlParams = new URLSearchParams(window.location.search);

    const campaign = urlParams.get('utm_campaign') || '';
    const keyword = urlParams.get('utm_term') || '';
    const source = urlParams.get('utm_source') || 'google-ads';

    // Set hidden form fields
    const campaignField = document.getElementById('campaign');
    const keywordField = document.getElementById('keyword');

    if (campaignField) campaignField.value = campaign;
    if (keywordField) keywordField.value = keyword;

    // ============================================
    // 4. FORM VALIDATION ENHANCEMENT
    // ============================================

    const formInputs = document.querySelectorAll('.lp-form-input, .lp-form-select');

    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && this.checkValidity()) {
                this.style.borderColor = 'rgba(46, 213, 115, 0.5)';
            } else if (this.value && !this.checkValidity()) {
                this.style.borderColor = 'rgba(235, 59, 90, 0.5)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    });

    // ============================================
    // 5. FORM SUBMISSION HANDLING
    // ============================================

    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('.lp-form-submit');
            const originalText = submitButton.innerHTML;

            // Show loading state
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Get form data
            const formData = new FormData(this);

            // Add additional tracking data
            formData.append('utm_source', source);
            formData.append('page_url', window.location.href);
            formData.append('timestamp', new Date().toISOString());

            try {
                // METHOD 1: Send to your backend API
                const response = await fetch('/api/submit-lead', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // Success! Track conversion
                    trackConversion();

                    // Redirect to thank you page
                    window.location.href = '/thank-you?source=' + source;

                    // OR show success message inline (uncomment if not redirecting)
                    // showSuccessMessage();

                } else {
                    throw new Error('Submission failed');
                }

            } catch (error) {
                console.error('Form submission error:', error);

                // METHOD 2: Fallback to mailto if API fails
                sendViaEmail(formData);

                // Show error message
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';

                alert('Thank you! We\'ll contact you shortly. If you don\'t hear from us within 2 hours, please email us directly at info@webcraftio.com');
            }
        });
    }

    // ============================================
    // 6. GOOGLE ADS CONVERSION TRACKING
    // ============================================

    function trackConversion() {
        // Track conversion in Google Ads
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXX/XXXXXXXXXX', // REPLACE WITH YOUR CONVERSION ID
                'value': 1.0,
                'currency': 'GBP',
                'transaction_id': 'LP-' + Date.now()
            });
        }

        // Track in Google Analytics (if installed)
        if (typeof ga !== 'undefined') {
            ga('send', 'event', 'Form', 'Submit', 'Lead Form', 1);
        }
    }

    // ============================================
    // 7. EMAIL FALLBACK
    // ============================================

    function sendViaEmail(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const business = formData.get('business');
        const budget = formData.get('budget');
        const message = formData.get('message');

        const emailBody = `
New Lead from Landing Page

Name: ${name}
Email: ${email}
Phone: ${phone}
Business Type: ${business}
Budget: ${budget}
Message: ${message}

UTM Campaign: ${formData.get('campaign')}
UTM Keyword: ${formData.get('keyword')}
Source: ${formData.get('source')}
Page URL: ${window.location.href}
        `.trim();

        const subject = encodeURIComponent('New Lead: ' + name + ' - AI Chatbot Quote');
        const body = encodeURIComponent(emailBody);

        window.location.href = `mailto:info@webcraftio.com?subject=${subject}&body=${body}`;
    }

    // ============================================
    // 8. SUCCESS MESSAGE (if not redirecting)
    // ============================================

    function showSuccessMessage() {
        const form = document.getElementById('leadForm');
        form.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✓</div>
                <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Thank You!</h3>
                <p style="font-size: 1.125rem; line-height: 1.6; color: rgba(255, 255, 255, 0.8);">
                    We've received your request and will contact you within 2 hours
                    during business hours to schedule your free demo.
                </p>
                <p style="margin-top: 1.5rem; opacity: 0.7;">
                    Check your email for confirmation.
                </p>
            </div>
        `;
    }

    // ============================================
    // 9. PHONE NUMBER FORMATTING (UK)
    // ============================================

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            // Format UK phone number
            if (value.startsWith('44')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                // Keep as is (UK format)
            }

            e.target.value = value;
        });
    }

    // ============================================
    // 10. TRACK PAGE VIEW
    // ============================================

    // Track page view with UTM parameters
    if (typeof gtag !== 'undefined') {
        gtag('config', 'AW-XXXXXXX', {  // REPLACE WITH YOUR ID
            'page_path': window.location.pathname + window.location.search,
            'campaign': campaign,
            'source': source
        });
    }

    // ============================================
    // 11. EXIT INTENT POPUP (OPTIONAL - UNCOMMENT IF NEEDED)
    // ============================================

    /*
    let exitIntentShown = false;

    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 0 && !exitIntentShown) {
            exitIntentShown = true;

            // Show exit intent message
            if (confirm('Wait! Get a free demo before you go?')) {
                document.querySelector('#form').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
    */

    // ============================================
    // 12. CONSOLE MESSAGE FOR DEBUGGING
    // ============================================

    console.log('Landing Page Loaded');
    console.log('UTM Source:', source);
    console.log('UTM Campaign:', campaign);
    console.log('UTM Keyword:', keyword);

});

// ============================================
// 13. HANDLE TAWK.TO INTEGRATION (IF INSTALLED)
// ============================================

// If Tawk.to is installed on the site, this will open it
function openLiveChat() {
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.maximize();
    }
}

// ============================================
// 14. PERFORMANCE MONITORING
// ============================================

// Log page load time
window.addEventListener('load', function() {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
                        window.performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');

        // Track in GA if slow
        if (loadTime > 3000 && typeof gtag !== 'undefined') {
            gtag('event', 'page_load_slow', {
                'load_time': loadTime,
                'page': window.location.pathname
            });
        }
    }
});
