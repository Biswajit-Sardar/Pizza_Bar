// API Service Layer
class APIService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API Request failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Pizza endpoints
    async getPizzas(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams
            ? `${API_CONFIG.ENDPOINTS.PIZZAS}?${queryParams}`
            : API_CONFIG.ENDPOINTS.PIZZAS;

        const result = await this.request(endpoint);

        // Fallback to sample data if API fails
        if (!result.success) {
            console.warn('Using sample pizza data');
            return { success: true, data: SAMPLE_PIZZAS };
        }

        return result;
    }

    async getPizzaById(id) {
        const result = await this.request(`${API_CONFIG.ENDPOINTS.PIZZAS}/${id}`);

        // Fallback to sample data
        if (!result.success) {
            const pizza = SAMPLE_PIZZAS.find(p => p.id == id);
            return pizza ? { success: true, data: pizza } : result;
        }

        return result;
    }

    // Category endpoints
    async getCategories() {
        return this.request(API_CONFIG.ENDPOINTS.CATEGORIES);
    }

    // Order endpoints
    async createOrder(orderData) {
        return this.request(API_CONFIG.ENDPOINTS.ORDERS, {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    async getOrders() {
        return this.request(API_CONFIG.ENDPOINTS.ORDERS);
    }

    async getOrderById(id) {
        return this.request(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
    }

    // Auth endpoints
    async login(credentials) {
        return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async register(userData) {
        return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/register`, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return { success: true };
    }

    // Review endpoints
    async getReviews(pizzaId) {
        return this.request(`${API_CONFIG.ENDPOINTS.REVIEWS}?pizzaId=${pizzaId}`);
    }

    async createReview(reviewData) {
        return this.request(API_CONFIG.ENDPOINTS.REVIEWS, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }
}

// Initialize API service
const api = new APIService(API_CONFIG.BASE_URL);
