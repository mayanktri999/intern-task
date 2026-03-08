/* ============================================
   CHECKOUT.JS - Checkout Page Interactivity
   ============================================ */

let checkoutData = {
    shipping: {},
    payment: {},
    orderItems: []
};

/**
 * Initialize Checkout Page
 */
function initCheckout() {
    loadCartItems();
    attachCheckoutEventListeners();
    populateOrderReview();
}

/**
 * Load cart items from localStorage
 */
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('ironzone_cart')) || [];
    checkoutData.orderItems = cart;
    populateOrderReview();
}

/**
 * Attach Event Listeners
 */
function attachCheckoutEventListeners() {
    // Back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Step navigation
    const nextStep1 = document.getElementById('nextStep1');
    if (nextStep1) {
        nextStep1.addEventListener('click', validateAndGoToStep2);
    }

    const nextStep2 = document.getElementById('nextStep2');
    if (nextStep2) {
        nextStep2.addEventListener('click', validateAndGoToStep3);
    }

    const backStep2 = document.getElementById('backStep2');
    if (backStep2) {
        backStep2.addEventListener('click', () => goToStep(1));
    }

    const backStep3 = document.getElementById('backStep3');
    if (backStep3) {
        backStep3.addEventListener('click', () => goToStep(2));
    }

    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });

    // Place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', formatExpiryDate);
    }

    // CVV validation
    const cardCVV = document.getElementById('cardCVV');
    if (cardCVV) {
        cardCVV.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

/**
 * Validate Shipping and Go to Step 2
 */
function validateAndGoToStep2() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();

    if (!fullName || !email || !phone || !address || !city || !state || !postalCode) {
        showToastNotification('Please fill all shipping details', 'error');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToastNotification('Please enter a valid email', 'error');
        return;
    }

    // Save shipping data
    checkoutData.shipping = {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        postalCode
    };

    goToStep(2);
}

/**
 * Validate Payment and Go to Step 3
 */
function validateAndGoToStep3() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    checkoutData.payment = { method: paymentMethod };

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();

        if (!cardNumber || !cardExpiry || !cardCVV) {
            showToastNotification('Please fill all card details', 'error');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            showToastNotification('Card number must be 16 digits', 'error');
            return;
        }

        if (cardExpiry.length !== 5 || !cardExpiry.includes('/')) {
            showToastNotification('Expiry date format: MM/YY', 'error');
            return;
        }

        if (cardCVV.length !== 3) {
            showToastNotification('CVV must be 3 digits', 'error');
            return;
        }

        checkoutData.payment.cardNumber = cardNumber;
        checkoutData.payment.cardExpiry = cardExpiry;
        checkoutData.payment.cardCVV = cardCVV;
    }

    goToStep(3);
}

/**
 * Go to Step
 */
function goToStep(step) {
    // Hide all sections
    document.querySelectorAll('.checkout-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const sectionId = ['shippingSection', 'paymentSection', 'confirmSection'][step - 1];
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update steps
    document.querySelectorAll('.checkout-steps__step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index < step - 1) {
            stepEl.classList.add('completed');
        } else if (index === step - 1) {
            stepEl.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Handle Payment Method Change
 */
function handlePaymentMethodChange(e) {
    const method = e.target.value;
    const cardDetails = document.getElementById('cardDetails');
    const codDetails = document.getElementById('codDetails');

    if (method === 'card') {
        cardDetails.classList.remove('hidden');
        codDetails.classList.add('hidden');
    } else {
        cardDetails.classList.add('hidden');
        codDetails.classList.remove('hidden');
    }
}

/**
 * Format Card Number (with spaces)
 */
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/[^0-9]/g, '');
    value = value.substring(0, 16);
    
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += value[i];
    }
    
    e.target.value = formatted;
}

/**
 * Format Expiry Date (MM/YY)
 */
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value;
}

/**
 * Populate Order Review
 */
function populateOrderReview() {
    const orderItemsList = document.getElementById('orderItemsList');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderGrandTotal = document.getElementById('orderGrandTotal');
    const shippingSummary = document.getElementById('shippingSummary');
    const paymentSummary = document.getElementById('paymentSummary');

    if (!orderItemsList) return;

    // Clear list
    orderItemsList.innerHTML = '';

    let subtotal = 0;

    // Populate items
    checkoutData.orderItems.forEach(item => {
        subtotal += (item.price || 0) * (item.quantity || 1);

        const itemEl = document.createElement('div');
        itemEl.className = 'order-item';
        itemEl.innerHTML = `
            <div class="order-item__info">
                <div class="order-item__name">${item.name || 'Product'}</div>
                <div class="order-item__details">
                    ${item.options ? `${item.options.size || ''} ${item.options.color || ''}`.trim() : ''}
                </div>
            </div>
            <div class="order-item__price">
                <div>₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</div>
                <div class="order-item__qty">Qty: ${item.quantity || 1}</div>
            </div>
        `;
        orderItemsList.appendChild(itemEl);
    });

    // Update totals
    if (orderSubtotal) orderSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (orderShipping) orderShipping.textContent = 'FREE';
    if (orderGrandTotal) orderGrandTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // Update shipping summary
    if (shippingSummary && checkoutData.shipping.fullName) {
        shippingSummary.innerHTML = `
            ${checkoutData.shipping.fullName}<br>
            ${checkoutData.shipping.address}<br>
            ${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.postalCode}<br>
            📱 ${checkoutData.shipping.phone}
        `;
    }

    // Update payment summary
    if (paymentSummary) {
        const method = checkoutData.payment.method || 'Not selected';
        const methodLabel = method === 'card' ? '💳 Card' : '💵 Cash on Delivery';
        paymentSummary.textContent = methodLabel;
    }
}

/**
 * Place Order
 */
function placeOrder() {
    showToastNotification('Processing your order...', 'loading');

    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        localStorage.setItem('ironzone_cart', JSON.stringify([]));

        // Generate order ID
        const orderId = '#' + Math.floor(100000 + Math.random() * 900000);

        // Save order data
        localStorage.setItem('lastOrderId', orderId);
        localStorage.setItem('lastOrderTotal', document.getElementById('orderGrandTotal').textContent);

        // Redirect to confirmation
        window.location.href = 'confirmation.html';
    }, 1500);
}

/**
 * Show Toast Notification
 */
function showToastNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

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

    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800',
        loading: '#9c27b0'
    };

    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    if (type !== 'loading') {
        setTimeout(() => {
            toast.style.animation = 'slideOutDown 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
} else {
    initCheckout();
}
