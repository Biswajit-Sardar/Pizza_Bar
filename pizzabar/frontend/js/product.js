// Product detail page functionality
let currentPizza = null;
let selectedSize = 'medium';
let quantity = 1;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pizzaId = urlParams.get('id');

    if (pizzaId) {
        await loadPizzaDetail(pizzaId);
    } else {
        window.location.href = 'menu.html';
    }

    initializeAuth();
});

async function loadPizzaDetail(id) {
    try {
        const result = await api.getPizzaById(id);
        if (result.success) {
            currentPizza = result.data;
            renderProductDetail();
            renderReviews();
        } else {
            alert('Pizza not found');
            window.location.href = 'menu.html';
        }
    } catch (error) {
        console.error('Error loading pizza:', error);
        // Fallback to sample data
        currentPizza = SAMPLE_PIZZAS.find(p => p.id == id);
        if (currentPizza) {
            renderProductDetail();
            renderReviews();
        } else {
            window.location.href = 'menu.html';
        }
    }
}

function renderProductDetail() {
    const container = document.getElementById('productContainer');
    if (!container) return;

    const allIngredients = currentPizza.ingredients;

    container.innerHTML = `
        <div class="product-image-section">
            <div class="product-image-large">
                <img src="${currentPizza.image}" alt="${currentPizza.name}">
                ${currentPizza.popular ? '<span class="pizza-badge" style="position: absolute; top: 1rem; left: 1rem;">Popular</span>' : ''}
                ${currentPizza.new ? '<span class="pizza-badge new" style="position: absolute; top: 1rem; left: 1rem;">New</span>' : ''}
            </div>
        </div>

        <div class="product-details-section">
            <span class="product-category">${currentPizza.category}</span>
            <h1 class="product-title">${currentPizza.name}</h1>

            <div class="product-rating">
                <span class="stars">${'★'.repeat(Math.floor(currentPizza.rating))}${'☆'.repeat(5 - Math.floor(currentPizza.rating))}</span>
                <span class="rating-text">${currentPizza.rating} (${currentPizza.reviewCount} reviews)</span>
            </div>

            <p class="product-description">${currentPizza.description}</p>

            <div class="product-section">
                <h3>Ingredients</h3>
                <div class="pizza-ingredients">
                    ${allIngredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
                </div>
            </div>

            <div class="product-section">
                <h3>Choose Size</h3>
                <div class="size-options">
                    ${Object.entries(currentPizza.prices).map(([size, price]) => `
                        <div class="size-option ${size === selectedSize ? 'selected' : ''}" onclick="selectSize('${size}')">
                            <span class="size-name">${size.charAt(0).toUpperCase() + size.slice(1)} (${getSizeInches(size)})</span>
                            <span class="size-price">${APP_CONSTANTS.CURRENCY}${price}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="product-section">
                <h3>Quantity</h3>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="updateQuantity(-1)">−</button>
                    <span class="quantity-value" id="quantityValue">${quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                </div>
            </div>

            <div class="product-actions">
                <button class="btn-add-large" onclick="addToCart()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    </svg>
                    Add - ${APP_CONSTANTS.CURRENCY}${calculateTotal()}
                </button>
                <button class="btn-order" onclick="orderNow()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"/>
                    </svg>
                    Order
                </button>
            </div>

            <div class="delivery-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                <span>Estimated delivery: ${APP_CONSTANTS.DELIVERY_TIME}</span>
            </div>

            <p class="auth-note">Please sign in or create an account to place an order.</p>
        </div>
    `;
}

function getSizeInches(size) {
    const sizes = {
        small: '8"',
        medium: '12"',
        large: '16"'
    };
    return sizes[size] || '';
}

function selectSize(size) {
    selectedSize = size;
    renderProductDetail();
}

function updateQuantity(delta) {
    quantity = Math.max(1, quantity + delta);
    document.getElementById('quantityValue').textContent = quantity;
    updateAddButton();
}

function calculateTotal() {
    return currentPizza.prices[selectedSize] * quantity;
}

function updateAddButton() {
    const button = document.querySelector('.btn-add-large');
    if (button) {
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            Add - ${APP_CONSTANTS.CURRENCY}${calculateTotal()}
        `;
    }
}

function addToCart() {
    cart.addItem(currentPizza, selectedSize, quantity);
}

function orderNow() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
        alert('Please sign in to place an order');
        return;
    }

    addToCart();
    setTimeout(() => {
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) cartBtn.click();
    }, 500);
}

function renderReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const avgStarsEl = document.getElementById('avgStars');
    const avgRatingEl = document.getElementById('avgRating');
    const reviewCountEl = document.getElementById('reviewCount');
    const reviewPizzaNameEl = document.getElementById('reviewPizzaName');

    if (!reviewsList) return;

    // Sample reviews
    const sampleReviews = [
        {
            id: 1,
            userName: 'Rahul Sharma',
            rating: 5,
            date: '2026-01-15',
            comment: 'Absolutely delicious! The crust was perfect and toppings were fresh. Will order again!'
        },
        {
            id: 2,
            userName: 'Priya Patel',
            rating: 4.8,
            date: '2026-01-10',
            comment: 'Great pizza, fast delivery. Only minor issue was it could have been slightly hotter.'
        }
    ];

    avgStarsEl.innerHTML = '★'.repeat(Math.floor(currentPizza.rating)) + '☆'.repeat(5 - Math.floor(currentPizza.rating));
    avgRatingEl.textContent = currentPizza.rating;
    reviewCountEl.textContent = `${sampleReviews.length} reviews for`;
    reviewPizzaNameEl.textContent = currentPizza.name;

    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.userName}</h4>
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div class="pizza-rating">
                    <span class="stars">${'★'.repeat(Math.floor(review.rating))}${'☆'.repeat(5 - Math.floor(review.rating))}</span>
                    <span class="rating-text">${review.rating}</span>
                </div>
            </div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
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
