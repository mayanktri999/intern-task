/* ============================================
   PRODUCT-DETAIL.JS - Product Detail Page
   ============================================ */

let currentProduct = null;
let quantity = 1;

/**
 * Initialize Product Detail Page
 */
function initProductDetailPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('No product ID provided');
        window.location.href = 'index.html';
        return;
    }

    // Load product data
    currentProduct = getProductById(productId);
    if (!currentProduct) {
        console.error('Product not found');
        window.location.href = 'index.html';
        return;
    }

    // Populate product details
    populateProductDetails();

    // Load related products
    loadRelatedProducts();

    // Initialize event listeners
    initEventListeners();

    console.log('Product detail page loaded:', currentProduct.name);
}

/**
 * Populate Product Details
 */
function populateProductDetails() {
    // Update breadcrumb
    const categoryName = PRODUCTS_DATA[currentProduct.category].name;
    document.getElementById('categoryBreadcrumb').textContent = categoryName;
    document.getElementById('categoryBreadcrumb').href = `products.html?category=${currentProduct.category}`;
    document.getElementById('productBreadcrumb').textContent = currentProduct.name;

    // Update product info
    document.getElementById('brand').textContent = currentProduct.brand;
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('currentPrice').textContent = `₹${currentProduct.price.toLocaleString('en-IN')}`;
    document.getElementById('originalPrice').textContent = `₹${currentProduct.originalPrice.toLocaleString('en-IN')}`;
    document.getElementById('description').textContent = currentProduct.description;
    document.getElementById('rating').textContent = currentProduct.rating;
    document.getElementById('reviewCount').textContent = currentProduct.reviews;
    document.getElementById('type').textContent = currentProduct.type;
    document.getElementById('category').textContent = PRODUCTS_DATA[currentProduct.category].name;
    document.getElementById('discountPercent').textContent = currentProduct.discount;
    document.getElementById('discountBadge').textContent = `-${currentProduct.discount}%`;

    // Update star rating
    const starCount = Math.floor(currentProduct.rating);
    const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
    document.getElementById('stars').textContent = stars;
}

/**
 * Load Related Products
 */
function loadRelatedProducts() {
    const products = PRODUCTS_DATA[currentProduct.category].products;
    const relatedProducts = products
        .filter(p => p.id !== currentProduct.id && p.type === currentProduct.type)
        .slice(0, 4);

    const grid = document.getElementById('relatedGrid');
    grid.innerHTML = '';

    if (relatedProducts.length === 0) {
        grid.innerHTML = '<p style="color: var(--color-text-muted); grid-column: 1/-1; text-align: center;">No related products found</p>';
        return;
    }

    relatedProducts.forEach(product => {
        const card = createRelatedProductCard(product);
        grid.appendChild(card);
    });
}

/**
 * Create Related Product Card
 */
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.style.cursor = 'pointer';

    const starRating = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

    card.innerHTML = `
        <div class="product-card__image" style="aspect-ratio: 1; background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); display: flex; align-items: center; justify-content: center; color: #666; border-radius: var(--radius-lg); position: relative; overflow: hidden;">
            <div style="width: 100%; height: 100%;">[${product.type}]</div>
            <div style="position: absolute; top: var(--spacing-sm); left: var(--spacing-sm); background-color: var(--color-primary); color: white; padding: var(--spacing-xs) var(--spacing-md); border-radius: var(--radius-md); font-weight: 700; font-size: var(--font-size-sm);">-${product.discount}%</div>
        </div>
        <div class="product-card__body" style="padding: var(--spacing-md);">
            <div class="product-card__brand" style="font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: var(--spacing-xs);">${product.brand}</div>
            <div class="product-card__name" style="font-size: var(--font-size-sm); font-weight: 700; color: var(--color-text); margin-bottom: var(--spacing-sm); line-height: 1.3;">${product.name}</div>
            <div style="display: flex; gap: var(--spacing-xs); margin-bottom: var(--spacing-sm); font-size: var(--font-size-xs);">
                <span style="color: #ff9800;">${starRating}</span>
                <span style="color: var(--color-text-muted);">(${product.reviews})</span>
            </div>
            <div style="display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
                <span style="font-size: var(--font-size-lg); font-weight: 700; color: var(--color-primary);">₹${product.price.toLocaleString('en-IN')}</span>
                <span style="font-size: var(--font-size-sm); color: var(--color-text-muted); text-decoration: line-through;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${product.id}`;
    });

    return card;
}

/**
 * Initialize Event Listeners
 */
function initEventListeners() {
    // Quantity controls
    const quantityInput = document.getElementById('quantityInput');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const value = parseInt(quantityInput.value) || 1;
            if (value > 1) {
                quantityInput.value = value - 1;
                quantity = value - 1;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const value = parseInt(quantityInput.value) || 1;
            if (value < 10) {
                quantityInput.value = value + 1;
                quantity = value + 1;
            }
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 1;
            if (value < 1) value = 1;
            if (value > 10) value = 10;
            e.target.value = value;
            quantity = value;
        });
    }

    // Size/Weight options
    const sizeOptions = document.querySelectorAll('[data-size]');
    sizeOptions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            sizeOptions.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected size:', this.dataset.size);
        });
    });

    // Color options
    const colorOptions = document.querySelectorAll('[data-color]');
    colorOptions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            colorOptions.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected color:', this.dataset.color);
        });
    });

    // Favorite button
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            favoriteBtn.classList.toggle('active');
            console.log('Added to favorites:', currentProduct.name);
        });
    }

    // Add to cart button
    const addCartBtn = document.getElementById('addCartBtn');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('[data-size].active')?.dataset.size || 'Standard';
            const selectedColor = document.querySelector('[data-color].active')?.dataset.color || 'Red';
            addToCart(currentProduct, quantity, { size: selectedSize, color: selectedColor });
        });
    }

    // Buy now button (if exists)
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('[data-size].active')?.dataset.size || 'Standard';
            const selectedColor = document.querySelector('[data-color].active')?.dataset.color || 'Red';
            addToCart(currentProduct, quantity, { size: selectedSize, color: selectedColor });
            window.location.href = 'cart.html';
        });
    }
}

/**
 * Add Product to Cart
 */
function addToCart(product, qty, options = {}) {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];

    // Create unique cart item ID based on product ID and options
    const itemId = `${product.id}-${options.size || 'default'}-${options.color || 'default'}`;

    // Check if product with same options already exists
    const existingProduct = cart.find(item => {
        const existingItemId = `${item.id}-${item.options?.size || 'default'}-${item.options?.color || 'default'}`;
        return existingItemId === itemId;
    });

    if (existingProduct) {
        existingProduct.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty,
            options: options
        });
    }

    // Save cart to localStorage
    localStorage.setItem('ironzone_cart', JSON.stringify(cart));

    // Show confirmation toast
    showCartNotification(`${product.name} (Qty: ${qty}) added to bag!`);
    console.log('Added to cart:', product.name, 'Quantity:', qty, 'Options:', options);
}

/**
 * Show Cart Notification
 */
function showCartNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff3333, #ff5555);
        color: white;
        padding: 16px 20px;
        border-radius: 10px;
        z-index: 9999;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(255, 51, 51, 0.3);
        animation: slideUp 0.4s ease-out;
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s ease-in forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initProductDetailPage);

// Expose functions globally
window.addToCart = addToCart;