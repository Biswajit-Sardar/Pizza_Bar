# 🚀 Quick Start Guide - PizzaBar

Get PizzaBar up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14+): `node --version`
- ✅ MongoDB (v4+): `mongod --version`
- ✅ npm: `npm --version`

## 🎯 Quick Setup (3 Steps)

### Step 1: Install Dependencies (1 min)
```bash
cd pizzabar/backend
npm install
```

### Step 2: Start MongoDB & Initialize Database (1 min)
```bash
# Make sure MongoDB is running
mongod

# In a new terminal, initialize the database
cd pizzabar/backend
npm run init-db
```

You should see:
```
✅ Inserted 12 pizzas
✅ Admin user created
✅ Demo user created

📌 Login credentials:
   Admin: admin@pizzabar.com / admin123
   Demo:  demo@pizzabar.com / password123
```

### Step 3: Start the Application (1 min)

**Terminal 1 - Start Backend:**
```bash
cd pizzabar/backend
npm start
```

You should see:
```
🍕 PizzaBar Server is running!
📍 Server: http://localhost:3000
```

**Terminal 2 - Start Frontend:**
```bash
cd pizzabar/frontend
python -m http.server 8000
```

## 🎉 You're Ready!

Open your browser and visit:
- **Frontend:** http://localhost:8000
- **Backend API:** http://localhost:3000/api

## 🧪 Test the Application

1. **Browse pizzas** on the homepage
2. **Click "Menu"** to see all pizzas
3. **Click on any pizza** to view details
4. **Add to cart** and view your cart
5. **Sign in** with demo credentials:
   - Email: `demo@pizzabar.com`
   - Password: `password123`

## 📱 Quick Feature Tour

### For Users:
1. Browse 12 different pizzas across 5 categories
2. Search and filter pizzas
3. Add pizzas to cart (stored in localStorage)
4. Sign in/Register
5. Place orders (requires authentication)
6. View order history

### For Admins:
1. Login with admin credentials
2. Access to admin endpoints via API
3. Create/Update/Delete pizzas
4. Manage all orders
5. Update order status

## 🔧 Common Commands

```bash
# Backend
cd backend
npm start              # Start server
npm run dev            # Start with auto-reload (requires nodemon)
npm run init-db        # Reset and initialize database

# Frontend (choose one)
python -m http.server 8000          # Python 3
python -m SimpleHTTPServer 8000     # Python 2
php -S localhost:8000               # PHP
npx http-server -p 8000             # Node.js http-server
```

## 🌐 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:8000 | Main website |
| Backend API | http://localhost:3000/api | REST API |
| Health Check | http://localhost:3000/api/health | Server status |
| Pizzas API | http://localhost:3000/api/pizzas | Get all pizzas |

## 📞 API Testing Examples

### Get All Pizzas
```bash
curl http://localhost:3000/api/pizzas
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@pizzabar.com","password":"password123"}'
```

### Get Pizza by Category
```bash
curl http://localhost:3000/api/pizzas?category=CLASSIC
```

## ⚠️ Troubleshooting

### MongoDB not running?
```bash
# Start MongoDB
sudo systemctl start mongodb
# Or
mongod
```

### Port 3000 already in use?
```bash
# Option 1: Kill the process
lsof -ti:3000 | xargs kill -9

# Option 2: Change port in backend/.env
PORT=3001
```

### Frontend not loading?
- Check if you're in the `frontend` directory
- Make sure port 8000 is available
- Try a different port: `python -m http.server 8080`

### Database connection error?
- Verify MongoDB is running: `sudo systemctl status mongodb`
- Check connection string in `backend/.env`
- Default: `mongodb://localhost:27017/pizzabar`

## 🎓 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Explore the API endpoints
3. Customize the pizzas in the database
4. Modify the frontend design
5. Add new features!

## 💡 Pro Tips

- Use **MongoDB Compass** to view your database visually
- Use **Postman** or **Thunder Client** to test APIs
- Check `backend/server.js` for all available endpoints
- Frontend works offline with sample data if backend is down
- All user passwords are hashed with bcrypt

## 🆘 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check if ports 3000 and 8000 are available
5. Review the full README.md

---

**Happy Pizza Ordering! 🍕**
