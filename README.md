# IRONZONE - Premium Boxing & Fitness E-commerce Website

A modern, responsive e-commerce website for boxing and fitness equipment, built with a mobile-first approach and modular architecture.

## 🎯 Features

- **Mobile-First Design**: Optimized for mobile devices, tablets, and desktops
- **Modular Architecture**: Organized CSS and JavaScript components for easy maintenance
- **Responsive Grid System**: Adapts from 2 columns (mobile) to 4 columns (desktop)
- **Accessibility**: WCAG compliant with semantic HTML
- **Performance Optimized**: Minimal CSS and efficient JavaScript
- **Product Showcase**: Display products with ratings, prices, and discount badges
- **Category Navigation**: Easy-to-use category filtering
- **Favorites System**: Add/remove products from favorites
- **Interactive Components**: Smooth animations and transitions

## 📁 Project Structure

```
ironzone/
├── index.html                 # Main HTML file
├── styles/
│   ├── main.css              # Base & global styles (variables, typography)
│   ├── header.css            # Header component styles
│   ├── hero.css              # Hero section component styles
│   ├── categories.css        # Categories component styles
│   ├── products.css          # Products component styles
│   └── responsive.css        # Media queries for responsive design
├── js/
│   ├── main.js               # Main JavaScript file with all components
│   └── modules/              # JavaScript modules (for future modularization)
│       ├── header.js         # Header module
│       ├── products.js       # Products module
│       └── categories.js     # Categories module
├── images/                   # Product and asset images
│   ├── boxing-gloves.jpg
│   ├── pro-style-gloves.jpg
│   ├── heavy-bag.jpg
│   ├── hand-wraps.jpg
│   └── training-gloves.jpg
└── README.md                 # Project documentation
```

## 📱 Responsive Breakpoints

- **Mobile**: Base styles (0px - 639px)
- **Tablet**: 640px and up
- **Medium**: 768px and up
- **Large**: 1024px and up
- **Extra Large**: 1200px and up

### Grid Columns by Breakpoint

| Breakpoint | Products | Categories | Bundles |
|-----------|----------|-----------|---------|
| Mobile    | 2        | 3         | 2       |
| Tablet    | 2        | 3         | 2       |
| Medium    | 2        | 3         | 2       |
| Large     | 3        | 3         | 3       |
| XL        | 4        | 3         | 4       |

## 🎨 Design System

### Color Palette

```css
--color-primary: #ff3333       /* Red - Primary action color */
--color-dark: #1a1a1a          /* Dark background */
--color-dark-secondary: #2a2a2a /* Secondary dark */
--color-light: #f5f5f5         /* Light text */
--color-text: #ffffff          /* White text */
--color-text-muted: #999999    /* Muted gray text */
--color-border: #404040        /* Border color */
```

### Typography

- **Font Family**: System fonts (Segoe UI, Roboto, etc.)
- **Font Sizes**:
  - Base: 14px
  - Small: 12px
  - Medium: 16px
  - Large: 20px
  - XL: 24px
  - 2XL: 28px

### Spacing Scale

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## 🧩 Component Overview

### Header Component
- Sticky header with logo
- Mobile menu button
- Cart button with badge
- Responsive layout

### Hero Section
- Large promotional banner
- Product image
- Call-to-action button
- Flexible layout (stacks on mobile)

### Categories Component
- 3-column grid
- Hover effects
- Icon + name display
- Click handlers for filtering

### Products Component
- Responsive grid (2-4 columns)
- Product image with hover zoom
- Discount badge
- Favorite button
- Rating display
- Price display

## 🚀 Getting Started

1. **Clone or Download** the project
2. **Add Images** to the `images/` folder
3. **Open `index.html`** in your browser
4. **Start customizing** colors and content

## 🔧 Customization

### Change Brand Color

Edit `styles/main.css`:
```css
--color-primary: #ff3333;  /* Change this to your color */
```

### Modify Grid Layout

Edit `styles/responsive.css` breakpoints to adjust columns and spacing.

### Add New Products

Edit `index.html` and duplicate the product-card element:
```html
<article class="product-card">
    <!-- Product content -->
</article>
```

## ✨ JavaScript Features

### Favorite System
```javascript
// Click favorite button to toggle
// Automatically updates UI and logs action
```

### Category Filtering
```javascript
// Click category card to filter products
// Sets active state and filters display
```

### Header Navigation
```javascript
// Menu button triggers mobile navigation
// Cart button opens cart functionality
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- High contrast text
- Touch-friendly button sizes (44x44px minimum)

## 🔄 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Product filtering and search
- [ ] User authentication
- [ ] Product detail pages
- [ ] Wishlist functionality
- [ ] Payment integration
- [ ] Order tracking
- [ ] Customer reviews

## 📝 Code Style

- BEM (Block Element Modifier) naming convention for CSS
- Meaningful variable names
- Comprehensive comments
- Mobile-first approach
- Modular organization

## 📄 License

This project is free to use and modify for personal and commercial projects.

## 👨‍💻 Development Notes

### CSS Organization

All CSS is modular and organized by component:
- **main.css**: Global styles and CSS variables
- **header.css**: Header-specific styles
- **hero.css**: Hero section styles
- **categories.css**: Category cards
- **products.css**: Product cards and bundles
- **responsive.css**: All media queries

### JavaScript Organization

JavaScript is organized by component functionality in a single file for simplicity, with modules available for future scaling:
- Header interactions
- Product favorites
- Category filtering

Each function is documented with JSDoc comments.

## 🤝 Contributing

To improve this project:
1. Optimize images
2. Add more product categories
3. Enhance animations
4. Improve accessibility
5. Add dark/light theme toggle

---

Built with ❤️ for IRONZONE