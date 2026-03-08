/* ============================================
   PRODUCTS.JS - Products Module
   ============================================ */

/**
 * Initialize Products Component
 */
export function initProducts() {
    const favoriteButtons = document.querySelectorAll('.product-card__favorite');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', handleFavoriteClick);
    });
}

/**
 * Handle Favorite Button Click
 * @param {Event} e - Click event
 */
function handleFavoriteClick(e) {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.toggle('active');

    // Get product info
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
 * Add product to cart
 * @param {string} productId - Product identifier
 * @param {number} quantity - Product quantity
 */
export function addToCart(productId, quantity = 1) {
    console.log(`Added ${quantity} of product ${productId} to cart`);
    // Implement cart logic here
}

/**
 * Get all products
 * @returns {Array} Array of product data
 */
export function getProducts() {
    const products = [];
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const product = {
            name: card.querySelector('.product-card__name')?.textContent,
            brand: card.querySelector('.product-card__brand')?.textContent,
            price: card.querySelector('.product-card__price')?.textContent,
            rating: card.querySelector('.product-card__reviews')?.textContent,
        };
        products.push(product);
    });

    return products;
}
