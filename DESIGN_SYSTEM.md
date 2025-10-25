# WebCraftio Design System Analysis

## Colors
- **Primary Background**: `#000` (black)
- **Secondary Background**: `#1a1a1a`, `#222` (dark gray for cards)
- **Text Primary**: `#fff` (white)
- **Text Secondary**: `#ccc`, `#999` (light gray)
- **Text Muted**: `#666` (gray)
- **Accent/Highlight**: `#fdb226` (golden yellow) - used for CTAs
- **Borders**: `rgba(255, 255, 255, 0.1)` (subtle white)
- **Card Backgrounds**: `rgba(255, 255, 255, 0.03)` with glassmorphism effect

## Typography
- **Font Family**: "Albert Sans" (Google Font)
- **Hero Heading**: `font-size: 10.42vw`, `line-height: 9vw`, `opacity: 0.65`, `letter-spacing: 0.4vw`
- **Section Titles**: `font-size: 3.8rem` (process section), `2.5rem` (smaller sections)
- **Step Titles**: `font-size: 3.5rem`, uppercase, `letter-spacing: 2px`
- **Body Text**: `font-size: 1.2rem`, `line-height: 1.5-1.8`
- **Small Text**: `font-size: 0.9rem`, uppercase for labels

## Animations

### Libraries Used
- **GSAP** (GreenSock Animation Platform)
- **ScrollTrigger** (GSAP plugin)
- **Locomotive Scroll** (smooth scrolling)
- **Intersection Observer** (native API for scroll-triggered animations)

### Animation Patterns
- **Duration**: Typically `0.5s` to `0.8s`
- **Easing**: `ease-out`, `Power3`, `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Stagger**: `0.5s` between elements in sequence
- **Scroll Animations**: Elements fade in from bottom (`y: "20%"` → `y: 0`) with opacity `0` → `1`
- **Hover Transitions**: `0.3s ease` for most interactive elements
- **Card Hover**: `translateY(-10px)` with enhanced shadow
- **Opacity Transitions**: Inactive elements at `opacity: 0.3-0.8`, active at `opacity: 1`

### Specific Animation Timings
```javascript
// Hero elements
from-btm-ele: { y: "100%", duration: 0.5, stagger: 0.5, delay: 3.3 }
from-top-ele: { y: "-100%", duration: 0.5, stagger: 0.5, delay: 3.3 }

// Scroll-triggered
about section: { y: "20%", duration: 0.5, delay: 0.5 }
```

## Spacing
- **Section Padding**: `100px 8%` (desktop), `50px 20px` (mobile)
- **Page Padding**: `1vh 3vw` (viewport-based)
- **Card Padding**: `30px` to `40px`
- **Container Max-Width**: `1200px` (for content), `800px` (for text-heavy sections)
- **Grid Gaps**: `20px` to `30px` (cards), `2rem` (general)
- **Hero Height**: `100vh` / `100dvh`

## Effects

### Shadows
- **Card Shadow**: `0px 4px 15px rgba(0, 0, 0, 0.2)`
- **Elevated Shadow**: `0 10px 20px rgba(0, 0, 0, 0.3)` (on hover)
- **Subtle Shadow**: `0 4px 10px rgba(0, 102, 255, 0.2)` (floating panel)

### Border Radius
- **Cards**: `10px` to `15px`
- **Buttons**: `150px` (pill shape), `30px` (rounded)
- **Small Elements**: `4px` to `8px`

### Blur Effects
- **Glassmorphism**: `backdrop-filter: blur(10px)` with `rgba(255, 255, 255, 0.05)` background

### Hover States
- **Cards**: `transform: translateY(-10px)`, opacity increase, shadow enhancement
- **Buttons**: `transform: translateY(-3px)`, background color change
- **Links**: Underline animation (scale from 0 to 1)
- **Images**: `transform: scale(1.1)` on hover

## Layout Patterns

### Grid Systems
```css
/* Projects Grid */
grid-template-columns: repeat(3, 1fr);
/* at 768px → flex with horizontal scroll */

/* Process Section */
Vertical flex layout with centered content
Each step: min-height: 100vh

/* Services/Cards */
display: flex, flex-wrap: wrap
gap: 20px to 30px
```

### Responsive Breakpoints
- **Desktop**: Above `1024px`
- **Tablet**: `768px` - `1023px`
- **Mobile**: `480px` - `767px`
- **Small Mobile**: Below `480px`

### Key Breakpoint Behaviors
```css
@media (max-width: 769px) {
  /* Mobile navigation appears */
  /* Grid becomes horizontal scroll */
}

@media (max-width: 480px) {
  /* Hero font size changes to 18vw */
  /* Reduced padding and margins */
}
```

## Component Patterns

### Card Structure
```css
background: #222 or rgba(255, 255, 255, 0.03)
padding: 30px-40px
border-radius: 10px-15px
border: 1px solid rgba(255, 255, 255, 0.1)
transition: transform 0.3s ease, box-shadow 0.3s ease

:hover {
  transform: translateY(-10px)
  background: rgba(255, 255, 255, 0.05)
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3)
}
```

### Button Styles
```css
/* Primary Button */
border: 1px solid #fff
background: transparent (becomes white on hover)
color: white (becomes black on hover)
padding: 7px 20px to 15px 40px
border-radius: 150px (pill) or 30px
transition: 0.2s linear

/* CTA Highlight */
background: #fdb226
color: black
font-weight: bold
```

### Process Steps
```css
opacity: 0.3 (inactive)
opacity: 1 (active via Intersection Observer)
min-height: 100vh
vertical line connectors
step numbers with border badges
```

## Animation Implementation Pattern

### For New Sections (GSAP ScrollTrigger)
```javascript
gsap.from(".new-section", {
  y: "20%",
  duration: 0.5,
  opacity: 0,
  delay: 0.5,
  scrollTrigger: {
    trigger: ".new-section",
    scroller: ".main", // IMPORTANT: Locomotive Scroll container
  }
});
```

### For Card Grids (Stagger)
```javascript
gsap.from(".card-item", {
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".card-container",
    scroller: ".main",
    start: "top 80%"
  }
});
```

## Critical Requirements for New Content

### ✅ Must Match
1. Black background (`#000`)
2. White text with varying opacity levels
3. Cards with `rgba(255, 255, 255, 0.03)` backgrounds
4. Border radius of `10px-15px` for cards
5. Hover effect: `translateY(-10px)` + shadow enhancement
6. GSAP ScrollTrigger animations with `scroller: ".main"`
7. Locomotive Scroll compatibility
8. Mobile-first responsive design
9. Font family: "Albert Sans"
10. Accent color: `#fdb226` for important CTAs

### ✅ Animation Consistency
- All scroll animations must use ScrollTrigger with `scroller: ".main"`
- Duration: 0.5s standard
- Opacity transitions: 0 → 1
- Transform: from bottom (`y: 20%`) to position
- Delay: 0.5s for scroll-triggered elements

### ✅ Responsive Behavior
- Desktop grid → Mobile horizontal scroll (like projects section)
- Reduced padding on mobile
- Font sizes scale with viewport on small screens
- Touch-friendly sizing on mobile
