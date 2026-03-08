/* ============================================
   PROFILE.JS - Profile Page Interactivity
   ============================================ */

/**
 * Initialize Profile Page
 */
function initProfilePage() {
    attachMenuEventListeners();
    initMobileMenuHeader();
}

/**
 * Attach Menu Item Event Listeners
 */
function attachMenuEventListeners() {
    // Edit Profile
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', handleEditProfile);
    }

    // My Orders
    const myOrderBtn = document.getElementById('myOrderBtn');
    if (myOrderBtn) {
        myOrderBtn.addEventListener('click', handleMyOrder);
    }

    // Delivery Addresses
    const addressesBtn = document.getElementById('addressesBtn');
    if (addressesBtn) {
        addressesBtn.addEventListener('click', handleAddresses);
    }

    // Payment Methods
    const paymentBtn = document.getElementById('paymentBtn');
    if (paymentBtn) {
        paymentBtn.addEventListener('click', handlePaymentMethods);
    }

    // Notifications
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', handleNotifications);
    }

    // Language
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', handleLanguage);
    }

    // Support
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', handleSupport);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogOut);
    }

    // Stat cards click
    const statCards = document.querySelectorAll('.profile-stats__card');
    statCards.forEach((card, index) => {
        card.addEventListener('click', () => handleStatCardClick(card, index));
    });
}

/**
 * Handle Edit Profile
 */
function handleEditProfile(e) {
    e.preventDefault();
    showNotification('Edit Profile feature coming soon!', 'info');
    console.log('Edit Profile clicked');
    // Future: Open edit profile modal or navigate to edit page
    // showModal('editProfileModal');
    // window.location.href = 'edit-profile.html';
}

/**
 * Handle My Orders
 */
function handleMyOrder(e) {
    e.preventDefault();
    showNotification('Loading your orders...', 'loading');
    console.log('My Orders clicked');
    
    // Simulate loading and show orders
    setTimeout(() => {
        showNotification('You have 12 orders', 'success');
        // Future: window.location.href = 'orders.html';
    }, 500);
}

/**
 * Handle Delivery Addresses
 */
function handleAddresses(e) {
    e.preventDefault();
    showNotification('Loading your addresses...', 'loading');
    console.log('Delivery Addresses clicked');
    
    setTimeout(() => {
        showNotification('You have 2 saved addresses', 'success');
        // Future: window.location.href = 'addresses.html';
    }, 500);
}

/**
 * Handle Payment Methods
 */
function handlePaymentMethods(e) {
    e.preventDefault();
    showNotification('Loading payment methods...', 'loading');
    console.log('Payment Methods clicked');
    
    setTimeout(() => {
        showNotification('You have 3 payment methods', 'success');
        // Future: window.location.href = 'payment-methods.html';
    }, 500);
}

/**
 * Handle Notifications
 */
function handleNotifications(e) {
    e.preventDefault();
    showNotification('Loading notification settings...', 'loading');
    console.log('Notifications clicked');
    
    setTimeout(() => {
        showNotification('Notifications enabled', 'success');
        // Future: window.location.href = 'notifications.html';
    }, 500);
}

/**
 * Handle Language
 */
function handleLanguage(e) {
    e.preventDefault();
    showNotification('Current language: English', 'info');
    console.log('Language clicked');
    // Future: Show language selector modal
    // showLanguageSelector();
}

/**
 * Handle Support
 */
function handleSupport(e) {
    e.preventDefault();
    showNotification('Opening support chat...', 'info');
    console.log('Support clicked');
    
    // Future: Open chat widget or support page
    // window.open('https://support.ironzone.com', '_blank');
    // showChatWidget();
}

/**
 * Handle Log Out
 */
function handleLogOut(e) {
    e.preventDefault();
    
    // Confirm logout
    if (confirm('Are you sure you want to log out?')) {
        showNotification('Logging out...', 'loading');
        
        // Clear user data
        localStorage.removeItem('user');
        localStorage.removeItem('ironzone_cart');
        
        // Simulate logout delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }
}

/**
 * Handle Stat Card Click
 */
function handleStatCardClick(card, index) {
    const label = card.querySelector('.profile-stats__label')?.textContent || 'Stat';
    const value = card.querySelector('.profile-stats__value')?.textContent || '0';
    
    console.log(`Clicked stat: ${label} (${value})`);
    
    // Show notification
    showNotification(`You have ${value} ${label.toLowerCase()}`, 'success');
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

/**
 * Show Notification Toast
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    
    // Set styles based on type
    let bgColor = '#2563eb'; // blue for info
    if (type === 'success') bgColor = '#22c55e'; // green
    if (type === 'error') bgColor = '#ef4444'; // red
    if (type === 'loading') bgColor = '#ff3333'; // orange
    
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 16px;
        right: 16px;
        background: ${bgColor};
        color: white;
        padding: 14px 16px;
        border-radius: 10px;
        z-index: 9999;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s ease-out;
        text-align: center;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds (unless loading)
    if (type !== 'loading') {
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.4s ease-in forwards';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
}

/**
 * Initialize Mobile Menu (Header)
 */
function initMobileMenuHeader() {
    const hamburgerBtn = document.querySelector('.header__menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('menuOverlay');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
    const cartBtn = document.querySelector('.header__cart-btn');

    if (!hamburgerBtn || !mobileMenu) return;

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Close menu when overlay is clicked
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    }

    // Close menu when menu item is clicked
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // Cart button
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
} else {
    initProfilePage();
}

// Expose functions globally
window.showNotification = showNotification;
