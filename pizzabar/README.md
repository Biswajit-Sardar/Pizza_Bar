# 🍕 PizzaBar - Pizza Ordering System

A complete full-stack pizza ordering application with a modern frontend built using HTML, CSS, and JavaScript, and a robust backend powered by Node.js, Express, and MongoDB.

![PizzaBar](https://img.shields.io/badge/PizzaBar-v1.0.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-brightgreen)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)
- [Screenshots](#screenshots)

## ✨ Features

### Frontend
- 🎨 Modern, responsive UI design
- 🍕 Dynamic pizza menu with filtering and search
- 🛒 Shopping cart functionality with local storage
- 👤 User authentication (sign in/sign up)
- 📱 Mobile-friendly responsive design
- ⭐ Product ratings and reviews
- 🔍 Advanced search and filtering
- 🎯 Category-based navigation

### Backend
- 🔐 JWT-based authentication & authorization
- 👥 User management (registration, login, profile)
- 🍕 Complete pizza CRUD operations
- 📦 Order management system
- 💳 Multiple payment methods support
- ⭐ Review and rating system
- 🔒 Role-based access control (User/Admin)
- 🛡️ Security with Helmet and CORS
- 📊 MongoDB database with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and flexbox/grid
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **LocalStorage** - Client-side data persistence

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
pizzabar/
├── frontend/
│   ├── css/
│   │   └── styles.css           # All CSS styles
│   ├── js/
│   │   ├── config.js            # Configuration & sample data
│   │   ├── api.js               # API service layer
│   │   ├── cart.js              # Shopping cart logic
│   │   ├── main.js              # Homepage functionality
│   │   ├── menu.js              # Menu page functionality
│   │   └── product.js           # Product detail page
│   ├── images/                  # Image assets
│   ├── index.html               # Homepage
│   ├── menu.html                # Menu page
│   └── product.html             # Product detail page
│
├── backend/
│   ├── config/                  # Configuration files
│   ├── controllers/             # Route controllers
│   │   ├── pizzaController.js
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── categoryController.js
│   │   └── reviewController.js
│   ├── middleware/              # Custom middleware
│   │   └── auth.js              # Authentication middleware
│   ├── models/                  # Mongoose models
│   │   ├── Pizza.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/                  # API routes
│   │   ├── pizzaRoutes.js
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── reviewRoutes.js
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── package.json             # Dependencies
│   └── server.js                # Express server
│
├── database/
│   └── init.js                  # Database initialization script
│
└── README.md                    # Documentation
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

### Step 1: Clone or Navigate to Project
```bash
cd pizzabar
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables
The `.env` file is already created. You can modify it if needed:

```bash
# backend/.env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pizzabar
JWT_SECRET=pizzabar-super-secret-jwt-key-2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:8000
DELIVERY_CHARGE=40
MIN_ORDER_AMOUNT=199
```

### Step 4: Start MongoDB
Make sure MongoDB is running on your system:

```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo systemctl start mongodb
```

### Step 5: Initialize Database
```bash
cd backend
npm run init-db
```

This will:
- Create the database
- Insert sample pizza data (12 pizzas)
- Create admin and demo user accounts

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start

# Or for development with auto-reload
npm run dev
```

The backend API will be available at: `http://localhost:3000`

### Start Frontend
You need a simple HTTP server to serve the frontend files. You can use any of these options:

**Option 1: Using Python**
```bash
cd frontend
python -m http.server 8000
# Or for Python 2
python -m SimpleHTTPServer 8000
```

**Option 2: Using Node.js http-server**
```bash
# Install http-server globally
npm install -g http-server

cd frontend
http-server -p 8000
```

**Option 3: Using PHP**
```bash
cd frontend
php -S localhost:8000
```

The frontend will be available at: `http://localhost:8000`

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 98765 43210",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@pizzabar.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Pizza Endpoints

#### Get All Pizzas
```http
GET /api/pizzas
GET /api/pizzas?category=CLASSIC
GET /api/pizzas?popular=true
GET /api/pizzas?search=pepperoni
```

#### Get Pizza by ID
```http
GET /api/pizzas/:id
```

#### Create Pizza (Admin Only)
```http
POST /api/pizzas
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Custom Pizza",
  "category": "SPECIALTY",
  "description": "Your custom pizza",
  "ingredients": ["Cheese", "Tomato"],
  "prices": {
    "small": 299,
    "medium": 449,
    "large": 599
  }
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "pizzaId": "60f7b3...",
      "size": "medium",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "contactPhone": "+91 98765 43210",
  "paymentMethod": "cod"
}
```

#### Get My Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

### Review Endpoints

#### Get Reviews for Pizza
```http
GET /api/reviews?pizzaId=60f7b3...
```

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "pizzaId": "60f7b3...",
  "orderId": "60f7b4...",
  "rating": 5,
  "comment": "Excellent pizza!"
}
```

## 🗄️ Database Schema

### Pizza Model
```javascript
{
  name: String (required, unique),
  category: String (enum: CLASSIC, SPECIALTY, VEGETARIAN, SPICY, SEAFOOD),
  description: String (required),
  ingredients: [String],
  prices: {
    small: Number,
    medium: Number,
    large: Number
  },
  image: String,
  rating: Number (0-5),
  reviewCount: Number,
  popular: Boolean,
  new: Boolean,
  available: Boolean,
  timestamps: true
}
```

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: String (enum: user, admin),
  isActive: Boolean,
  timestamps: true
}
```

### Order Model
```javascript
{
  orderNumber: String (unique, auto-generated),
  user: ObjectId (ref: User),
  items: [{
    pizza: ObjectId (ref: Pizza),
    name: String,
    size: String,
    quantity: Number,
    price: Number
  }],
  subtotal: Number,
  deliveryCharge: Number,
  total: Number,
  deliveryAddress: Object,
  contactPhone: String,
  status: String (enum: pending, confirmed, preparing, out-for-delivery, delivered, cancelled),
  paymentMethod: String,
  paymentStatus: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  notes: String,
  timestamps: true
}
```

## 🔐 Demo Credentials

### Admin Account
- **Email:** admin@pizzabar.com
- **Password:** admin123
- **Access:** Full admin privileges

### Demo User Account
- **Email:** demo@pizzabar.com
- **Password:** password123
- **Access:** Regular user privileges

## 🎨 Frontend Features

### Homepage (index.html)
- Hero slider with promotional banners
- Featured pizzas section
- Feature highlights
- Responsive navigation

### Menu Page (menu.html)
- Complete pizza catalog
- Search functionality
- Category filters (All, Classic, Specialty, Vegetarian, Spicy, Seafood)
- Sort options (Popular, Price, Rating)
- Grid layout with pizza cards

### Product Detail Page (product.html)
- Large product image
- Detailed description
- Ingredient list
- Size selection (Small, Medium, Large)
- Quantity selector
- Add to cart functionality
- Customer reviews section

### Shopping Cart
- Modal-based cart view
- Item quantity management
- Price calculation
- Delivery charge calculation
- Checkout button

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Role-based access control
- CORS protection
- Helmet security headers
- Input validation

## 📝 Additional Scripts

### Backend Scripts
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "init-db": "node database/init.js"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change PORT in .env file
PORT=3001
```

### CORS Issues
Update `CORS_ORIGIN` in `.env` to match your frontend URL:
```
CORS_ORIGIN=http://localhost:8000
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

PizzaBar Team

## 🙏 Acknowledgments

- Pizza images are SVG placeholders for demonstration
- Icons from inline SVG
- Design inspired by modern food delivery apps

---

**Enjoy your pizza! 🍕**
