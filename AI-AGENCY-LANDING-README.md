# AI Agency Landing Page - Deployment Guide

## 📋 Overview

This is a high-converting landing page for generic AI development services, designed for Google Ads campaigns.

**Key Features:**
- 8 comprehensive sections
- Matches WebCraftio design system perfectly
- Mobile-first responsive design
- Fast load times (target: <2 seconds)
- Form with UTM tracking
- Google Analytics integration ready
- NO navigation menu (focused conversion)

---

## 📦 Files Included

```
/
├── ai-agency-landing.html          # Main landing page HTML
├── ai-agency-styles.css            # Complete stylesheet
├── ai-agency-script.js             # JavaScript for animations & forms
├── DESIGN_ANALYSIS.md              # WebCraftio design system documentation
└── AI-AGENCY-LANDING-README.md     # This file
```

---

## 🚀 CRITICAL PRE-LAUNCH TASKS

### 1. Replace Google Analytics ID

**File:** `ai-agency-landing.html` (Line 27)

```html
<!-- REPLACE THIS -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    gtag('config', 'G-XXXXXXXXXX'); // REPLACE WITH YOUR GA4 ID
</script>
```

**How to get your GA4 ID:**
1. Go to Google Analytics → Admin
2. Create a new GA4 property (if needed)
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace both instances in the code

---

### 2. Set Up Google Ads Conversion Tracking

**File:** `ai-agency-script.js` (Line 156)

```javascript
// REPLACE THIS:
gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXX/XXXXXXXXXX', // REPLACE WITH YOUR CONVERSION ID
    ...
});
```

**How to get your Conversion ID:**
1. Go to Google Ads → Tools → Conversions
2. Click "+" to create new conversion action
3. Select "Website" → "Submit lead form"
4. Name it "AI Agency Form Submission"
5. Copy the conversion ID (format: `AW-123456789/AbC-D_efG-h1_234-567`)
6. Paste it in the JavaScript file

**Conversion Settings:**
- Value: £50 (average lead value)
- Count: One (per conversion)
- Window: 30 days

---

### 3. Configure Form Backend

You have **3 options** for handling form submissions:

#### **OPTION A: Custom API Endpoint (Recommended)**

Create an API endpoint at `/api/submit-lead` that accepts POST requests.

**Example Node.js/Express:**
```javascript
app.post('/api/submit-lead', async (req, res) => {
    const { name, email, phone, company, industry, message, budget, utm_source, utm_campaign } = req.body;

    // 1. Validate data
    if (!name || !email || !phone || !industry || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Save to database
    await db.leads.create({
        name, email, phone, company, industry, message, budget,
        utm_source, utm_campaign,
        created_at: new Date()
    });

    // 3. Send email notification
    await sendEmail({
        to: 'hello@webcraftio.com',
        subject: `New AI Agency Lead: ${name}`,
        body: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Company: ${company}
            Industry: ${industry}
            Budget: ${budget}

            Message:
            ${message}

            UTM Source: ${utm_source}
            UTM Campaign: ${utm_campaign}
        `
    });

    // 4. Optional: Add to CRM (HubSpot, Salesforce, etc.)
    // await crm.createContact({ ... });

    res.json({ success: true });
});
```

#### **OPTION B: FormSpree (Easiest - No Backend)**

1. Go to https://formspree.io/
2. Sign up (free plan allows 50 submissions/month)
3. Create new form
4. Get your form ID
5. Update `ai-agency-script.js` (Line 170):

```javascript
// Uncomment and update:
const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

**FormSpree Setup:**
- Enable reCAPTCHA for spam protection
- Set up email notifications to `hello@webcraftio.com`
- Customize thank you message

#### **OPTION C: Email Fallback (Quick & Dirty)**

Uses `mailto:` link (opens user's email client).

Already implemented as fallback in `ai-agency-script.js`.

**Pros:** No backend needed
**Cons:** Not professional, unreliable, poor UX

---

### 4. Add URL Rewrite to Vercel

**File:** `vercel.json`

Add this rewrite rule:

```json
{
  "rewrites": [
    {
      "source": "/ai-agency",
      "destination": "/ai-agency-landing.html"
    },
    // ... existing rewrites
  ]
}
```

This allows accessing the page at:
- ✅ `https://webcraftio.com/ai-agency` (clean URL for ads)
- ✅ `https://webcraftio.com/ai-agency-landing.html` (also works)

---

## 🎯 GOOGLE ADS CAMPAIGN SETUP

### Campaign Structure

```
Campaign: AI Development Services UK
├── Ad Group 1: AI Chatbot Development
│   ├── Keywords: "ai chatbot development uk", "custom ai chatbot"
│   └── Landing Page: https://webcraftio.com/ai-agency?utm_source=google&utm_medium=cpc&utm_campaign=ai-chatbot&utm_term={keyword}
│
├── Ad Group 2: AI Automation
│   ├── Keywords: "business ai automation", "ai process automation"
│   └── Landing Page: https://webcraftio.com/ai-agency?utm_source=google&utm_medium=cpc&utm_campaign=ai-automation&utm_term={keyword}
│
└── Ad Group 3: Custom AI Development
    ├── Keywords: "custom ai development", "ai software development"
    └── Landing Page: https://webcraftio.com/ai-agency?utm_source=google&utm_medium=cpc&utm_campaign=ai-custom&utm_term={keyword}
```

### Budget Recommendation

**Test Budget:** £150 over 3 days (£50/day)

**Expected Results:**
- Impressions: 1,000 - 3,000
- Clicks: 50 - 150 (2-5% CTR)
- Cost per Click: £1 - £3
- Form Submissions: 7 - 17 (10-15% conversion rate)
- Cost per Lead: £9 - £21

### Keyword Strategy

**High-Intent Keywords (Exact Match):**
```
[ai chatbot development uk]
[custom ai development]
[ai automation services]
[ai software development company]
```

**Phrase Match (Broader):**
```
"ai development agency"
"build ai chatbot"
"ai integration services"
```

**Negative Keywords (Add these to prevent wasted spend):**
```
-free
-tutorial
-course
-diy
-template
-how to
-learn
-cheap
```

### Ad Copy Examples

**Ad 1: Restaurant AI**
```
Headline 1: AI Restaurant Automation
Headline 2: Handle 200+ Daily Orders
Headline 3: UK-Based AI Developers

Description 1: Complete AI systems for restaurants. Voice ordering, reservations & customer management. Built in 2-12 weeks.

Description 2: From £15k. Proven ROI. Free consultation. See how Voistra transformed restaurant operations.
```

**Ad 2: SaaS AI**
```
Headline 1: Custom AI Development UK
Headline 2: SaaS & Software Solutions
Headline 3: Fixed Price Projects

Description 1: We build custom AI platforms like SmartCFO. 500+ active users. Multi-tenant architecture. Professional team.

Description 2: £5k-£100k projects. 2-12 week delivery. No hidden fees. Book free consultation today.
```

### Landing Page URL Parameters

Always use UTM parameters:

```
https://webcraftio.com/ai-agency?utm_source=google&utm_medium=cpc&utm_campaign=ai-chatbot&utm_term={keyword}
```

The landing page automatically captures these for tracking.

---

## 📊 ANALYTICS & TRACKING

### Events Tracked (Automatically)

The landing page tracks these events in Google Analytics:

1. **scroll_to_form** - User clicks CTA button
2. **form_submit_attempt** - User starts form submission
3. **generate_lead** - Form successfully submitted
4. **conversion** - Sent to Google Ads
5. **scroll_depth** - 25%, 50%, 75%, 100% page scroll
6. **time_on_page** - 30s, 60s, 2min, 5min milestones
7. **cta_click** - Any CTA button clicked
8. **page_load_time** - Performance tracking

### Conversion Goals in GA4

Set up these conversions:

1. **generate_lead** (Primary)
2. **scroll_to_form** (Engagement)
3. **time_on_page** > 60s (Quality traffic)

---

## 🧪 PRE-LAUNCH TESTING CHECKLIST

Before launching ads, test everything:

### ✅ Desktop Testing

- [ ] Page loads in under 2 seconds
- [ ] All sections display correctly
- [ ] Hero CTA scrolls to form smoothly
- [ ] Case study images load properly
- [ ] Form fields all work
- [ ] Form submission works (test with real email)
- [ ] Success message displays after submission
- [ ] No console errors in browser DevTools
- [ ] Google Analytics tracking fires (check Real-Time)

### ✅ Mobile Testing

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] All text is readable
- [ ] Buttons are easy to tap (44px min height)
- [ ] Form inputs work on mobile keyboard
- [ ] No horizontal scrolling
- [ ] Images don't overflow
- [ ] Page loads fast on 4G

### ✅ Form Testing

- [ ] Submit with all fields filled - success
- [ ] Submit with missing required fields - error shown
- [ ] Submit with invalid email - validation error
- [ ] Check email notification arrives
- [ ] UTM parameters captured correctly
- [ ] Google Ads conversion fires (use Tag Assistant)

### ✅ Cross-Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### ✅ SEO & Performance

- [ ] Run Google PageSpeed Insights (target: 90+ score)
- [ ] Check mobile-friendliness
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Check for broken links
- [ ] Test on slow connection (throttle in DevTools)

---

## 🎨 CUSTOMIZATION OPTIONS

### Changing Images

Update these in `ai-agency-landing.html`:

**Voistra case study (Line 245):**
```html
<img src="YOUR_IMAGE_URL" alt="Voistra AI Restaurant System">
```

**SmartCFO case study (Line 279):**
```html
<img src="YOUR_IMAGE_URL" alt="SmartCFO AI Features">
```

**Recommended image specs:**
- Format: WebP or JPEG
- Size: Max 500KB
- Dimensions: 800x600px (landscape)
- Compression: 80% quality

### Updating Case Study Numbers

Edit in `ai-agency-landing.html`:

```html
<!-- Update metrics -->
<div class="aa-metric">
    <span class="aa-metric-number">200+</span>
    <span class="aa-metric-label">Daily Orders</span>
</div>
```

### Changing Pricing Tiers

Edit in `ai-agency-landing.html` (Section 6):

```html
<div class="aa-price-range">£5,000 - £15,000</div>
```

### Adding/Removing Industries

Edit the dropdown in form (Line 455):

```html
<select id="aaIndustry" name="industry">
    <option value="your-industry">Your Industry</option>
</select>
```

---

## 🐛 TROUBLESHOOTING

### Form Not Submitting

**Problem:** Form shows error message
**Solution:**
1. Check browser console for errors
2. Verify API endpoint is set up at `/api/submit-lead`
3. Or configure FormSpree alternative
4. Test with network tab open in DevTools

### Google Ads Conversion Not Tracking

**Problem:** Conversions not showing in Google Ads
**Solution:**
1. Use Google Tag Assistant to verify gtag fires
2. Check conversion ID is correct format (`AW-XXXXXXX/XXXXXXXXXX`)
3. Test form submission and wait 24 hours for data
4. Verify conversion action is active in Google Ads

### Page Loads Slowly

**Problem:** PageSpeed score below 90
**Solution:**
1. Compress images (use TinyPNG or ImageOptim)
2. Enable Vercel's image optimization
3. Remove unused CSS/JS
4. Defer non-critical JavaScript
5. Use WebP format for images

### Mobile Layout Broken

**Problem:** Layout looks wrong on mobile
**Solution:**
1. Check viewport meta tag is present
2. Test CSS Grid fallbacks for older browsers
3. Verify all images have max-width: 100%
4. Check for hardcoded pixel widths

---

## 📈 SUCCESS METRICS

### Target KPIs (First 30 Days)

| Metric | Target | Good | Excellent |
|--------|--------|------|-----------|
| Landing Page CTR | 10% | 12% | 15%+ |
| Form Conversion | 10% | 15% | 20%+ |
| Cost per Lead | £25 | £20 | £15 |
| PageSpeed Score | 85+ | 90+ | 95+ |
| Bounce Rate | <50% | <40% | <30% |
| Avg. Time on Page | 2min | 3min | 4min+ |

### A/B Testing Ideas (After Launch)

1. **Headline variations:**
   - Current: "Custom AI Development for UK Businesses"
   - Test: "AI That Pays for Itself in 3-6 Months"

2. **CTA button text:**
   - Current: "Get Your Free Consultation"
   - Test: "See How Much You Can Save"

3. **Hero image:**
   - Test adding a hero image/video
   - Try animated code background

4. **Form length:**
   - Test shorter form (fewer fields)
   - Test multi-step form

5. **Pricing display:**
   - Test hiding prices (only show on consultation)
   - Test calculator widget

---

## 🔒 SECURITY NOTES

### Form Spam Prevention

**Recommendations:**

1. **Add reCAPTCHA v3:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

2. **Rate limiting:**
   - Limit form submissions to 3 per IP per hour
   - Implement on backend

3. **Honeypot field:**
   - Add hidden field that bots fill out
   - Reject submissions with this field filled

### Data Privacy (GDPR)

Since targeting UK:

1. Add privacy policy link in footer
2. Include consent checkbox in form
3. Store data securely with encryption
4. Provide unsubscribe mechanism
5. Delete data upon request

---

## 📞 SUPPORT

If you need help with:
- **Form backend setup:** Contact dev team
- **Google Ads configuration:** See Google Ads Help
- **Design customization:** Reference DESIGN_ANALYSIS.md
- **Deployment issues:** Check Vercel dashboard

---

## 🎉 YOU'RE READY TO LAUNCH!

Once you've completed all pre-launch tasks:

1. ✅ Replaced Google Analytics ID
2. ✅ Set up Google Ads conversion tracking
3. ✅ Configured form backend
4. ✅ Added URL rewrite to vercel.json
5. ✅ Tested on desktop and mobile
6. ✅ Verified form submission works
7. ✅ Checked page speed (<2 seconds)

**Deploy to production:**

```bash
git add ai-agency-landing.html ai-agency-styles.css ai-agency-script.js vercel.json
git commit -m "Add AI agency landing page for Google Ads campaign"
git push origin main
```

Vercel will automatically deploy in ~2 minutes.

**Launch Google Ads campaign** with landing page URL:
```
https://webcraftio.com/ai-agency?utm_source=google&utm_medium=cpc&utm_campaign=ai-services&utm_term={keyword}
```

---

**Good luck! 🚀**

Built with ❤️ by WebCraftio
Last updated: 2025-10-27
