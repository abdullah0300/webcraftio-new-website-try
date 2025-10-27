# WebCraftio Design System Analysis

This document contains the extracted design system from the WebCraftio website to ensure the new AI agency landing page matches the existing aesthetics perfectly.

---

## 🎨 COLOR PALETTE

### Core Colors
```css
--primary-black: #000;
--primary-white: #fff;
--gray-text: #a3a3a3;
--light-gray: #ccc;
```

### Background Colors
- **Primary Background**: `#000` (black)
- **Card Backgrounds**: `rgba(255, 255, 255, 0.03)` (subtle white overlay)
- **Glassmorphism Cards**: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(10px)`

### Text Colors
- **Headings**: `#fff` (white)
- **Body Text**: `#ccc` (light gray)
- **Muted Text**: `opacity: 0.8` or `opacity: 0.65`

### Border Colors
- **Subtle Borders**: `rgba(255, 255, 255, 0.1)`
- **Hover Borders**: `#fff` (white)
- **Button Borders**: `2px solid #fff`

### Accent Colors
- No bright accent colors - strictly black and white with transparency variations

---

## 📝 TYPOGRAPHY

### Font Families
```css
font-family: "Albert Sans", sans-serif;
```
**Import**: `@import url('https://fonts.googleapis.com/css2?family=Albert+Sans&display=swap');`

### Font Sizes

#### Headings
```css
h1 (Hero): 10.42vw (desktop), 18vw (mobile under 480px)
h2 (Section Titles): 3rem - 5rem
h3 (Subsection): 2.5rem
h4: 1.5rem
h5: 1vw (uppercase)
h6: 1.2rem
```

#### Body Text
```css
Body: 1rem (16px base)
Large Text: 1.2rem
Small Text: 0.9rem
```

### Font Weights
```css
Light: 300
Regular: 400
Semibold: 600
Bold: 700
Black: 900 (headings, nav)
```

### Line Heights
```css
Headings: 9vw (hero), 1.2-1.4 (other headings)
Body: 1.6
Compact: 1
```

### Letter Spacing
```css
Hero Heading: 0.4vw
Uppercase Text: 1px - 4px
Buttons: 1px
Numbers: 4px
```

---

## 📏 SPACING SYSTEM

### Section Padding
```css
Vertical: 100px (large sections), 2vw - 5vw (adaptive)
Horizontal: 3vw - 5vw
Mobile: Reduced to 1vh 3vw
```

### Container Max-Width
```css
max-width: 1400px (implied from content width)
Wide Sections: 100% with padding-inline: 3vw - 5vw
```

### Grid Gaps
```css
Card Grids: 2rem - 3rem
Small Elements: 1rem
Icons: 3vw
```

### Component Padding
```css
Cards: 2rem - 4rem
Buttons: 12px 35px (small), 18px 45px (large)
Form Inputs: 1rem - 1.5rem
```

---

## 🎭 VISUAL EFFECTS

### Box Shadows

#### Cards
```css
Default: 0px 4px 15px rgba(0, 0, 0, 0.2)
Hover: 0 10px 20px rgba(0, 0, 0, 0.5)
Strong Hover: 0 20px 40px rgba(0, 0, 0, 0.3)
Subtle: 0 4px 6px rgba(0, 0, 0, 0.1)
```

#### Buttons
```css
Default: 0 4px 6px rgba(0, 0, 0, 0.1)
Hover: 0 10px 20px rgba(165, 165, 167, 0.3)
```

### Border Radius

#### Buttons
```css
Primary CTA: 30px (pill shape)
Secondary: 25px
```

#### Cards
```css
Standard Cards: 10px - 15px
Large Cards: 16px
Special Elements: 150px (very rounded)
```

#### Circular Elements
```css
Icons/Avatars: 50% (perfect circle)
```

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.03) - rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Gradients
- Minimal use of gradients
- Primarily solid colors with opacity variations

---

## ⚡ ANIMATIONS & TRANSITIONS

### Transition Speeds
```css
Fast: 0.2s linear
Standard: 0.3s ease
Slow: 0.4s linear
Smooth: cubic-bezier(0.215, 0.610, 0.355, 1) 0.4s
```

### Hover Effects

#### Buttons
```css
.button:hover {
    background: #fff;
    color: #000;
    transform: translateY(-3px);
    transition: all 0.3s ease;
}
```

#### Cards
```css
.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

#### Underline Effect
```css
.underline::after {
    transform: scaleX(0);
    transition: transform 0.2s linear;
    transform-origin: bottom right;
}

.underline:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
```

### Scroll Animations
- Elements fade in on scroll
- Use Intersection Observer or Locomotive Scroll
- Staggered animations for grid items
- Smooth scroll behavior enabled

### Loading Animations
```css
@keyframes loader {
    0% { transform: translateX(-90%); }
    100% { transform: translateX(0%); }
}
animation: loader 2.3s linear forwards;
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop
```css
@media (min-width: 1024px) {
    /* Full desktop layout */
}
```

### Tablet
```css
@media (max-width: 992px) {
    /* Switch to 2-column grids */
    /* Reduce font sizes slightly */
}
```

### Mobile
```css
@media (max-width: 768px) {
    /* Switch to single column */
    /* Stack all elements */
}
```

### Small Mobile
```css
@media (max-width: 480px) {
    /* Extra small screens */
    /* Increase relative font sizes (vw units) */
    /* Compact spacing */
}
```

### Grid Transformations
```
Desktop: grid-template-columns: repeat(4, 1fr)
Tablet: grid-template-columns: repeat(2, 1fr)
Mobile: grid-template-columns: 1fr
```

---

## 🔘 BUTTON STYLES

### Primary CTA Button
```css
.cta-primary {
    display: inline-block;
    padding: 18px 45px;
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 30px;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
}

.cta-primary:hover {
    background: #fff;
    color: #000;
    transform: translateY(-3px);
    cursor: pointer;
}
```

### Secondary Button (Smaller)
```css
.cta-secondary {
    padding: 12px 35px;
    font-size: 1rem;
    /* Rest same as primary */
}
```

### Button States
- **Default**: Transparent with white border
- **Hover**: White background, black text, lifts up
- **Active**: No specific active state
- **Disabled**: Not used

---

## 🃏 CARD STYLES

### Standard Card
```css
.card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    text-align: center;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: #fff;
}
```

### Featured/Glassmorphism Card
```css
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 3rem;
}
```

---

## 📋 FORM STYLES

### Input Fields
```css
input, select, textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px - 10px;
    padding: 1rem;
    color: #fff;
    font-size: 1rem;
    font-family: "Albert Sans", sans-serif;
}

input:focus {
    border-color: #fff;
    outline: none;
}
```

### Submit Button
```css
.submit-btn {
    padding: 18px 45px;
    background: #fff;
    color: #000;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
}
```

---

## 🎯 KEY DESIGN PRINCIPLES

1. **Minimalist Black & White**: Strictly monochrome with subtle opacity variations
2. **Glassmorphism**: Frosted glass effect for modern feel
3. **Bold Typography**: Large, heavy headings with Albert Sans
4. **Generous Spacing**: Lots of whitespace, never cramped
5. **Smooth Animations**: Everything transitions smoothly (0.3s ease)
6. **Hover Feedback**: Elements lift up on hover with shadow increase
7. **Mobile-First**: Responsive with clear breakpoints
8. **No Clutter**: Clean, focused design with single goal

---

## 📦 COMPONENT PATTERNS

### Section Structure
```html
<section class="section-name">
    <div class="section-container">
        <h2 class="section-title">Title</h2>
        <p class="section-intro">Introduction text</p>
        <div class="section-grid">
            <!-- Cards/Content -->
        </div>
    </div>
</section>
```

### Section Styling
```css
.section-name {
    background: #000;
    color: #fff;
    padding: 100px 3vw;
}

.section-container {
    max-width: 1400px;
    margin: 0 auto;
}

.section-title {
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
}

.section-intro {
    font-size: 1.2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
    opacity: 0.8;
}
```

---

## 🚀 PERFORMANCE NOTES

- Uses system fonts where possible
- Single Google Font import (Albert Sans)
- CSS animations over JS where possible
- Lazy loading images
- Minimal external dependencies
- Inline critical CSS for above-fold content

---

**Last Updated**: 2025-10-27
**Analyzed By**: Claude Code AI
**Purpose**: Landing page design consistency
