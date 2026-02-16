// Cart Management
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartUI();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(pizza, size = 'medium', quantity = 1) {
        const existingItem = this.items.find(
            item => item.id === pizza.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: pizza.id,
                name: pizza.name,
                size: size,
                price: pizza.prices[size],
                quantity: quantity,
                image: pizza.image
            });
        }

        this.saveCart();
        this.showNotification(`${pizza.name} added to cart!`);
    }

    removeItem(id, size) {
        this.items = this.items.filter(
            item => !(item.id === id && item.size === size)
        );
        this.saveCart();
    }

    updateQuantity(id, size, quantity) {
        const item = this.items.find(
            item => item.id === id && item.size === size
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(id, size);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartUI() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        const count = this.getItemCount();

        cartCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'block' : 'none';
        });
    }

    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart
const cart = new Cart();

// Add cart button handler
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showCartModal();
        });
    }
});

function showCartModal() {
    // Create modal
    let modal = document.getElementById('cartModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cartModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    const total = cart.getTotal();
    const deliveryCharge = total >= APP_CONSTANTS.MIN_ORDER_AMOUNT ? APP_CONSTANTS.DELIVERY_CHARGE : 0;
    const grandTotal = total + deliveryCharge;

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Your Cart</h2>
                <button class="modal-close" onclick="closeCartModal()">&times;</button>
            </div>
            <div class="cart-items">
                ${cart.items.length === 0 ? '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Your cart is empty</p>' : ''}
                ${cart.items.map(item => `
                    <div class="cart-item" style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-color);">
                        <div style="width: 80px; height: 80px; border-radius: 8px; overflow: hidden;">
                            <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${item.name}">
                        </div>
                        <div style="flex: 1;">
                            <h4>${item.name}</h4>
                            <p style="color: var(--text-light); font-size: 0.9rem;">Size: ${item.size}</p>
                            <p style="color: var(--primary-color); font-weight: 600;">${APP_CONSTANTS.CURRENCY}${item.price}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button onclick="cart.updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1}); showCartModal();" style="width: 30px; height: 30px; border: 1px solid var(--border-color); background: white; border-radius: 4px; cursor: pointer;">-</button>
                            <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                            <button onclick="cart.updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1}); showCartModal();" style="width: 30px; height: 30px; border: 1px solid var(--border-color); background: white; border-radius: 4px; cursor: pointer;">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${cart.items.length > 0 ? `
                <div style="padding: 1rem; border-top: 2px solid var(--border-color);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Subtotal:</span>
                        <span>${APP_CONSTANTS.CURRENCY}${total}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: var(--text-light); font-size: 0.9rem;">
                        <span>Delivery Charge:</span>
                        <span>${deliveryCharge > 0 ? APP_CONSTANTS.CURRENCY + deliveryCharge : 'FREE'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <span>Total:</span>
                        <span style="color: var(--primary-color);">${APP_CONSTANTS.CURRENCY}${grandTotal}</span>
                    </div>
                    ${total < APP_CONSTANTS.MIN_ORDER_AMOUNT ? `
                        <p style="color: var(--warning-color); font-size: 0.85rem; margin-top: 1rem;">
                            Add ${APP_CONSTANTS.CURRENCY}${APP_CONSTANTS.MIN_ORDER_AMOUNT - total} more to meet minimum order amount
                        </p>
                    ` : ''}
                    <button onclick="proceedToCheckout()" class="btn-primary" style="width: 100%; margin-top: 1rem; justify-content: center;">
                        Proceed to Checkout
                    </button>
                </div>
            ` : ''}
        </div>
    `;

    modal.classList.add('active');
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function proceedToCheckout() {
    const total = cart.getTotal();
    if (total < APP_CONSTANTS.MIN_ORDER_AMOUNT) {
        alert(`Minimum order amount is ${APP_CONSTANTS.CURRENCY}${APP_CONSTANTS.MIN_ORDER_AMOUNT}`);
        return;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
        alert('Please sign in to place an order');
        closeCartModal();
        // Trigger sign in
        document.getElementById('signinBtn')?.click();
        return;
    }

    alert('Checkout functionality will be implemented in the full version!');
    // Navigate to checkout page
    // window.location.href = 'checkout.html';
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
