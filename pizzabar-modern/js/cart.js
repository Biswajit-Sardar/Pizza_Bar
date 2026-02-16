// Cart Manager
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.cartBtn = document.getElementById('cartBtn');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartItems = document.getElementById('cartItems');
        this.checkoutBtn = document.getElementById('checkoutBtn');

        this.deliveryFee = 50;
        this.taxRate = 0.05;

        this.init();
    }

    init() {
        this.updateCartCount();

        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.showCart());
        }

        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Sidebar close
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.hideCart());
        }
    }

    loadCart() {
        const cartData = localStorage.getItem(STORAGE_KEYS.CART);
        return cartData ? JSON.parse(cartData) : [];
    }

    saveCart() {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.cart));
        this.updateCartCount();
    }

    addToCart(pizza, size, quantity = 1) {
        const sizeInfo = pizza.sizes.find(s => s.size === size);
        if (!sizeInfo) return;

        const cartItem = {
            pizzaId: pizza._id,
            name: pizza.name,
            image: pizza.image,
            size: size,
            price: sizeInfo.price,
            quantity: quantity
        };

        // Check if item already exists
        const existingIndex = this.cart.findIndex(
            item => item.pizzaId === pizza._id && item.size === size
        );

        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += quantity;
        } else {
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.showNotification('Added to cart!');
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.renderCart();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(index);
            return;
        }

        this.cart[index].quantity = quantity;
        this.saveCart();
        this.renderCart();
    }

    getCartTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax + (this.cart.length > 0 ? this.deliveryFee : 0);

        return {
            subtotal,
            tax,
            deliveryFee: this.cart.length > 0 ? this.deliveryFee : 0,
            total
        };
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartBadge) {
            this.cartBadge.textContent = count;
        }
    }

    showCart() {
        this.renderCart();
        if (this.cartSidebar) {
            this.cartSidebar.classList.add('show');
        }
    }

    hideCart() {
        if (this.cartSidebar) {
            this.cartSidebar.classList.remove('show');
        }
    }

    renderCart() {
        if (!this.cartItems) return;

        if (this.cart.length === 0) {
            this.cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
            this.updateCartSummary({ subtotal: 0, tax: 0, deliveryFee: 0, total: 0 });
            return;
        }

        this.cartItems.innerHTML = this.cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>৳${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="cartManager.removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `).join('');

        this.updateCartSummary(this.getCartTotal());
    }

    updateCartSummary(totals) {
        const subtotalEl = document.getElementById('cartSubtotal');
        const taxEl = document.getElementById('cartTax');
        const deliveryEl = document.getElementById('cartDelivery');
        const totalEl = document.getElementById('cartTotal');

        if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
        if (taxEl) taxEl.textContent = formatCurrency(totals.tax);
        if (deliveryEl) deliveryEl.textContent = formatCurrency(totals.deliveryFee);
        if (totalEl) totalEl.textContent = formatCurrency(totals.total);
    }

    async checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        if (!isAuthenticated()) {
            alert('Please sign in to place an order');
            this.hideCart();
            authManager.showSignInModal();
            return;
        }

        // For demo purposes, show a simple checkout
        const address = prompt('Enter your delivery address:');
        const phone = prompt('Enter your phone number:');

        if (!address || !phone) {
            alert('Address and phone number are required');
            return;
        }

        const totals = this.getCartTotal();

        const orderData = {
            items: this.cart.map(item => ({
                pizza: item.pizzaId,
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price
            })),
            subtotal: totals.subtotal,
            tax: totals.tax,
            deliveryFee: totals.deliveryFee,
            total: totals.total,
            deliveryAddress: {
                street: address,
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1000',
                country: 'Bangladesh'
            },
            contactPhone: phone,
            paymentMethod: 'cash'
        };

        try {
            const order = await apiRequest(API_ENDPOINTS.ORDERS, {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            alert(`Order placed successfully! Order Number: ${order.orderNumber}`);
            this.cart = [];
            this.saveCart();
            this.hideCart();
        } catch (error) {
            alert('Failed to place order: ' + error.message);
        }
    }

    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.renderCart();
    }
}

// Initialize cart manager
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
});
