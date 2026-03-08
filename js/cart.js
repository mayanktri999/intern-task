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
        if (emptyCart) {
            cartContainer.appendChild(emptyCart);
        } else {
            cartContainer.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><p>Add items to get started</p></div>';
        }
        updateCartSummary(cart);
        return;
    }

    // Remove empty cart message
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }

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
    
    // Create unique identifier for this item variant (includes options)
    const itemUniqueId = `${item.id}-${item.options?.size || 'default'}-${item.options?.color || 'default'}`;
    cartItem.dataset.itemId = itemUniqueId;

    const itemTotal = item.price * item.quantity;
    
    // Get product image URL
    const imageSrc = item.image && item.image.startsWith('http') ? item.image : (item.image ? `images/${item.image}` : '');
    
    // Display options if they exist
    const optionsDisplay = item.options ? `<div class="cart-item__options" style="font-size: 12px; color: #666; margin-top: 4px;">Size: ${item.options.size || 'N/A'} | Color: ${item.options.color || 'N/A'}</div>` : '';

    cartItem.innerHTML = `
        <div class="cart-item__image">
            ${imageSrc ? `<img src="${imageSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">` : `<div style="display: flex; align-items: center; justify-content: center; height: 100%;">[${item.type}]</div>`}
        </div>
        <div class="cart-item__content">
            <div class="cart-item__header">
                <div>
                    <div class="cart-item__brand">${item.brand}</div>
                    <div class="cart-item__name">${item.name}</div>
                    ${optionsDisplay}
                </div>
                <button class="cart-item__remove" data-item-id="${itemUniqueId}">REMOVE</button>
            </div>
            <div class="cart-item__footer">
                <div>
                    <span class="cart-item__price">₹${item.price.toLocaleString('en-IN')}</span>
                    <span class="cart-item__original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div class="quantity-selector" data-item-id="${itemUniqueId}">
                    <button class="quantity-btn" data-action="decrease">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" data-item-id="${itemUniqueId}" min="1" max="10">
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <div class="item-total">₹${itemTotal.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `;

    // Add event listeners
    const removeBtn = cartItem.querySelector('.cart-item__remove');
    removeBtn.addEventListener('click', () => {
        removeFromCart(item.id, item.options);
    });

    const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
    const increaseBtn = cartItem.querySelector('[data-action="increase"]');
    const quantityInput = cartItem.querySelector('.quantity-input');

    decreaseBtn.addEventListener('click', () => {
        const newQty = parseInt(quantityInput.value) - 1;
        if (newQty > 0) {
            updateQuantity(item.id, item.options, newQty);
        }
    });

    increaseBtn.addEventListener('click', () => {
        const newQty = parseInt(quantityInput.value) + 1;
        if (newQty <= 10) {
            updateQuantity(item.id, item.options, newQty);
        }
    });

    quantityInput.addEventListener('change', (e) => {
        let newQty = parseInt(e.target.value) || 1;
        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;
        updateQuantity(item.id, item.options, newQty);
    });

    return cartItem;
}

/**
 * Remove Item from Cart
 */
function removeFromCart(productId, options = {}) {
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    
    // Find and remove the specific item variant
    cart = cart.filter(item => {
        const itemId = `${item.id}-${item.options?.size || 'default'}-${item.options?.color || 'default'}`;
        const targetId = `${productId}-${options.size || 'default'}-${options.color || 'default'}`;
        return itemId !== targetId;
    });
    
    localStorage.setItem('ironzone_cart', JSON.stringify(cart));
    
    // Update cart badge
    if (window.updateCartBadge) {
        window.updateCartBadge();
    }
    
    loadCartItems();
}

/**
 * Update Item Quantity
 */
function updateQuantity(productId, options = {}, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    
    // Find the specific item variant
    const item = cart.find(p => {
        const itemId = `${p.id}-${p.options?.size || 'default'}-${p.options?.color || 'default'}`;
        const targetId = `${productId}-${options.size || 'default'}-${options.color || 'default'}`;
        return itemId === targetId;
    });
    
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('ironzone_cart', JSON.stringify(cart));
        
        // Update cart badge
        if (window.updateCartBadge) {
            window.updateCartBadge();
        }
        
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