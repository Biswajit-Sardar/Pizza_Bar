// Home Page Logic
document.addEventListener('DOMContentLoaded', async () => {
    await loadHomePizzas();
    setupFilters();
    setupSearch();
});

let allPizzas = [];
let filteredPizzas = [];

async function loadHomePizzas() {
    const pizzaGrid = document.getElementById('homePizzaGrid');
    if (!pizzaGrid) return;

    try {
        pizzaGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><br>Loading delicious pizzas...</div>';

        // Fetch pizzas from API
        allPizzas = await apiRequest(API_ENDPOINTS.PIZZAS);
        filteredPizzas = allPizzas;

        if (allPizzas.length === 0) {
            pizzaGrid.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--text-secondary);">No pizzas available at the moment.</p>';
            return;
        }

        // Display first 8 pizzas on home page
        displayPizzas(allPizzas.slice(0, 8));
    } catch (error) {
        console.error('Error loading pizzas:', error);
        pizzaGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--primary-red);">
                <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 1rem;"></i>
                <p>Failed to load pizzas. Please try again later.</p>
            </div>
        `;
    }
}

function displayPizzas(pizzas) {
    const pizzaGrid = document.getElementById('homePizzaGrid');
    if (!pizzaGrid) return;

    if (pizzas.length === 0) {
        pizzaGrid.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1/-1;">No pizzas found matching your criteria.</p>';
        return;
    }

    pizzaGrid.innerHTML = pizzas.map(pizza => createPizzaCardHTML(pizza)).join('');

    // Add click listeners to cards
    pizzaGrid.querySelectorAll('.pizza-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-add-cart')) {
                const pizzaId = card.dataset.pizzaId;
                window.location.href = `pizza-detail.html?id=${pizzaId}`;
            }
        });
    });

    // Add listeners to Add buttons
    pizzaGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pizzaId = btn.dataset.pizzaId;
            const pizza = allPizzas.find(p => p._id === pizzaId);
            if (pizza && pizza.sizes && pizza.sizes.length > 0) {
                // Add smallest size by default
                const smallestSize = pizza.sizes.reduce((min, size) =>
                    size.price < min.price ? size : min
                , pizza.sizes[0]);

                cartManager.addToCart(pizza, smallestSize.size, 1);
            }
        });
    });
}

function createPizzaCardHTML(pizza) {
    const lowestPrice = pizza.sizes && pizza.sizes.length > 0
        ? Math.min(...pizza.sizes.map(s => s.price))
        : 0;

    const badge = pizza.rating >= 4.5 ? 'Popular' : pizza.isNew ? 'New' : '';

    return `
        <div class="pizza-card" data-pizza-id="${pizza._id}">
            <div class="pizza-image-container">
                <img src="${pizza.image}" alt="${pizza.name}" class="pizza-image">
                ${badge ? `<div class="pizza-badge">${badge}</div>` : ''}
            </div>
            <div class="pizza-card-body">
                <h3 class="pizza-name">${pizza.name}</h3>
                <div class="pizza-rating">
                    <i class="fas fa-star"></i>
                    <span>${pizza.rating ? pizza.rating.toFixed(1) : '4.0'}</span>
                    <span class="rating-text">(${pizza.reviewCount || 0})</span>
                </div>
                <p class="pizza-description">${pizza.description}</p>
                <div class="pizza-ingredients">
                    ${pizza.ingredients && pizza.ingredients.length > 0
                        ? pizza.ingredients.slice(0, 3).map(ing => `
                            <span class="ingredient-tag">${ing.name}</span>
                        `).join('')
                        : ''}
                    ${pizza.ingredients && pizza.ingredients.length > 3
                        ? `<span class="ingredient-tag">+${pizza.ingredients.length - 3} more</span>`
                        : ''}
                </div>
                <div class="pizza-footer">
                    <div class="pizza-price">
                        <span class="price-label">From</span>
                        <span class="price-amount">${formatCurrency(lowestPrice)}</span>
                    </div>
                    <button class="btn-add-cart" data-pizza-id="${pizza._id}">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function setupFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Filter pizzas
            const category = chip.dataset.category;
            if (category === 'all') {
                filteredPizzas = allPizzas;
            } else {
                filteredPizzas = allPizzas.filter(pizza => {
                    if (category === 'vegetarian') return pizza.category === 'vegetarian';
                    if (category === 'classic') return pizza.category === 'classic' || pizza.rating >= 4.5;
                    if (category === 'specialty') return pizza.category === 'specialty';
                    if (category === 'spicy') return pizza.category === 'spicy' || pizza.name.toLowerCase().includes('spicy');
                    if (category === 'seafood') return pizza.category === 'seafood';
                    return true;
                });
            }

            displayPizzas(filteredPizzas.slice(0, 8));
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('homeSearchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                displayPizzas(filteredPizzas.slice(0, 8));
                return;
            }

            const searchResults = filteredPizzas.filter(pizza =>
                pizza.name.toLowerCase().includes(searchTerm) ||
                pizza.description.toLowerCase().includes(searchTerm) ||
                (pizza.ingredients && pizza.ingredients.some(ing =>
                    ing.name.toLowerCase().includes(searchTerm)
                ))
            );

            displayPizzas(searchResults.slice(0, 8));
        });
    }
}
