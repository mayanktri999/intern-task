<!-- IRONZONE Quick Start Guide -->
<!-- This file serves as a reference for common tasks -->

# IRONZONE Developer Quick Reference

## 📋 Quick Navigation

- [Add New Product](#add-new-product)
- [Change Colors](#change-colors)
- [Add New Category](#add-new-category)
- [Modify Breakpoints](#modify-breakpoints)
- [Add New Section](#add-new-section)
- [Update Typography](#update-typography)

---

## 🛍️ Add New Product

### Step 1: Add HTML (in index.html)

Find the `.products__grid` section and add:

```html
<article class="product-card">
    <div class="product-card__image-wrapper">
        <img class="product-card__image" src="images/your-product.jpg" alt="Product Name">
        <span class="product-card__discount">-15%</span>
        <button class="product-card__favorite" aria-label="Add to favorites">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
    </div>
    <div class="product-card__content">
        <p class="product-card__brand">BRAND NAME</p>
        <h3 class="product-card__name">Product Name</h3>
        <p class="product-card__code">Size/Code</p>
        <div class="product-card__rating">
            <span class="product-card__stars">★★★★☆</span>
            <span class="product-card__reviews">4.5 (250)</span>
        </div>
        <p class="product-card__price">₹9,999</p>
    </div>
</article>
```

### Step 2: Add Image

1. Prepare your image (recommended size: 400x400px)
2. Save to `images/` folder
3. Update `src` attribute with correct filename

---

## 🎨 Change Colors

### Update Brand Color

Edit `styles/main.css`, line ~20:

```css
:root {
    /* Change this value */
    --color-primary: #ff3333;  /* Red - Change to your color */
    
    /* All other colors automatically adjust */
    --color-dark: #1a1a1a;
    --color-text: #ffffff;
    /* ... rest of colors ... */
}
```

### Change Specific Element

**Option 1: Modify CSS Variable** (recommended)
```css
--color-primary: #your-color;
```

**Option 2: Override in specific CSS file**
```css
.header__logo {
    color: #your-color;
}
```

---

## 📂 Add New Category

### Step 1: Add HTML (in index.html)

Find `.categories__grid` and add:

```html
<article class="category-card">
    <div class="category-card__icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <!-- SVG path here -->
        </svg>
    </div>
    <h3 class="category-card__name">Category Name</h3>
</article>
```

### Step 2: Update JavaScript (in js/main.js)

The category will automatically be interactive. No additional JS needed!

---

## 📱 Modify Breakpoints

Edit `styles/responsive.css`:

```css
/* Example: Change tablet breakpoint from 640px to 768px */
@media (min-width: 768px) {  /* Changed from 640px */
    .products__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Add a new breakpoint for 480px phones */
@media (min-width: 480px) {
    /* Your styles */
}
```

---

## 📄 Add New Section

### Basic Template

```html
<!-- New Section -->
<section class="your-section">
    <h2 class="your-section__title">Section Title</h2>
    <div class="your-section__grid">
        <!-- Content -->
    </div>
</section>
```

### Create CSS File

Create `styles/your-section.css`:

```css
.your-section {
    padding: var(--spacing-xl) var(--spacing-md);
}

.your-section__title {
    font-size: var(--font-size-xl);
    font-weight: 800;
    margin-bottom: var(--spacing-lg);
}

.your-section__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
}

/* Responsive */
@media (min-width: 1024px) {
    .your-section__grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Link CSS

Add to `index.html` head:

```html
<link rel="stylesheet" href="styles/your-section.css">
```

---

## 🔤 Update Typography

### Font Size

Edit `styles/main.css`:

```css
:root {
    --font-size-base: 14px;   /* Change base size */
    --font-size-md: 16px;
    --font-size-lg: 20px;
    --font-size-xl: 24px;
    --font-size-2xl: 28px;
}
```

### Font Family

```css
--font-family-primary: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Line Height

In specific CSS files:
```css
body {
    line-height: 1.6;  /* Change this value */
}
```

---

## 🔧 Common Tasks

### Hide Menu Button (Desktop Only)

Already done! See `responsive.css` line ~70:
```css
@media (min-width: 1024px) {
    .header__menu-btn {
        display: none;
    }
}
```

### Add Shadow to Cards

```css
.product-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Change Grid Columns

Find the section's `__grid` class and modify:
```css
grid-template-columns: repeat(2, 1fr);  /* 2 columns */
grid-template-columns: repeat(3, 1fr);  /* 3 columns */
grid-template-columns: repeat(4, 1fr);  /* 4 columns */
```

### Add Border to Section

```css
.products {
    border-top: 2px solid var(--color-border);
    border-bottom: 2px solid var(--color-border);
}
```

---

## 🐛 Debugging

### Check Console

Open browser DevTools (F12) and check Console tab for:
- Component initialization messages
- Click event logs
- Any JavaScript errors

### Check Styles

1. Right-click element
2. Select "Inspect" or "Inspect Element"
3. View applied CSS rules
4. Modify and test in real-time

### Common Issues

**Products not showing?**
- Check `products__grid` has correct selector
- Verify product-card HTML structure
- Check image paths

**Styles not applying?**
- Verify CSS file linked in HTML
- Check class names match BEM convention
- Clear browser cache (Ctrl+F5)

**JavaScript not working?**
- Check console for errors
- Verify script path in HTML
- Ensure event listeners are attached

---

## 📦 File Structure Reference

```
ironzone/
├── index.html           ← Edit HTML structure here
├── styles/
│   ├── main.css        ← Global variables & base styles
│   ├── header.css      ← Header styles
│   ├── hero.css        ← Hero section
│   ├── categories.css  ← Categories
│   ├── products.css    ← Products
│   └── responsive.css  ← All media queries
├── js/
│   └── main.js         ← All JavaScript
├── images/             ← Product images
├── README.md           ← Full documentation
├── STYLE_GUIDE.md      ← Detailed style guide
└── QUICK_START.md      ← This file
```

---

## ✅ Checklist for New Feature

- [ ] Add HTML markup with correct BEM classes
- [ ] Create CSS file or add to existing file
- [ ] Add responsive styles in responsive.css
- [ ] Link CSS in index.html
- [ ] Add JavaScript if needed in main.js
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1200px+)
- [ ] Test keyboard navigation
- [ ] Test on touch devices

---

## 🚀 Performance Tips

1. **Optimize Images**
   - Use WebP format with PNG fallback
   - Resize to max 600x600px
   - Compress before uploading

2. **Minimize CSS**
   - Remove unused classes
   - Combine similar styles
   - Use CSS variables

3. **Optimize JavaScript**
   - Use event delegation
   - Remove console.log in production
   - Cache DOM queries

---

## 📞 Quick Links

- **Design System**: See STYLE_GUIDE.md
- **Full Docs**: See README.md
- **CSS Variables**: styles/main.css (lines 12-39)
- **Breakpoints**: styles/responsive.css
- **Components**: index.html

---

Last updated: March 2026