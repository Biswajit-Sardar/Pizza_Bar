// Main page functionality
document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularPizzas();
    initializeSlider();
    initializeAuth();
});

async function loadPopularPizzas() {
    const grid = document.getElementById('popularPizzas');
    if (!grid) return;

    try {
        const result = await api.getPizzas({ popular: true, limit: 4 });
        const pizzas = result.data.filter(p => p.popular).slice(0, 4);

        grid.innerHTML = pizzas.map(pizza => createPizzaCard(pizza)).join('');
    } catch (error) {
        console.error('Error loading pizzas:', error);
        // Fallback to sample data
        const popularPizzas = SAMPLE_PIZZAS.filter(p => p.popular).slice(0, 4);
        grid.innerHTML = popularPizzas.map(pizza => createPizzaCard(pizza)).join('');
    }
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
                <p class="pizza-description">${pizza.description.substring(0, 80)}...</p>
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

function navigateToPizza(id) {
    window.location.href = `product.html?id=${id}`;
}

async function quickAddToCart(pizzaId) {
    const result = await api.getPizzaById(pizzaId);
    if (result.success) {
        cart.addItem(result.data, 'medium', 1);
    }
}

// Slider functionality
let currentSlide = 0;
const totalSlides = 5;

function initializeSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
}

function updateSlider() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
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
            showUserMenu();
        } else {
            showAuthModal();
        }
    });
}

function showAuthModal() {
    let modal = document.getElementById('authModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'authModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Sign In</h2>
                <button class="modal-close" onclick="closeAuthModal()">&times;</button>
            </div>
            <form onsubmit="handleLogin(event)" style="padding: 1rem 0;">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                    <input type="email" id="loginEmail" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
                    <input type="password" id="loginPassword" required style="width: 100%; padding: 0.8rem; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem;">
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
                    Sign In
                </button>
                <p style="text-align: center; margin-top: 1rem; color: var(--text-light);">
                    Demo credentials: demo@pizzabar.com / password123
                </p>
            </form>
        </div>
    `;

    modal.classList.add('active');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Demo login
    if (email === 'demo@pizzabar.com' && password === 'password123') {
        const user = {
            id: 1,
            name: 'Demo User',
            email: email
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', 'demo-token-12345');

        closeAuthModal();
        location.reload();
    } else {
        alert('Invalid credentials. Use demo@pizzabar.com / password123');
    }
}

function showUserMenu() {
    alert('User menu - Logout functionality');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    location.reload();
}
