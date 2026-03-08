/* ============================================
   CATEGORY.JS - Category Page Interactivity
   ============================================ */

// Toggle Category Expansion
function toggleCategory(categoryElement) {
    const toggle = categoryElement.querySelector('.category-card__toggle');
    const subcategories = categoryElement.querySelector('.category-card__subcategories');

    if (!subcategories) return;

    // Toggle active state
    subcategories.classList.toggle('active');
    toggle.classList.toggle('active');

    // Animation
    if (subcategories.classList.contains('active')) {
        subcategories.style.maxHeight = subcategories.scrollHeight + 'px';
    } else {
        subcategories.style.maxHeight = '0';
    }
}

// Navigate to Products Page
function navigateToProducts(categoryId) {
    // Map category IDs to product category names
    const categoryMap = {
        'boxingCategory': 'boxing',
        'gymCategory': 'gym',
        'calisthenicsCategory': 'calisthenics'
    };
    
    const productCategory = categoryMap[categoryId] || 'boxing';
    window.location.href = `products.html?category=${productCategory}`;
}

// Initialize Category Toggles
function initializeCategoryToggles() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach((card) => {
        const header = card.querySelector('.category-card__header');
        const toggle = card.querySelector('.category-card__toggle');

        if (header && toggle) {
            // Click on header expands/collapses category
            header.addEventListener('click', () => {
                toggleCategory(card);
            });

            // Allow toggle button click to work independently
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCategory(card);
            });
        }
        
        // Add click listener to category card name to navigate to products
        const nameElement = card.querySelector('.category-card__name');
        if (nameElement) {
            nameElement.style.cursor = 'pointer';
            nameElement.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateToProducts(card.id);
            });
        }
    });
}

// Handle Subcategory Click
function handleSubcategoryClick(btn, categoryId) {
    // Get all subcategory buttons in this category
    const buttons = btn.parentElement.querySelectorAll('.subcategory-btn');

    // Remove active state from all buttons
    buttons.forEach((b) => b.classList.remove('active'));

    // Add active state to clicked button
    btn.classList.add('active');

    // You can add filtering logic here
    filterByCategory(categoryId, btn.textContent);
}

// Filter Products by Category
function filterByCategory(categoryId, categoryName) {
    console.log(`Navigating to products: ${categoryName} (${categoryId})`);
    
    // Map category IDs to product category names
    const categoryMap = {
        'boxingCategory': 'boxing',
        'gymCategory': 'gym',
        'calisthenicsCategory': 'calisthenics'
    };
    
    const productCategory = categoryMap[categoryId] || 'boxing';
    window.location.href = `products.html?category=${productCategory}`;
}

// Initialize Subcategory Buttons
function initializeSubcategoryButtons() {
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');

    subcategoryButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const categoryCard = btn.closest('.category-card');
            const categoryId = categoryCard.id;
            handleSubcategoryClick(btn, categoryId);
        });
    });
}

// Handle More Category Items Click
function handleCategoryItemClick(item) {
    const categoryId = item.id;
    const categoryName = item.querySelector('.category-item__name').textContent;

    console.log(`Navigating to: ${categoryName} (${categoryId})`);

    // Map more category IDs to product category names
    const categoryMap = {
        'apparelCategory': 'boxing',  // Map to boxing as fallback
        'supplementsCategory': 'gym',
        'accessoriesCategory': 'gym',
        'recoveryCategory': 'calisthenics'
    };
    
    const productCategory = categoryMap[categoryId] || 'boxing';
    window.location.href = `products.html?category=${productCategory}`;
}

// Initialize More Category Items
function initializeMoreCategoryItems() {
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach((item) => {
        const header = item.querySelector('.category-item__header');
        const arrow = item.querySelector('.category-item__arrow');

        if (header) {
            header.addEventListener('click', () => {
                handleCategoryItemClick(item);
            });
        }

        if (arrow) {
            arrow.addEventListener('click', (e) => {
                e.stopPropagation();
                handleCategoryItemClick(item);
            });
        }
    });
}

// Handle Filter Button Click
function handleFilterClick() {
    const filterBtn = document.querySelector('.filter-btn');

    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            console.log('Opening filter options');
            // You can add filter modal or drawer here
        });
    }
}

// Initialize Page
function initCategoryPage() {
    // Initialize all interactive elements
    initializeCategoryToggles();
    initializeSubcategoryButtons();
    initializeMoreCategoryItems();
    handleFilterClick();

    console.log('Category page initialized');
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initCategoryPage);

// Also expose functions globally if needed
window.toggleCategory = toggleCategory;
window.handleSubcategoryClick = handleSubcategoryClick;
window.initCategoryPage = initCategoryPage;