# AI Chatbot Quote Landing Page

High-converting landing page for Google Ads campaigns promoting AI chatbot development services.

## 📋 Files Created

- `ai-chatbot-quote.html` - Main landing page HTML
- `landing-page.css` - Stylesheet matching WebCraftio design system
- `landing-page.js` - Form handling, animations, and tracking
- `LANDING-PAGE-README.md` - This file

## 🎨 Design System Match

The landing page perfectly matches your existing WebCraftio design:

- **Colors**: Black background (#000), White text (#fff)
- **Font**: Albert Sans from Google Fonts
- **Buttons**: White border with hover effect (white bg, black text)
- **Cards**: Glassmorphism with rgba(255, 255, 255, 0.03) background
- **Animations**: Smooth transitions with cubic-bezier easing
- **Border Radius**: 30px for buttons, 10px for cards

## 🚀 Quick Start

### 1. Upload Files

Upload these files to your web server:
- `ai-chatbot-quote.html`
- `landing-page.css`
- `landing-page.js`

### 2. Configure Google Ads Tracking

**IMPORTANT**: Replace placeholder IDs with your actual Google Ads conversion IDs:

In `ai-chatbot-quote.html` (around line 20):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-XXXXXXX'); // Replace with YOUR Google Ads ID
</script>
```

In `landing-page.js` (around line 116):
```javascript
gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXX/XXXXXXXXXX', // Replace with YOUR conversion ID
    'value': 1.0,
    'currency': 'GBP'
});
```

### 3. Set Up Form Backend

You have **3 options** for handling form submissions:

#### Option A: Create API Endpoint (Recommended)

Create an API endpoint at `/api/submit-lead` that:
- Accepts POST requests with FormData
- Saves leads to your database
- Sends email notification to info@webcraftio.com
- Returns 200 OK on success

Example Node.js/Express endpoint:
```javascript
app.post('/api/submit-lead', async (req, res) => {
    const { name, email, phone, business, budget, message, campaign, keyword, source } = req.body;

    // Save to database
    await db.leads.insert({
        name, email, phone, business, budget, message,
        campaign, keyword, source,
        created_at: new Date()
    });

    // Send email notification
    await sendEmail({
        to: 'info@webcraftio.com',
        subject: `New Lead: ${name} - AI Chatbot Quote`,
        body: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Business: ${business}
            Budget: ${budget}
            Message: ${message}

            Campaign: ${campaign}
            Keyword: ${keyword}
            Source: ${source}
        `
    });

    res.status(200).json({ success: true });
});
```

#### Option B: Use FormSpree (Easiest)

1. Sign up at https://formspree.io/
2. Create a new form
3. Update form action in `ai-chatbot-quote.html`:

```html
<form id="leadForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### Option C: Email Fallback (Already Implemented)

The landing page includes an email fallback that opens the user's email client with pre-filled information. This works but provides a poor user experience.

### 4. Create Thank You Page

Create a simple thank you page at `/thank-you.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You | WebCraftio</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/landing-page.css">
</head>
<body class="landing-page">
    <section class="lp-hero-section">
        <div class="lp-container" style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 2rem;">✓</div>
            <h1 class="lp-hero-title">Thank You!</h1>
            <p class="lp-hero-subtitle">
                We've received your request and will contact you within 2 hours
                during business hours to schedule your free demo.
            </p>
            <p style="margin-top: 2rem; opacity: 0.7;">
                Check your email for confirmation.
            </p>
            <a href="/" class="lp-cta-primary" style="margin-top: 3rem;">
                Back to Home
            </a>
        </div>
    </section>
</body>
</html>
```

## 🔗 Deployment URLs

### Development
- Test locally: `http://localhost:3000/ai-chatbot-quote.html`

### Production
- Recommended URL: `https://webcraftio.com/ai-chatbot-quote`
- Alternative: `https://webcraftio.com/google-ads/ai-chatbot`

## 📊 Google Ads Setup

### 1. Create Campaign

- Campaign Type: Search
- Goal: Leads
- Budget: £50/day (starting)
- Location: United Kingdom
- Language: English

### 2. Keywords

Target these high-intent keywords:
- ai chatbot development uk
- custom ai chatbot
- ai ordering system
- restaurant ai automation
- ai voice agent uk
- chatbot development company
- ai automation services uk

### 3. Ad Copy Example

**Headline 1**: AI Chatbot Development UK
**Headline 2**: Fixed Pricing from £25,000
**Headline 3**: 200+ Orders Automated Daily
**Description 1**: We built AI ordering systems for restaurants reducing errors by 80%. Get free demo & fixed-price quote.
**Description 2**: UK-based agency with proven results. Voice + web ordering, POS integration, 90-day support included.

**Final URL**: `https://webcraftio.com/ai-chatbot-quote?utm_source=google&utm_medium=cpc&utm_campaign={campaign}&utm_term={keyword}`

### 4. Set Up Conversion Tracking

1. Go to Google Ads > Tools > Conversions
2. Click "+" to create new conversion
3. Type: Website
4. Category: Submit lead form
5. Value: £1,000 (estimated lead value)
6. Count: One
7. Copy the conversion ID
8. Paste it in the landing page files (see step 2 above)

## ✅ Pre-Launch Checklist

Before launching, verify:

### Content
- [ ] All text is accurate
- [ ] No typos or errors
- [ ] Phone number is clickable (tel: link)
- [ ] Email is clickable (mailto: link)
- [ ] All images load correctly
- [ ] Logo displays properly

### Technical
- [ ] Form submits successfully
- [ ] Thank you page exists and works
- [ ] Google Ads conversion tracking installed
- [ ] Conversion ID is YOUR actual ID (not placeholder)
- [ ] Page loads in under 2 seconds
- [ ] All links work
- [ ] SSL certificate active (HTTPS)

### Mobile
- [ ] Tested on iPhone (Safari)
- [ ] Tested on Android (Chrome)
- [ ] All sections stack properly
- [ ] Form is easy to fill on mobile
- [ ] Buttons are large enough to tap
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming

### Tracking
- [ ] Google Ads pixel fires on page load
- [ ] Conversion fires on form submit
- [ ] UTM parameters are captured
- [ ] Form data is saved/emailed

## 📱 Testing Instructions

### Desktop Testing
1. Open page in Chrome
2. Open DevTools (F12)
3. Check Console for errors
4. Fill out form with test data
5. Verify form submits
6. Check you reach thank you page
7. Check Google Tag Assistant for conversion

### Mobile Testing
1. Test on real iPhone and Android device
2. Check all sections display correctly
3. Fill out form (check keyboard behavior)
4. Verify all buttons/links work
5. Check page loads quickly

### Form Testing
1. Try submitting empty form (should show validation)
2. Try invalid email (should show error)
3. Fill correctly and submit
4. Verify you receive the lead via email/database
5. Check conversion fires in Google Ads

## 🎯 Performance Optimization

The page is optimized for speed:
- Inline critical CSS
- Async loading of Google Ads script
- Optimized images (using ImageKit CDN)
- Minimal JavaScript
- No heavy frameworks

Expected load time: **Under 2 seconds**

Test with:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🔧 Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify API endpoint exists at `/api/submit-lead`
- Test with FormSpree as alternative
- Check network tab for failed requests

### Conversion not tracking
- Verify Google Ads ID is correct
- Check Tag Assistant Chrome extension
- Look for gtag errors in console
- Wait 24 hours for data to appear

### Page loads slowly
- Compress images further
- Enable gzip compression on server
- Use CDN for assets
- Check server response time

### Mobile issues
- Test on real devices, not just emulators
- Check viewport meta tag is present
- Verify touch targets are 44px+
- Test form inputs on mobile keyboard

## 📈 Expected Results

Based on similar landing pages:

- **Traffic**: 100-200 clicks/month at £50/day
- **Conversion Rate**: 5-15% (5-30 leads/month)
- **Cost Per Lead**: £50-£300
- **Quality**: High (filtered by budget selector)

## 🎨 Customization

### Change Colors
Edit `landing-page.css`:
```css
/* Change primary button color */
.lp-cta-primary {
    background: #YOUR_COLOR;
    border: 2px solid #YOUR_COLOR;
}
```

### Add More Sections
Copy existing section structure:
```html
<section class="lp-YOUR-section">
    <div class="lp-container">
        <!-- Your content -->
    </div>
</section>
```

### Modify Form Fields
Edit in `ai-chatbot-quote.html`:
- Add more fields
- Change options in dropdowns
- Adjust required fields

## 🚨 Important Notes

1. **NO NAVIGATION**: Landing page has no navigation menu - this is intentional to reduce exit points

2. **CONVERSION TRACKING**: Must replace placeholder IDs with your actual Google Ads IDs

3. **FORM BACKEND**: Must set up form submission handling (API/FormSpree/email)

4. **MOBILE-FIRST**: 60%+ of Google Ads traffic is mobile - test thoroughly

5. **LOAD SPEED**: Page must load under 2 seconds for good Quality Score

## 📞 Support

If you need help:
- Email: info@webcraftio.com
- Check browser console for errors
- Test with different browsers
- Verify all IDs are correct

## 🎉 Launch Day

When you're ready to launch:

1. ✅ Complete pre-launch checklist
2. 🚀 Deploy to production
3. 🔍 Test live URL
4. 📊 Set up Google Ads campaign
5. 💰 Start with £50/day budget
6. 📈 Monitor for 48 hours
7. 🎯 Optimize based on data

Good luck with your £150 Google Ads test! 🚀

---

*Built with WebCraftio design system | Optimized for conversions | Mobile-first*
