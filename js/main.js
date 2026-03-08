/* ============================================
   MAIN.JS - Main Application Entry Point
   ============================================ */

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuItems = document.querySelectorAll('.mobile-menu__item');

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });
}

/**
 * Initialize Header Component
 */
function initHeader() {
    const cartBtn = document.getElementById('cartBtn');

    if (cartBtn) {
        cartBtn.addEventListener('click', handleCartClick);
    }

    updateCartBadge();
    
    initMobileMenu();
}

/**
 * Update Cart Badge Count
 */
function updateCartBadge() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems > 0 ? totalItems : '0';
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * Handle Cart Button Click
 */
function handleCartClick(e) {
    e.preventDefault();
    console.log('Cart button clicked');
    window.location.href = 'cart.html';
}

/**
 * Initialize Products Component
 */
function initProducts() {
    const favoriteButtons = document.querySelectorAll('.product-card__favorite');
    const productCards = document.querySelectorAll('.product-card');

    // Favorite button functionality
    favoriteButtons.forEach(button => {
        button.addEventListener('click', handleFavoriteClick);
    });


    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.product-card__favorite')) {
                handleProductCardClick(card);
            }
        });
    });
}


function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const button = e.currentTarget;
    button.classList.toggle('active');

    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-card__name')?.textContent || 'Product';

    if (button.classList.contains('active')) {
        console.log(`Added to favorites: ${productName}`);
        button.style.color = 'var(--color-primary)';
        button.setAttribute('aria-pressed', 'true');
    } else {
        console.log(`Removed from favorites: ${productName}`);
        button.style.color = 'white';
        button.setAttribute('aria-pressed', 'false');
    }
}

/**
 * Handle Product Card Click - Navigate to Product Detail
 */
function handleProductCardClick(card) {
    const productName = card.querySelector('.product-card__name')?.textContent || 'Unknown';
    const brand = card.querySelector('.product-card__brand')?.textContent || 'Unknown';
    
    let productId = card.dataset.productId;
    
    // If no data attribute, search products database by brand + name
    if (!productId) {
        for (const category in PRODUCTS_DATA) {
            const product = PRODUCTS_DATA[category].products.find(
                p => p.brand.toUpperCase() === brand.toUpperCase() && 
                     p.name.toUpperCase() === productName.toUpperCase()
            );
            if (product) {
                productId = product.id;
                break;
            }
        }
    }
    
    // Fallback to generated ID if not found
    if (!productId) {
        productId = brand.toLowerCase().replace(/\s+/g, '-') + '-' + productName.toLowerCase().replace(/\s+/g, '-');
    }
    
    console.log(`Navigating to product: ${productName} (ID: ${productId})`);
    window.location.href = `product-detail.html?id=${productId}`;
}

/**
 * Initialize Bundles Carousel Component
 */
function initBundles() {
    const carousel = document.getElementById('bundlesCarousel');
    const prevBtn = document.getElementById('bundlesPrevBtn');
    const nextBtn = document.getElementById('bundlesNextBtn');

    if (!carousel) return;

    // Handle previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollCarousel(carousel, -1));
    }

    // Handle next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollCarousel(carousel, 1));
    }

    // Add click handlers to bundle VIEW buttons
    const bundleButtons = document.querySelectorAll('.bundle-card__btn');
    bundleButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const bundleName = btn.closest('.bundle-card')?.querySelector('.bundle-card__name')?.textContent || 'Bundle';
            showBundleNotification(`${bundleName} bundle selected! Features coming soon.`);
        });
    });

    // Update button states on scroll
    carousel.addEventListener('scroll', () => updateCarouselButtons(carousel, prevBtn, nextBtn));
    
    // Initial button state
    updateCarouselButtons(carousel, prevBtn, nextBtn);
}

/**
 * Show Bundle Notification
 */
function showBundleNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'bundle-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff3333, #ff5555);
        color: white;
        padding: 16px 20px;
        border-radius: 10px;
        z-index: 9999;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(255, 51, 51, 0.3);
        animation: slideUp 0.4s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s ease-in forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

/**
 * Scroll carousel by card width
 */
function scrollCarousel(carousel, direction) {
    const cardWidth = 320; // Approximate card width
    const scrollAmount = cardWidth + 24; // Card width + gap
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

/**
 * Update carousel button states
 */
function updateCarouselButtons(carousel, prevBtn, nextBtn) {
    if (!carousel || !prevBtn || !nextBtn) return;

    const isAtStart = carousel.scrollLeft <= 0;
    const isAtEnd = carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 10);

    // Update prev button
    if (isAtStart) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }

    // Update next button
    if (isAtEnd) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

/**
 * Initialize Categories Component
 */
function initCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    const shopNowBtn = document.getElementById('shopNowBtn');

    // Category card click - navigate to products page
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
        // Make card cursor pointer
        card.style.cursor = 'pointer';
    });

    // Shop Now button
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            console.log('Shop Now clicked');
            window.location.href = 'products.html?category=boxing';
        });
    }
}

/**
 * Handle Category Card Click
 */
function handleCategoryClick(e) {
    const category = e.currentTarget;
    const categoryName = category.querySelector('.category-card__name')?.textContent || 'Unknown';

    console.log(`Selected category: ${categoryName}`);
    
    // Navigate to products page with category filter
    const categoryMap = {
        'Boxing': 'boxing',
        'Gym': 'gym',
        'Cardio': 'calisthenics'
    };
    
    const categoryKey = categoryMap[categoryName] || categoryName.toLowerCase();
    window.location.href = `products.html?category=${categoryKey}`;
}

/**
 * Initialize Application
 */
function initApp() {
    console.log('IRONZONE App Initializing...');
    
    // Initialize all components
    initHeader();
    initProducts();
    initCategories();
    initBundles();
    
    console.log('IRONZONE App Ready');
}

// Run app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Expose functions globally
window.updateCartBadge = updateCartBadge;
