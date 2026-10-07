# 🐾 PawBite – Pet Food E-Commerce Website

**PawBite** is a full-stack pet food e-commerce website designed to make it easy for pet owners to browse, select, and purchase healthy food for their pets.

> 🐶 Healthy Food. Happy Pets. 🐱

---

## 📌 About the Project

PawBite provides an online platform where users can explore pet food products for different types of pets, including:

- 🐶 Dogs
- 🐱 Cats
- 🐰 Rabbits
- 🐟 Fish

The project includes a responsive frontend, backend API, MySQL database, user authentication, shopping cart, wishlist, checkout, and order management.

---

## ✨ Features

### 👤 User Features

- User registration
- Secure user login
- JWT-based authentication
- User logout
- Protected checkout
- Browse pet food products
- Search products
- Filter products by category
- Add products to cart
- Update cart quantity
- Remove products from cart
- Add/remove wishlist items
- Place orders

### 🛒 Shopping Features

- Product categories
- Product details
- Product ratings and reviews
- Shopping cart
- Wishlist
- Checkout system
- Order placement
- Order data stored in MySQL

### 🔐 Security

- Password hashing using **bcrypt**
- JWT authentication
- Protected API routes
- Environment variables for sensitive database information

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL

### Authentication & Security

- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS

### Development Tools

- Visual Studio Code
- MySQL / MySQL Workbench
- Git
- GitHub

---

## 🗄️ Database Structure

The PawBite database contains the following main tables:

- `users`
- `products`
- `orders`
- `order_items`

The database stores user information, product information, orders, and individual items included in each order.

---

## 📂 Project Structure

```text
PawBite
│
├── index.html
├── shop.html
├── product.html
├── cart.html
├── wishlist.html
├── login.html
├── register.html
├── forgot-password.html
├── checkout.html
│
├── style.css
├── script.js
│
├── dog food.jpg
├── cat food.jpg
├── rabbit food.jpg
├── fish food.jpg
│
└── backend
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── .env

```



## 🚀 Getting Started – How to Run PawBite
1. Clone the Repository
git clone https://github.com/Anjilisharma/petfoodwebsite.git
2. Open the Project

Open the project folder in Visual Studio Code.

3. Install Backend Dependencies

Open the terminal inside the backend folder:

npm install
4. Configure Environment Variables

Create a .env file inside the backend folder:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=pawbite
DB_PORT=3306
JWT_SECRET=your_secret_key
5. Start the Backend
node server.js

The backend will run on:

http://localhost:3000
6. Run the Frontend

Open index.html using a local development server such as Live Server in VS Code.

🔑 Authentication

PawBite uses:

bcrypt for securely hashing user passwords.
JWT for user authentication and protected API requests.

Users must be logged in before accessing protected features such as checkout and order placement.

🛍️ Product Categories
Category	Example Product
🐶 Dog Food	Premium Chicken Dog Food
🐱 Cat Food	Premium Salmon Cat Food
🐰 Rabbit Food	Healthy Rabbit Pellets
🐟 Fish Food	Premium Fish Food Flakes
🎯 Project Objectives

The main objectives of PawBite are:

To develop a functional pet food e-commerce website.
To provide a simple and user-friendly shopping experience.
To implement secure user authentication.
To connect a frontend application with a backend REST API.
To store and manage application data using MySQL.
To implement an online shopping cart and checkout system.
To demonstrate practical full-stack web development skills.
🔮 Future Improvements

Possible future improvements include:

Online payment integration
Admin dashboard
Product management system
Order tracking
Email notifications
Product reviews and comments
Pet-specific food recommendations
AI-based pet food recommendation system
## 👩‍💻 Developer

```text
Anjili Sharma

BSc CSIT Student
Nepal 🇳🇵
```

## 📄 License

This project was developed for academic and educational purposes.
