// Menu page functionality
let allPizzas = [];
let filteredPizzas = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllPizzas();
    initializeFilters();
    initializeSearch();
    initializeSort();
    initializeAuth();
});

async function loadAllPizzas() {
    try {
        const result = await api.getPizzas();
        allPizzas = result.data;
        filteredPizzas = [...allPizzas];
        renderPizzas();
    } catch (error) {
        console.error('Error loading pizzas:', error);
        allPizzas = SAMPLE_PIZZAS;
        filteredPizzas = [...allPizzas];
        renderPizzas();
    }
}

function renderPizzas() {
    const grid = document.getElementById('menuGrid');
    const countEl = document.getElementById('pizzaCount');

    if (!grid) return;

    if (filteredPizzas.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">No pizzas found matching your criteria</p>';
        countEl.textContent = 'Showing 0';
        return;
    }

    grid.innerHTML = filteredPizzas.map(pizza => createPizzaCard(pizza)).join('');
    countEl.textContent = `Showing ${filteredPizzas.length}`;
}

function createPizzaCard(pizza) {
    const basePrice = pizza.prices.small;
    const hasMoreIngredients = pizza.moreIngredients > 0;

    return `
        <div class="pizza-card" onclick="navigateToPizza(${pizza.id})">
            <div class="pizza-image">
                <img src="${pizza.image}" alt="${pizza.name}">
                ${pizza.popular ? '<span class="pizza-badge">Popular</span>' : ''}
                ${pizza.new ? '<span class="pizza-badge new">New</span>' : ''}
            </div>
            <div class="pizza-info">
                <div class="pizza-header">
                    <h3 class="pizza-name">${pizza.name}</h3>
                    <div class="pizza-rating">
                        <span class="star">★</span>
                        <span class="rating-text">${pizza.rating} (${pizza.reviewCount})</span>
                    </div>
                </div>
                <p class="pizza-category">${pizza.category}</p>
                <p class="pizza-description">${pizza.description.substring(0, 100)}...</p>
                <div class="pizza-ingredients">
                    ${pizza.ingredients.slice(0, 3).map(ing =>
                        `<span class="ingredient-tag">${ing}</span>`
                    ).join('')}
                    ${hasMoreIngredients ? `<span class="more-ingredients">+${pizza.moreIngredients} more</span>` : ''}
                </div>
                <div class="pizza-footer">
                    <div class="pizza-price">
                        <span>From</span>
                        <span class="price-amount">${APP_CONSTANTS.CURRENCY}${basePrice}</span>
                    </div>
                    <button class="btn-add-cart" onclick="event.stopPropagation(); quickAddToCart(${pizza.id})">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initializeFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active from all
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            chip.classList.add('active');

            const category = chip.dataset.category;
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    if (category === 'all') {
        filteredPizzas = [...allPizzas];
    } else {
        filteredPizzas = allPizzas.filter(pizza =>
            pizza.category.toLowerCase() === category.toLowerCase()
        );
    }

    applyCurrentSort();
    renderPizzas();
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            if (query === '') {
                filteredPizzas = [...allPizzas];
            } else {
                filteredPizzas = allPizzas.filter(pizza => {
                    return pizza.name.toLowerCase().includes(query) ||
                           pizza.description.toLowerCase().includes(query) ||
                           pizza.ingredients.some(ing => ing.toLowerCase().includes(query));
                });
            }

            applyCurrentSort();
            renderPizzas();
        });
    }
}

function initializeSort() {
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            applyCurrentSort();
            renderPizzas();
        });
    }
}

function applyCurrentSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    const sortValue = sortSelect.value;

    switch (sortValue) {
        case 'popular':
            filteredPizzas.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        case 'price-low':
            filteredPizzas.sort((a, b) => a.prices.small - b.prices.small);
            break;
        case 'price-high':
            filteredPizzas.sort((a, b) => b.prices.small - a.prices.small);
            break;
        case 'rating':
            filteredPizzas.sort((a, b) => b.rating - a.rating);
            break;
    }
}

function navigateToPizza(id) {
    window.location.href = `product.html?id=${id}`;
}

async function quickAddToCart(pizzaId) {
    const pizza = allPizzas.find(p => p.id === pizzaId);
    if (pizza) {
        cart.addItem(pizza, 'medium', 1);
    }
}

// Auth functionality
function initializeAuth() {
    const signinBtn = document.getElementById('signinBtn');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user) {
        signinBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 10c-3.866 0-7 2.239-7 5v1h14v-1c0-2.761-3.134-5-7-5z"/>
            </svg>
            ${user.name}
        `;
    }

    signinBtn.addEventListener('click', () => {
        if (user) {
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('user');
                localStorage.removeItem('authToken');
                location.reload();
            }
        } else {
            window.location.href = 'index.html';
        }
    });
}
