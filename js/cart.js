/* ============================================
   CART.JS - Shopping Cart Page Interactivity
   ============================================ */

/**
 * Load and Display Cart Items
 */
function loadCartItems() {
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        cartContainer.appendChild(emptyCart);
        updateCartSummary(cart);
        return;
    }

    // Remove empty cart message
    emptyCart.style.display = 'none';

    // Clear container
    cartContainer.innerHTML = '';

    // Add cart items
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartContainer.appendChild(cartItemElement);
    });

    // Update summary
    updateCartSummary(cart);
}

/**
 * Create Cart Item Element
 */
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.productId = item.id;

    const itemTotal = item.price * item.quantity;

    cartItem.innerHTML = `
        <div class="cart-item__image">[${item.type}]</div>
        <div class="cart-item__content">
            <div class="cart-item__header">
                <div>
                    <div class="cart-item__brand">${item.brand}</div>
                    <div class="cart-item__name">${item.name}</div>
                </div>
                <button class="cart-item__remove" data-product-id="${item.id}">REMOVE</button>
            </div>
            <div class="cart-item__footer">
                <div>
                    <span class="cart-item__price">₹${item.price.toLocaleString('en-IN')}</span>
                    <span class="cart-item__original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div class="quantity-selector" data-product-id="${item.id}">
                    <button class="quantity-btn" data-action="decrease">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" data-product-id="${item.id}" min="1" max="10">
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <div class="item-total">₹${itemTotal.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `;

    // Add event listeners
    const removeBtn = cartItem.querySelector('.cart-item__remove');
    removeBtn.addEventListener('click', () => {
        removeFromCart(item.id);
    });

    const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
    const increaseBtn = cartItem.querySelector('[data-action="increase"]');
    const quantityInput = cartItem.querySelector('.quantity-input');

    decreaseBtn.addEventListener('click', () => {
        const newQty = parseInt(quantityInput.value) - 1;
        if (newQty > 0) {
            updateQuantity(item.id, newQty);
        }
    });

    increaseBtn.addEventListener('click', () => {
        const newQty = parseInt(quantityInput.value) + 1;
        if (newQty <= 10) {
            updateQuantity(item.id, newQty);
        }
    });

    quantityInput.addEventListener('change', (e) => {
        let newQty = parseInt(e.target.value) || 1;
        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;
        updateQuantity(item.id, newQty);
    });

    return cartItem;
}

/**
 * Remove Item from Cart
 */
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('ironzone_cart', JSON.stringify(cart));
    loadCartItems();
}

/**
 * Update Item Quantity
 */
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('ironzone_cart', JSON.stringify(cart));
        loadCartItems();
    }
}

/**
 * Update Cart Summary
 */
function updateCartSummary(cart) {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
        const itemPrice = item.price * item.quantity;
        subtotal += itemPrice;
        const discountAmount = (item.originalPrice - item.price) * item.quantity;
        totalDiscount += discountAmount;
    });

    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('discount').textContent = `-₹${totalDiscount.toLocaleString('en-IN')}`;
    document.getElementById('shipping').textContent = 'FREE';
    document.getElementById('total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

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
 * Initialize Cart Page
 */
function initCartPage() {
    loadCartItems();

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                showToastNotification('Your cart is empty!', 'error');
            }
        });
    }

    console.log('Cart page initialized');
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initCartPage);

// Expose functions globally
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;