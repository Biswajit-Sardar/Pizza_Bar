// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    ENDPOINTS: {
        PIZZAS: '/pizzas',
        CATEGORIES: '/categories',
        ORDERS: '/orders',
        AUTH: '/auth',
        USERS: '/users',
        REVIEWS: '/reviews'
    }
};

// App Constants
const APP_CONSTANTS = {
    CURRENCY: '₹',
    DELIVERY_TIME: '25-35 minutes',
    MIN_ORDER_AMOUNT: 199,
    DELIVERY_CHARGE: 40
};

// Sample Pizza Data (fallback if API is not available)
const SAMPLE_PIZZAS = [
    {
        id: 1,
        name: 'Pepperoni',
        category: 'CLASSIC',
        description: 'Loaded with premium pepperoni that curls into crispy cups, layered over our signature tomato sauce and melted mozzarella cheese.',
        rating: 4.9,
        reviewCount: 312,
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'],
        prices: {
            small: 249,
            medium: 399,
            large: 549
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23f4a460" cx="200" cy="200" r="180"/><circle fill="%23d84315" cx="150" cy="120" r="25"/><circle fill="%23d84315" cx="250" cy="140" r="25"/><circle fill="%23d84315" cx="200" cy="200" r="25"/><circle fill="%23d84315" cx="130" cy="240" r="25"/><circle fill="%23d84315" cx="270" cy="250" r="25"/></svg>',
        popular: true
    },
    {
        id: 2,
        name: 'Meat Lovers',
        category: 'SPECIALTY',
        description: 'The ultimate meat feast with Italian sausage, crispy bacon, smoked ham, seasoned beef, and premium pepperoni.',
        rating: 4.8,
        reviewCount: 287,
        ingredients: ['Tomato Sauce', 'Sausage', 'Bacon'],
        moreIngredients: 3,
        prices: {
            small: 329,
            medium: 479,
            large: 629
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23d2691e" cx="200" cy="200" r="180"/><circle fill="%238b4513" cx="140" cy="130" r="20"/><circle fill="%23d84315" cx="240" cy="150" r="22"/><circle fill="%238b4513" cx="180" cy="220" r="20"/><circle fill="%23d84315" cx="260" cy="230" r="22"/></svg>',
        popular: true
    },
    {
        id: 3,
        name: 'Margherita',
        category: 'CLASSIC',
        description: 'The timeless classic with San Marzano tomato sauce, fresh mozzarella di bufala, and aromatic basil leaves.',
        rating: 4.8,
        reviewCount: 234,
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil'],
        moreIngredients: 1,
        prices: {
            small: 199,
            medium: 319,
            large: 449
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23ffcc80" cx="200" cy="200" r="180"/><circle fill="%23fff" cx="150" cy="150" r="30" opacity="0.9"/><circle fill="%23fff" cx="250" cy="170" r="30" opacity="0.9"/><circle fill="%23fff" cx="200" cy="250" r="30" opacity="0.9"/><path fill="%23228b22" d="M180,200 Q185,190 190,200 T200,200"/></svg>',
        popular: true
    },
    {
        id: 4,
        name: 'Hawaiian',
        category: 'SPECIALTY',
        description: 'A tropical twist with sweet pineapple chunks and savory ham pieces atop our cheese blend.',
        rating: 4.4,
        reviewCount: 198,
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham'],
        moreIngredients: 1,
        prices: {
            small: 229,
            medium: 369,
            large: 499
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23f4a460" cx="200" cy="200" r="180"/><circle fill="%23ffd700" cx="150" cy="140" r="25"/><circle fill="%23ff69b4" cx="250" cy="150" r="20"/><circle fill="%23ffd700" cx="200" cy="220" r="25"/><circle fill="%23ff69b4" cx="270" cy="240" r="20"/></svg>',
        popular: false
    },
    {
        id: 5,
        name: 'Veggie Supreme',
        category: 'VEGETARIAN',
        description: 'Garden fresh vegetables including bell peppers, mushrooms, onions, olives, and tomatoes on a bed of melted cheese.',
        rating: 4.6,
        reviewCount: 156,
        ingredients: ['Tomato Sauce', 'Bell Peppers', 'Mushrooms'],
        moreIngredients: 4,
        prices: {
            small: 219,
            medium: 349,
            large: 479
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23ffcc80" cx="200" cy="200" r="180"/><circle fill="%2332cd32" cx="160" cy="140" r="20"/><circle fill="%23ff0000" cx="240" cy="150" r="18"/><circle fill="%238b4513" cx="180" cy="220" r="20"/><circle fill="%23228b22" cx="260" cy="230" r="18"/></svg>',
        popular: true
    },
    {
        id: 6,
        name: 'BBQ Chicken',
        category: 'SPECIALTY',
        description: 'Tender grilled chicken with tangy BBQ sauce, red onions, cilantro, and a blend of mozzarella and cheddar cheese.',
        rating: 4.7,
        reviewCount: 223,
        ingredients: ['BBQ Sauce', 'Grilled Chicken', 'Red Onion'],
        moreIngredients: 2,
        prices: {
            small: 279,
            medium: 429,
            large: 569
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%238b4513" cx="200" cy="200" r="180"/><rect fill="%23daa520" x="140" y="130" width="40" height="30" rx="5"/><rect fill="%23daa520" x="220" y="150" width="40" height="30" rx="5"/><rect fill="%23daa520" x="170" y="220" width="40" height="30" rx="5"/></svg>',
        popular: true
    },
    {
        id: 7,
        name: 'Four Cheese',
        category: 'CLASSIC',
        description: 'A cheese lover\'s dream with mozzarella, parmesan, gorgonzola, and ricotta cheese.',
        rating: 4.5,
        reviewCount: 189,
        ingredients: ['Mozzarella', 'Parmesan', 'Gorgonzola'],
        moreIngredients: 1,
        prices: {
            small: 259,
            medium: 399,
            large: 529
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23fff8dc" cx="200" cy="200" r="180"/><circle fill="%23fff" cx="160" cy="160" r="35" opacity="0.8"/><circle fill="%23fffacd" cx="240" cy="160" r="35" opacity="0.8"/><circle fill="%23f0e68c" cx="160" cy="240" r="35" opacity="0.8"/><circle fill="%23fafad2" cx="240" cy="240" r="35" opacity="0.8"/></svg>',
        popular: false
    },
    {
        id: 8,
        name: 'Spicy Italian',
        category: 'SPICY',
        description: 'Hot Italian sausage, pepperoni, jalapeños, and crushed red pepper for those who like it spicy.',
        rating: 4.6,
        reviewCount: 167,
        ingredients: ['Tomato Sauce', 'Spicy Sausage', 'Jalapeños'],
        moreIngredients: 2,
        prices: {
            small: 269,
            medium: 419,
            large: 559
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23d84315" cx="200" cy="200" r="180"/><path fill="%2332cd32" d="M150,140 Q160,120 170,140 T190,140"/><circle fill="%23ff0000" cx="240" cy="150" r="20"/><path fill="%2332cd32" d="M170,220 Q180,200 190,220 T210,220"/></svg>',
        popular: false
    },
    {
        id: 9,
        name: 'Mediterranean',
        category: 'VEGETARIAN',
        description: 'Feta cheese, kalamata olives, sun-dried tomatoes, artichokes, and fresh spinach on olive oil base.',
        rating: 4.5,
        reviewCount: 134,
        ingredients: ['Olive Oil', 'Feta Cheese', 'Olives'],
        moreIngredients: 3,
        prices: {
            small: 249,
            medium: 389,
            large: 519
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23f5deb3" cx="200" cy="200" r="180"/><circle fill="%23000" cx="150" cy="140" r="12"/><circle fill="%23fff" cx="200" cy="160" r="25" opacity="0.7"/><circle fill="%23228b22" cx="250" cy="180" r="18"/><circle fill="%23000" cx="180" cy="240" r="12"/></svg>',
        popular: false
    },
    {
        id: 10,
        name: 'Seafood Delight',
        category: 'SEAFOOD',
        description: 'Shrimp, calamari, and crab meat with garlic butter sauce, herbs, and cheese.',
        rating: 4.3,
        reviewCount: 112,
        ingredients: ['Garlic Butter', 'Shrimp', 'Calamari'],
        moreIngredients: 2,
        prices: {
            small: 329,
            medium: 489,
            large: 649
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23add8e6" cx="200" cy="200" r="180" opacity="0.3"/><ellipse fill="%23ff69b4" cx="160" cy="150" rx="30" ry="15"/><ellipse fill="%23ff69b4" cx="240" cy="180" rx="30" ry="15"/><ellipse fill="%23ff69b4" cx="200" cy="240" rx="30" ry="15"/></svg>',
        popular: false
    },
    {
        id: 11,
        name: 'Truffle Mushroom',
        category: 'SPECIALTY',
        description: 'Exotic mushroom blend with truffle oil, caramelized onions, and premium cheese.',
        rating: 4.7,
        reviewCount: 145,
        ingredients: ['Truffle Oil', 'Mushrooms', 'Caramelized Onions'],
        moreIngredients: 1,
        prices: {
            small: 299,
            medium: 459,
            large: 599
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%23deb887" cx="200" cy="200" r="180"/><ellipse fill="%238b4513" cx="150" cy="150" rx="25" ry="30"/><ellipse fill="%238b4513" cx="250" cy="170" rx="25" ry="30"/><ellipse fill="%238b4513" cx="200" cy="240" rx="25" ry="30"/></svg>',
        popular: false
    },
    {
        id: 12,
        name: 'Pesto Chicken',
        category: 'SPECIALTY',
        description: 'Grilled chicken with basil pesto sauce, sun-dried tomatoes, and mozzarella.',
        rating: 4.6,
        reviewCount: 178,
        ingredients: ['Pesto Sauce', 'Grilled Chicken', 'Sun-Dried Tomatoes'],
        prices: {
            small: 289,
            medium: 439,
            large: 579
        },
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle fill="%2390ee90" cx="200" cy="200" r="180" opacity="0.6"/><rect fill="%23daa520" x="140" y="140" width="45" height="35" rx="5"/><circle fill="%23ff6347" cx="240" cy="160" r="20"/><rect fill="%23daa520" x="180" y="230" width="45" height="35" rx="5"/></svg>',
        popular: false,
        new: true
    }
];
