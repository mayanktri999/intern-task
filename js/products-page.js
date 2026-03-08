/* ============================================
   PRODUCTS-PAGE.JS - Products Page Interactivity
   ============================================ */

let currentCategory = 'boxing';
let currentFilter = 'all';
let displayedProducts = 8;

/**
 * Show Toast Notification
 */
function showToastNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    // Styling
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '4px',
        zIndex: '9999',
        fontSize: '14px',
        color: 'white',
        animation: 'slideInUp 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800',
        loading: '#9c27b0'
    };
    
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Initialize Products Page
 */
function initProductsPage() {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get('category') || 'boxing';

    // Update page title - only if elements exist
    const categoryInfo = PRODUCTS_DATA[currentCategory];
    const pageTitle = document.getElementById('pageTitle');
    const categoryName = document.getElementById('categoryName');
    
    if (pageTitle && categoryInfo) {
        pageTitle.textContent = categoryInfo.name;
    }
    if (categoryName && categoryInfo) {
        categoryName.textContent = categoryInfo.name;
    }

    // Initialize category tabs
    initCategoryTabs();

    // Load and display products
    loadProducts();

    // Initialize event listeners
    initEventListeners();

    console.log('Products page initialized for category:', currentCategory);
}

/**
 * Initialize Category Tabs
 */
function initCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    
    // Guard check: if PRODUCTS_DATA doesn't exist or category not found, skip
    if (!PRODUCTS_DATA || !PRODUCTS_DATA[currentCategory]) {
        console.warn('Products data not available for category:', currentCategory);
        return;
    }
    
    const products = PRODUCTS_DATA[currentCategory].products;
    const types = ['all', ...new Set(products.map(p => p.type))];

    // Clear existing tabs
    if (tabsContainer) {
        tabsContainer.innerHTML = '';
    } else {
        return;
    }

    types.forEach(type => {
        const tab = document.createElement('button');
        tab.className = 'category-tab';
        if (type === 'all') {
            tab.textContent = 'All';
            tab.classList.add('active');
        } else {
            tab.textContent = type;
        }
        tab.dataset.filter = type;

        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update filter and reload products
            currentFilter = type === 'all' ? 'all' : type;
            displayedProducts = 8;
            loadProducts();
        });

        tabsContainer.appendChild(tab);
    });
}

/**
 * Load and Display Products
 */
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    
    // Guard check: if grid doesn't exist or products data unavailable, skip
    if (!grid || !PRODUCTS_DATA || !PRODUCTS_DATA[currentCategory]) {
        return;
    }
    
    let products = PRODUCTS_DATA[currentCategory].products;

    // Filter by type if needed
    if (currentFilter !== 'all') {
        products = products.filter(p => p.type === currentFilter);
    }

    // Update product count
    const productCountEl = document.getElementById('productCount');
    if (productCountEl) {
        productCountEl.textContent = `${products.length} products`;
    }

    // Display only the first 'displayedProducts' items
    const visibleProducts = products.slice(0, displayedProducts);

    // Clear grid
    grid.innerHTML = '';

    // Add products to grid
    visibleProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (displayedProducts >= products.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

/**
 * Create Product Card Element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const starRating = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

    // Check if image is a full URL or a filename
    const imageSrc = product.image.startsWith('http') ? product.image : `images/${product.image}`;

    card.innerHTML = `
        <div class="product-card__image">
            <img src="${imageSrc}" alt="${product.name}" class="product-card__img">
            <div class="product-card__discount">-${product.discount}%</div>
            <button class="product-card__favorite" data-product-id="${product.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="product-card__body">
            <div class="product-card__brand">${product.brand}</div>
            <div class="product-card__name">${product.name}</div>
            <div class="product-card__rating">
                <span class="product-card__stars">${starRating}</span>
                <span class="product-card__reviews">(${product.reviews})</span>
            </div>
            <div class="product-card__price">
                <span class="product-card__current-price">₹${product.price.toLocaleString('en-IN')}</span>
                <span class="product-card__original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button class="product-card__add-btn" data-product-id="${product.id}">ADD TO CART</button>
        </div>
    `;

    // Add click listener to favorite button
    const favoriteBtn = card.querySelector('.product-card__favorite');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        favoriteBtn.classList.toggle('active');
    });

    // Add click listener to add to cart button
    const addBtn = card.querySelector('.product-card__add-btn');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });

    // Add click listener to card to open product detail
    card.addEventListener('click', () => {
        openProductDetail(product.id, imageSrc);
    });

    return card;
}

/**
 * Add Product to Cart
 */
function addToCart(product) {
    console.log('Added to cart:', product.name);
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    
    // Check if product already exists
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('ironzone_cart', JSON.stringify(cart));
    
    // Update cart badge
    if (window.updateCartBadge) {
        window.updateCartBadge();
    }
    
    // Show toast notification instead of alert
    showToastNotification(`${product.name} added to cart!`, 'success');
}

/**
 * Open Product Detail Page
 */
function openProductDetail(productId, imageSrc) {
    const encodedImage = encodeURIComponent(imageSrc);
    window.location.href = `product-detail.html?id=${productId}&image=${encodedImage}`;
}

/**
 * Initialize Event Listeners
 */
function initEventListeners() {
    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedProducts += 4;
            loadProducts();
            // Scroll to products smoothly
            document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Sort Select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            console.log('Sorting by:', e.target.value);
            // Implement sorting logic
        });
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initProductsPage);

// Expose functions globally
window.addToCart = addToCart;
window.openProductDetail = openProductDetail;