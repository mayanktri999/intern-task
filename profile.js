/* =====================================================
   PROFILE PAGE JAVASCRIPT - ENHANCED INTERACTIVITY
   ===================================================== */

// Initialize profile page on load
document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
    initMobileMenu();
});

// Initialize all profile functionality
function initProfilePage() {
    attachEventListeners();
    addPageLoadAnimations();
}

// Attach all button event listeners
function attachEventListeners() {
    // Profile card button
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', handleEditProfile);
        addButtonRipple(editBtn);
    }

    // Menu items
    const myOrderBtn = document.getElementById('myOrderBtn');
    if (myOrderBtn) {
        myOrderBtn.addEventListener('click', handleMyOrder);
        addButtonRipple(myOrderBtn);
    }

    const addressesBtn = document.getElementById('addressesBtn');
    if (addressesBtn) {
        addressesBtn.addEventListener('click', handleAddresses);
        addButtonRipple(addressesBtn);
    }

    const paymentBtn = document.getElementById('paymentBtn');
    if (paymentBtn) {
        paymentBtn.addEventListener('click', handlePaymentMethods);
        addButtonRipple(paymentBtn);
    }

    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', handleNotifications);
        addButtonRipple(notificationsBtn);
    }

    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', handleLanguage);
        addButtonRipple(languageBtn);
    }

    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', handleSupport);
        addButtonRipple(supportBtn);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogOut);
        addButtonRipple(logoutBtn);
    }

    // Stat cards click handlers
    const statCards = document.querySelectorAll('.profile-stats__card');
    statCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            handleStatCardClick(this, index);
        });
    });
}

// Add ripple effect to buttons on click
function addButtonRipple(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Add ripple animation
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.innerHTML = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Page load animations
function addPageLoadAnimations() {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        // Subtle pulse on load
        profileCard.style.animation = 'none';
        setTimeout(() => {
            profileCard.style.animation = 'slideUp 0.6s ease-out 0.1s both';
        }, 10);
    }
}

// Stat card click handler with animation
function handleStatCardClick(card, index) {
    // Add active state
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);

    // Show toast notification
    const label = card.querySelector('.profile-stats__label')?.textContent || 'Item';
    const value = card.querySelector('.profile-stats__value')?.textContent || '0';
    showToast(`You have ${value} ${label.toLowerCase()}`);

    console.log(`Clicked stat: ${label} (${value})`);
}

// Edit profile handler
function handleEditProfile() {
    showToast('Edit Profile feature coming soon!');
    console.log('Edit Profile clicked');
    // Future: Open edit profile modal/page
    // window.location.href = '/edit-profile.html';
}

// My Orders handler
function handleMyOrder() {
    showToast('Loading your orders...');
    console.log('My Orders clicked');
    // Future: Navigate to orders page
    // window.location.href = '/orders.html';
}

// Delivery Addresses handler
function handleAddresses() {
    showToast('Loading delivery addresses...');
    console.log('Delivery Addresses clicked');
    // Future: Navigate to addresses page
    // window.location.href = '/addresses.html';
}

// Payment Methods handler
function handlePaymentMethods() {
    showToast('Loading payment methods...');
    console.log('Payment Methods clicked');
    // Future: Navigate to payment methods page
    // window.location.href = '/payment-methods.html';
}

// Notifications handler
function handleNotifications() {
    showToast('Loading notifications settings...');
    console.log('Notifications clicked');
    // Future: Navigate to notifications page
    // window.location.href = '/notifications.html';
}

// Language handler
function handleLanguage() {
    showToast('Language: English (Default)');
    console.log('Language clicked');
    // Future: Show language selector
}

// Support handler
function handleSupport() {
    showToast('Opening support chat...');
    console.log('Support clicked');
    // Future: Open chat support or help page
}

// Logout handler
function handleLogOut() {
    // Create logout animation
    const profilePage = document.querySelector('.profile-page');
    if (profilePage) {
        profilePage.style.opacity = '1';
        profilePage.style.animation = 'fadeOut 0.4s ease-in forwards';
    }

    setTimeout(() => {
        // Clear any stored data
        localStorage.removeItem('cart');
        localStorage.removeItem('user');
        
        // Redirect to home or login page
        window.location.href = 'index.html';
    }, 400);
}

// Toast notification helper
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 16px;
        right: 16px;
        background: linear-gradient(135deg, #ff3333, #ff5555);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(255, 51, 51, 0.3);
        z-index: 1000;
        animation: slideUp 0.4s ease-out;
        text-align: center;
        letter-spacing: 0.3px;
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.4s ease-in forwards';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Add fade out animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .toast-notification {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Mobile menu initialization (from main.js)
function initMobileMenu() {
    const hamburgerBtn = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');

    if (!hamburgerBtn || !mobileMenu) return;

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Close menu when overlay is clicked
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    // Close menu when menu item is clicked
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('active');
        }
    });
}

// Add hover effects for better feedback
document.addEventListener('DOMContentLoaded', function() {
    // Add visual feedback for all interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add active state feedback
    const menuItems = document.querySelectorAll('.profile-menu__item');
    menuItems.forEach(item => {
        item.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        item.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Log page initialization
console.log('Profile page initialized with enhanced interactivity');
