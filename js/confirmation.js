/* ============================================
   CONFIRMATION.JS - Order Confirmation Page
   ============================================ */

/**
 * Initialize Confirmation Page
 */
function initConfirmation() {
    populateOrderDetails();
    attachConfirmationEventListeners();
}

/**
 * Populate Order Details
 */
function populateOrderDetails() {
    const orderId = localStorage.getItem('lastOrderId') || '#' + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = localStorage.getItem('lastOrderTotal') || '₹0';

    // Generate delivery date (5-7 business days from now)
    const deliveryDate = getDeliveryDate();

    document.getElementById('orderNumber').textContent = orderId;
    document.getElementById('deliveryDate').textContent = deliveryDate;
    document.getElementById('totalAmount').textContent = orderTotal;
}

/**
 * Calculate Delivery Date
 */
function getDeliveryDate() {
    const today = new Date();
    const minDays = 5;
    const maxDays = 7;
    const deliveryDate = new Date(today.getTime() + (minDays + Math.random() * (maxDays - minDays)) * 24 * 60 * 60 * 1000);
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return deliveryDate.toLocaleDateString('en-IN', options);
}

/**
 * Attach Event Listeners
 */
function attachConfirmationEventListeners() {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const trackOrderBtn = document.getElementById('trackOrderBtn');
    if (trackOrderBtn) {
        trackOrderBtn.addEventListener('click', () => {
            showToastNotification('Order tracking coming soon!', 'info');
        });
    }
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

    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfirmation);
} else {
    initConfirmation();
}
