# IRONZONE Style Guide & Implementation

## CSS Naming Convention: BEM

All CSS classes follow the **Block Element Modifier (BEM)** methodology for clarity and maintainability.

### BEM Structure

```
.block__element--modifier
```

**Example:**
```css
.product-card { }              /* Block */
.product-card__image { }       /* Element */
.product-card__image--featured { } /* Modifier */
```

## Component Architecture

### 1. Header Component

**Block:** `.header`

Elements:
- `.header__container` - Main wrapper
- `.header__menu-btn` - Menu button
- `.header__logo` - Brand logo
- `.header__cart-btn` - Shopping cart button

```html
<header class="header">
    <div class="header__container">
        <button class="header__menu-btn">Menu</button>
        <h1 class="header__logo">IRONZONE</h1>
        <button class="header__cart-btn">Cart</button>
    </div>
</header>
```

### 2. Hero Section

**Block:** `.hero`

Elements:
- `.hero__content` - Text content area
- `.hero__title` - Main headline
- `.hero__subtitle` - Secondary text
- `.hero__cta` - Call-to-action button
- `.hero__image` - Image container
- `.hero__image img` - Image element

```html
<section class="hero">
    <div class="hero__content">
        <h2 class="hero__title">NEW DROP</h2>
        <p class="hero__subtitle">Boxing Collection 2026</p>
        <button class="hero__cta">SHOP NOW</button>
    </div>
    <div class="hero__image">
        <img src="..." alt="...">
    </div>
</section>
```

### 3. Categories Component

**Block:** `.categories` | `.category-card`

Elements:
- `.categories__title` - Section title
- `.categories__grid` - Grid container
- `.category-card__icon` - Icon container
- `.category-card__name` - Category name

```html
<section class="categories">
    <h2 class="categories__title">TRAIN BY DISCIPLINE</h2>
    <div class="categories__grid">
        <article class="category-card">
            <div class="category-card__icon">Icon</div>
            <h3 class="category-card__name">Boxing</h3>
        </article>
    </div>
</section>
```

### 4. Products Component

**Block:** `.products` | `.product-card`

Elements:
- `.products__title` - Section title
- `.products__grid` - Grid container
- `.product-card__image-wrapper` - Image wrapper
- `.product-card__image` - Product image
- `.product-card__discount` - Discount badge
- `.product-card__favorite` - Favorite button
- `.product-card__content` - Content area
- `.product-card__brand` - Brand name
- `.product-card__name` - Product name
- `.product-card__code` - Product code/size
- `.product-card__rating` - Rating container
- `.product-card__stars` - Star rating
- `.product-card__reviews` - Review count
- `.product-card__price` - Price display

```html
<section class="products">
    <h2 class="products__title">BEST SELLERS</h2>
    <div class="products__grid">
        <article class="product-card">
            <div class="product-card__image-wrapper">
                <img class="product-card__image" src="..." alt="...">
                <span class="product-card__discount">-20%</span>
                <button class="product-card__favorite">♥</button>
            </div>
            <div class="product-card__content">
                <p class="product-card__brand">BRAND</p>
                <h3 class="product-card__name">Product Name</h3>
                <p class="product-card__code">Size/Code</p>
                <div class="product-card__rating">
                    <span class="product-card__stars">★★★★☆</span>
                    <span class="product-card__reviews">4.6 (112)</span>
                </div>
                <p class="product-card__price">₹3,299</p>
            </div>
        </article>
    </div>
</section>
```

## CSS Variables System

All design tokens are defined in `styles/main.css` using CSS custom properties:

### Colors
```css
--color-primary: #ff3333        /* Action/Brand color */
--color-dark: #1a1a1a           /* Main background */
--color-dark-secondary: #2a2a2a /* Secondary background */
--color-light: #f5f5f5          /* Light background */
--color-text: #ffffff           /* Primary text */
--color-text-muted: #999999     /* Secondary text */
--color-border: #404040         /* Borders */
```

### Typography
```css
--font-family-primary: system fonts
--font-size-base: 14px
--font-size-sm: 12px
--font-size-md: 16px
--font-size-lg: 20px
--font-size-xl: 24px
--font-size-2xl: 28px
```

### Spacing
```css
--spacing-xs: 4px    /* Extra small */
--spacing-sm: 8px    /* Small */
--spacing-md: 16px   /* Medium (default) */
--spacing-lg: 24px   /* Large */
--spacing-xl: 32px   /* Extra large */
--spacing-2xl: 48px  /* Double extra large */
```

### Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
```

### Transitions
```css
--transition-fast: 150ms ease-in-out
--transition-base: 300ms ease-in-out
```

## Responsive Design Strategy

### Mobile-First Approach

1. **Base styles** (0px+) - Mobile optimized
2. **Tablet** (640px+) - Minor adjustments
3. **Medium** (768px+) - More spacing
4. **Large** (1024px+) - 3-column grids
5. **XL** (1200px+) - 4-column grids, max-width

### Grid Breakpoints

```css
/* Mobile (default) */
.products__grid {
    grid-template-columns: repeat(2, 1fr);
}

/* Tablet */
@media (min-width: 640px) {
    .products__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Medium */
@media (min-width: 768px) {
    .products__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Large */
@media (min-width: 1024px) {
    .products__grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* XL */
@media (min-width: 1200px) {
    .products__grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

## JavaScript Module Functions

### Header Module

```javascript
initHeader()
// Initialize header interactions

handleMenuClick(e)
// Handle menu button click event

handleCartClick(e)
// Handle cart button click event
```

### Products Module

```javascript
initProducts()
// Initialize product interactions

handleFavoriteClick(e)
// Toggle favorite status for a product

addToCart(productId, quantity)
// Add product to shopping cart

getProducts()
// Return array of all product data
```

### Categories Module

```javascript
initCategories()
// Initialize category interactions

handleCategoryClick(e)
// Filter products by selected category

filterProductsByCategory(categoryName)
// Update product display based on category

getCategories()
// Return array of all category data
```

## Interactive States

### Button States

```css
/* Default */
.btn { }

/* Hover */
.btn:hover { 
    background-color: #ff5555;
}

/* Active */
.btn:active { 
    transform: scale(0.98);
}

/* Favorite active */
.product-card__favorite.active {
    color: var(--color-primary);
}
```

### Card Hover Effects

```css
.product-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-4px);
}

.product-card:hover .product-card__image {
    transform: scale(1.05);
}

.category-card:hover {
    background-color: var(--color-primary);
}
```

## Accessibility Standards

### Semantic HTML
```html
<header>     <!-- Page header -->
<nav>        <!-- Navigation -->
<section>    <!-- Content sections -->
<article>    <!-- Independent content -->
<button>     <!-- Interactive elements -->
<img alt=""> <!-- Image descriptions -->
```

### ARIA Attributes
```html
<button aria-label="Add to favorites"></button>
<button aria-pressed="false"></button>
```

### Keyboard Navigation
- Tab: Move focus
- Enter/Space: Activate buttons
- Arrow keys: Navigate sliders/menus

### Focus Management
```css
:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}
```

### Touch Optimization
- Minimum button size: 44x44px
- Adequate spacing between interactive elements
- Touch-friendly font sizes

## Performance Guidelines

### CSS Optimization
1. Use CSS variables for themeable properties
2. Minimal specificity
3. Mobile-first media queries
4. Avoid expensive properties (shadows, filters)

### JavaScript Optimization
1. Event delegation where possible
2. Debounce scroll/resize events
3. Lazy load images
4. Minimize DOM manipulation

### Image Optimization
1. Use appropriate formats (WebP with fallback)
2. Responsive images with srcset
3. Optimize file sizes
4. Use thumbnails for product grids

## Theme Customization

To change the brand color from red to another color:

1. Edit `styles/main.css`:
```css
--color-primary: #your-color-here;
```

2. All components will automatically update:
   - Logo color
   - CTA buttons
   - Hover states
   - Accent elements
   - Discount badges

## File Size Reference

- **index.html**: ~8 KB
- **styles/main.css**: ~4 KB
- **styles/header.css**: ~1 KB
- **styles/hero.css**: ~2 KB
- **styles/categories.css**: ~1.5 KB
- **styles/products.css**: ~3.5 KB
- **styles/responsive.css**: ~3 KB
- **js/main.js**: ~4 KB

**Total CSS**: ~15 KB (minified: ~8 KB)
**Total JS**: ~4 KB (minified: ~2 KB)

## Development Tips

1. **CSS Variables**: Change colors/sizes from one place
2. **BEM Naming**: Easy to find components and understand hierarchy
3. **Mobile-First**: Simpler CSS, better performance on mobile
4. **Semantic HTML**: Better SEO and accessibility
5. **Modular JS**: Easy to extend and test individual features

---

Last updated: March 2026