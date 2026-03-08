/* ============================================
   CATEGORIES.JS - Categories Module
   ============================================ */

/**
 * Initialize Categories Component
 */
export function initCategories() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
}

/**
 * Handle Category Card Click
 * @param {Event} e - Click event
 */
function handleCategoryClick(e) {
    const category = e.currentTarget;
    const categoryName = category.querySelector('.category-card__name')?.textContent || 'Unknown';

    console.log(`Selected category: ${categoryName}`);
    
    // Add active state
    document.querySelectorAll('.category-card').forEach(c => {
        c.classList.remove('active');
    });
    category.classList.add('active');

    // Trigger category filter or navigation
    filterProductsByCategory(categoryName);
}

/**
 * Filter products by category
 * @param {string} categoryName - Category name
 */
function filterProductsByCategory(categoryName) {
    console.log(`Filtering products by: ${categoryName}`);
    // Implement product filtering logic here
}

/**
 * Get all categories
 * @returns {Array} Array of category data
 */
export function getCategories() {
    const categories = [];
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        const category = {
            name: card.querySelector('.category-card__name')?.textContent,
            icon: card.querySelector('.category-card__icon'),
        };
        categories.push(category);
    });

    return categories;
}
