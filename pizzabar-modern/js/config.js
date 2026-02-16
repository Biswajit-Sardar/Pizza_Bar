// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
    GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
    FACEBOOK_AUTH: `${API_BASE_URL}/auth/facebook`,

    // Pizzas
    PIZZAS: `${API_BASE_URL}/pizzas`,
    PIZZA_DETAIL: (id) => `${API_BASE_URL}/pizzas/${id}`,
    INGREDIENTS: `${API_BASE_URL}/pizzas/ingredients`,

    // Orders
    ORDERS: `${API_BASE_URL}/orders`,
    ORDER_DETAIL: (id) => `${API_BASE_URL}/orders/${id}`,
};

// Storage Keys
const STORAGE_KEYS = {
    TOKEN: 'pizzabar_token',
    USER: 'pizzabar_user',
    CART: 'pizzabar_cart',
    THEME: 'pizzabar_theme'
};

// Helper Functions
const getAuthToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN);

const getUserData = () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
};

const setAuthData = (token, user) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};

const isAuthenticated = () => {
    return !!getAuthToken();
};

// API Request Helper
const apiRequest = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Format currency to INR
const formatCurrency = (amount) => {
    return `₹${Math.round(amount)}`;
};
