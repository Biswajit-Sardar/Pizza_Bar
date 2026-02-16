const mongoose = require('mongoose');
const Pizza = require('../backend/models/Pizza');
const User = require('../backend/models/User');
require('dotenv').config({ path: '../backend/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzabar';

// Sample pizza data
const samplePizzas = [
    {
        name: 'Pepperoni',
        category: 'CLASSIC',
        description: 'Loaded with premium pepperoni that curls into crispy cups, layered over our signature tomato sauce and melted mozzarella cheese.',
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'],
        prices: { small: 249, medium: 399, large: 549 },
        rating: 4.9,
        reviewCount: 312,
        popular: true,
        available: true
    },
    {
        name: 'Meat Lovers',
        category: 'SPECIALTY',
        description: 'The ultimate meat feast with Italian sausage, crispy bacon, smoked ham, seasoned beef, and premium pepperoni.',
        ingredients: ['Tomato Sauce', 'Sausage', 'Bacon', 'Ham', 'Beef', 'Pepperoni'],
        prices: { small: 329, medium: 479, large: 629 },
        rating: 4.8,
        reviewCount: 287,
        popular: true,
        available: true
    },
    {
        name: 'Margherita',
        category: 'CLASSIC',
        description: 'The timeless classic with San Marzano tomato sauce, fresh mozzarella di bufala, and aromatic basil leaves.',
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'],
        prices: { small: 199, medium: 319, large: 449 },
        rating: 4.8,
        reviewCount: 234,
        popular: true,
        available: true
    },
    {
        name: 'Hawaiian',
        category: 'SPECIALTY',
        description: 'A tropical twist with sweet pineapple chunks and savory ham pieces atop our cheese blend.',
        ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple'],
        prices: { small: 229, medium: 369, large: 499 },
        rating: 4.4,
        reviewCount: 198,
        available: true
    },
    {
        name: 'Veggie Supreme',
        category: 'VEGETARIAN',
        description: 'Garden fresh vegetables including bell peppers, mushrooms, onions, olives, and tomatoes on a bed of melted cheese.',
        ingredients: ['Tomato Sauce', 'Bell Peppers', 'Mushrooms', 'Onions', 'Olives', 'Tomatoes', 'Mozzarella'],
        prices: { small: 219, medium: 349, large: 479 },
        rating: 4.6,
        reviewCount: 156,
        popular: true,
        available: true
    },
    {
        name: 'BBQ Chicken',
        category: 'SPECIALTY',
        description: 'Tender grilled chicken with tangy BBQ sauce, red onions, cilantro, and a blend of mozzarella and cheddar cheese.',
        ingredients: ['BBQ Sauce', 'Grilled Chicken', 'Red Onion', 'Cilantro', 'Mozzarella', 'Cheddar'],
        prices: { small: 279, medium: 429, large: 569 },
        rating: 4.7,
        reviewCount: 223,
        popular: true,
        available: true
    },
    {
        name: 'Four Cheese',
        category: 'CLASSIC',
        description: 'A cheese lover\'s dream with mozzarella, parmesan, gorgonzola, and ricotta cheese.',
        ingredients: ['Mozzarella', 'Parmesan', 'Gorgonzola', 'Ricotta'],
        prices: { small: 259, medium: 399, large: 529 },
        rating: 4.5,
        reviewCount: 189,
        available: true
    },
    {
        name: 'Spicy Italian',
        category: 'SPICY',
        description: 'Hot Italian sausage, pepperoni, jalapeños, and crushed red pepper for those who like it spicy.',
        ingredients: ['Tomato Sauce', 'Spicy Sausage', 'Jalapeños', 'Pepperoni', 'Red Pepper Flakes', 'Mozzarella'],
        prices: { small: 269, medium: 419, large: 559 },
        rating: 4.6,
        reviewCount: 167,
        available: true
    },
    {
        name: 'Mediterranean',
        category: 'VEGETARIAN',
        description: 'Feta cheese, kalamata olives, sun-dried tomatoes, artichokes, and fresh spinach on olive oil base.',
        ingredients: ['Olive Oil', 'Feta Cheese', 'Olives', 'Sun-Dried Tomatoes', 'Artichokes', 'Spinach'],
        prices: { small: 249, medium: 389, large: 519 },
        rating: 4.5,
        reviewCount: 134,
        available: true
    },
    {
        name: 'Seafood Delight',
        category: 'SEAFOOD',
        description: 'Shrimp, calamari, and crab meat with garlic butter sauce, herbs, and cheese.',
        ingredients: ['Garlic Butter', 'Shrimp', 'Calamari', 'Crab Meat', 'Herbs', 'Mozzarella'],
        prices: { small: 329, medium: 489, large: 649 },
        rating: 4.3,
        reviewCount: 112,
        available: true
    },
    {
        name: 'Truffle Mushroom',
        category: 'SPECIALTY',
        description: 'Exotic mushroom blend with truffle oil, caramelized onions, and premium cheese.',
        ingredients: ['Truffle Oil', 'Mushrooms', 'Caramelized Onions', 'Mozzarella', 'Parmesan'],
        prices: { small: 299, medium: 459, large: 599 },
        rating: 4.7,
        reviewCount: 145,
        available: true
    },
    {
        name: 'Pesto Chicken',
        category: 'SPECIALTY',
        description: 'Grilled chicken with basil pesto sauce, sun-dried tomatoes, and mozzarella.',
        ingredients: ['Pesto Sauce', 'Grilled Chicken', 'Sun-Dried Tomatoes', 'Mozzarella'],
        prices: { small: 289, medium: 439, large: 579 },
        rating: 4.6,
        reviewCount: 178,
        new: true,
        available: true
    }
];

// Initialize database
async function initializeDatabase() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Pizza.deleteMany({});
        await User.deleteMany({});

        // Insert sample pizzas
        console.log('📝 Inserting sample pizzas...');
        await Pizza.insertMany(samplePizzas);
        console.log(`✅ Inserted ${samplePizzas.length} pizzas`);

        // Create admin user
        console.log('👤 Creating admin user...');
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@pizzabar.com',
            password: 'admin123',
            role: 'admin',
            phone: '+91 98765 43210',
            address: {
                street: '123 Pizza Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                zipCode: '400001'
            }
        });
        console.log('✅ Admin user created');

        // Create demo user
        console.log('👤 Creating demo user...');
        const demoUser = await User.create({
            name: 'Demo User',
            email: 'demo@pizzabar.com',
            password: 'password123',
            role: 'user',
            phone: '+91 98765 12345',
            address: {
                street: '456 Customer Lane',
                city: 'Mumbai',
                state: 'Maharashtra',
                zipCode: '400002'
            }
        });
        console.log('✅ Demo user created');

        console.log('\n🎉 Database initialized successfully!');
        console.log('\n📌 Login credentials:');
        console.log('   Admin: admin@pizzabar.com / admin123');
        console.log('   Demo:  demo@pizzabar.com / password123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase();
