# PizzaBar - Modern Pizza Ordering Frontend

A beautiful, modern pizza ordering web application with a professional design matching the reference screenshots. Built with vanilla JavaScript, modern CSS, and designed for Indian market with INR currency.

## Features ✨

### Design & UI
- **Modern, Clean Design**: Matches professional pizza delivery websites
- **Hero Carousel**: Rotating promotional banners with smooth transitions
- **Product Cards**: Beautiful pizza cards with images, ratings, and ingredients
- **Light/Dark Mode**: Toggle between themes with persistence
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and hover effects

### User Experience
- **Guest Browsing**: Browse and explore without login
- **Smart Search**: Search pizzas by name, description, or ingredients
- **Category Filters**: Filter by Classic, Vegetarian, Spicy, Seafood, Specialty
- **Shopping Cart Sidebar**: Sleek sliding cart with live updates
- **Login Required for Orders**: Authentication only needed at checkout

### Authentication
- **Email/Password**: Traditional sign in and sign up
- **Google OAuth**: One-click Google authentication
- **Facebook OAuth**: One-click Facebook authentication
- **Modern Modal**: Clean authentication UI with tab switching

### Currency & Language
- **INR Currency (₹)**: All prices displayed in Indian Rupees
- **English Language**: Complete UI in English
- **Pricing**: From ₹249 to ₹1150+ for various sizes

## Tech Stack 🛠️

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with CSS Variables for theming
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Font Awesome**: Icon library
- **REST API**: Backend integration ready

## Project Structure 📁

```
pizzabar-modern/
├── css/
│   └── style.css           # Complete modern styles
├── js/
│   ├── config.js           # API configuration
│   ├── auth.js             # Authentication manager
│   ├── cart.js             # Shopping cart manager
│   ├── theme.js            # Theme toggle manager
│   ├── carousel.js         # Hero carousel
│   └── home.js             # Home page logic
├── images/                 # Image assets
├── index.html              # Home page
└── README.md               # This file
```

## Quick Start 🚀

### 1. Setup Backend (Required)

This frontend requires the backend API to function. See the main `pizza-app` folder for backend setup.

### 2. Start Frontend

**Option A - Python (Easiest):**
```bash
python -m http.server 3000
```

**Option B - Node.js:**
```bash
npm install -g http-server
http-server -p 3000
```

**Option C - VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

### 3. Open Browser

Visit: **http://localhost:3000**

## Configuration ⚙️

### API Endpoint

Update `js/config.js` to point to your backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

For production, update to your deployed backend URL.

### OAuth Configuration

To enable Google and Facebook login:

1. **Google OAuth:**
   - Get credentials from Google Cloud Console
   - Update backend `.env` file
   - Backend handles the OAuth flow

2. **Facebook OAuth:**
   - Get App ID from Facebook Developers
   - Update backend `.env` file
   - Backend handles the OAuth flow

## Design Features 🎨

### Color Scheme

**Light Mode:**
- Primary: #DC3545 (Red)
- Background: #FFFFFF (White)
- Secondary: #F8F9FA (Light Gray)
- Text: #212529 (Dark Gray)

**Dark Mode:**
- Primary: #DC3545 (Red)
- Background: #1A1A1A (Dark)
- Secondary: #2D2D2D (Dark Gray)
- Text: #F8F9FA (Light)

### Typography
- Primary Font: Segoe UI, system-ui
- Display Font: Georgia (for headings)
- Sizes: 14px to 64px

### Components

1. **Navigation Bar**
   - Brand logo (circular red icon)
   - Menu links
   - Theme toggle
   - Sign In button
   - Shopping cart icon with badge
   - User avatar dropdown (when logged in)

2. **Hero Carousel**
   - Full-width background images
   - Promotional text overlays
   - Previous/Next navigation buttons
   - Dot indicators
   - Auto-play (5 seconds)
   - Pause on hover

3. **Pizza Cards**
   - Large product image
   - "Popular" or "New" badge
   - Star ratings with review count
   - Brief description
   - Ingredient tags
   - "From ₹XXX" pricing
   - Add to cart button
   - Hover animations

4. **Search & Filters**
   - Search bar with icon
   - Sort dropdown
   - Category filter chips
   - Active state indicators

5. **Cart Sidebar**
   - Slides in from right
   - Cart items list
   - Quantity controls
   - Remove button
   - Price summary
   - Checkout button

6. **Sign In Modal**
   - Centered overlay
   - Sign In / Sign Up tabs
   - Form inputs
   - Social auth buttons
   - Close button

## Customization 🛠️

### Update Brand Logo

Replace the "P" in the navigation:

```html
<div class="brand-logo">YourLogo</div>
```

### Change Theme Colors

Edit `css/style.css`:

```css
:root {
    --primary-red: #YOUR_COLOR;
    --primary-dark: #YOUR_DARK_COLOR;
}
```

### Update Carousel Images

Edit the background images in `css/style.css`:

```css
.carousel-slide {
    background: url('YOUR_IMAGE_URL') center/cover;
}
```

### Modify Pricing

Update the delivery fee and tax rate in `js/cart.js`:

```javascript
this.deliveryFee = 50;  // Change delivery fee
this.taxRate = 0.05;    // Change tax rate (5%)
```

## Page Features 📄

### Home Page (index.html)

- Hero carousel with 3 promotional slides
- Search bar
- Category filters (All, Classic, Specialty, Vegetarian, Spicy, Seafood)
- Grid of 8 featured pizzas
- "View All Pizzas" link

### Features in Detail

**Carousel:**
- Auto-plays every 5 seconds
- Manual navigation with arrows
- Click indicators to jump to specific slide
- Pauses on hover

**Pizza Grid:**
- Responsive grid layout
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Hover effects on cards

**Search:**
- Searches pizza names
- Searches descriptions
- Searches ingredients
- Real-time filtering

**Filters:**
- All Pizzas
- Classic (high-rated pizzas)
- Specialty
- Vegetarian
- Spicy
- Seafood

## User Flow 🔄

### Browsing Flow
1. User lands on home page
2. Sees hero carousel with promotions
3. Browses featured pizzas
4. Can search or filter pizzas
5. Clicks pizza card to see details
6. Adds pizza to cart (no login required)
7. Views cart in sidebar
8. Proceeds to checkout
9. Login modal appears
10. User signs in or creates account
11. Completes order

### Authentication Flow
1. User clicks "Sign In" button
2. Modal appears with two tabs
3. Can choose Sign In or Sign Up
4. Enter credentials or use social auth
5. Upon success, modal closes
6. User avatar appears in navigation
7. Cart checkout is now available

## Responsive Breakpoints 📱

- **Desktop**: 1024px+
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

### Mobile Optimizations
- Navigation menu hidden on small screens
- Carousel text size reduced
- Hero buttons stack vertically
- Pizza grid becomes single column
- Cart sidebar full width
- Modal adjusted for small screens

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance ⚡

- Lightweight: No heavy frameworks
- Fast load times
- Optimized images (use CDN URLs)
- Efficient JavaScript
- CSS animations (GPU accelerated)
- LocalStorage for cart and theme

## Security 🔒

- JWT token authentication
- Secure password handling (backend)
- OAuth 2.0 for social login
- Input validation
- XSS protection
- CORS configured

## API Integration 🔌

### Required Endpoints

```
GET  /api/pizzas              # List all pizzas
GET  /api/pizzas/:id          # Get pizza details
POST /api/auth/login          # Email/password login
POST /api/auth/register       # Create account
GET  /api/auth/google         # Google OAuth
GET  /api/auth/facebook       # Facebook OAuth
POST /api/orders              # Create order
GET  /api/orders              # User's orders
```

### Data Format

**Pizza Object:**
```json
{
  "_id": "123",
  "name": "Margherita",
  "description": "Classic pizza...",
  "image": "https://...",
  "category": "vegetarian",
  "sizes": [
    { "size": "small", "price": 249 },
    { "size": "medium", "price": 399 },
    { "size": "large", "price": 549 }
  ],
  "ingredients": [
    { "name": "Mozzarella", "quantity": "200g" }
  ],
  "rating": 4.5,
  "reviewCount": 312
}
```

## Troubleshooting 🔧

**Pizzas not loading:**
- Check if backend is running
- Verify API_BASE_URL in config.js
- Check browser console for errors

**Images not showing:**
- Ensure image URLs are accessible
- Check CORS settings
- Use CDN for pizza images

**Cart not persisting:**
- Check if localStorage is enabled
- Clear browser cache
- Check browser privacy settings

**OAuth not working:**
- Verify backend OAuth configuration
- Check redirect URLs match
- Ensure backend is accessible

## Sample Data Format 📊

The frontend expects pizzas with this structure:

```javascript
{
  name: "Pepperoni",
  description: "Loaded with pepperoni...",
  image: "https://images.unsplash.com/...",
  category: "non-vegetarian",
  sizes: [
    { size: "small", price: 249 },
    { size: "medium", price: 399 },
    { size: "large", price: 549 },
    { size: "extra-large", price: 749 }
  ],
  ingredients: [
    { name: "Pepperoni", quantity: "150g" },
    { name: "Mozzarella", quantity: "200g" },
    { name: "Tomato Sauce", quantity: "100ml" }
  ],
  rating: 4.7,
  reviewCount: 256,
  isAvailable: true
}
```

## Credits 🙏

- Design inspired by modern pizza delivery platforms
- Images from Unsplash
- Icons from Font Awesome
- Built for the Indian market

## License 📄

This project is for educational and commercial use.

---

**Made with ❤️ for PizzaBar**

**Currency:** Indian Rupees (₹)
**Language:** English
**Target Market:** India
