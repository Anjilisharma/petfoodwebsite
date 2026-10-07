require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.use(cors());
app.use(express.json());
// ==========================================
// JWT Authentication Middleware
// ==========================================

function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Access denied. Please login first."
        });

    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, user) => {

            if (error) {

                return res.status(403).json({
                    message: "Invalid or expired token."
                });

            }

            req.user = user;

            next();

        }
    );

}

// ===============================
// User Registration
// ===============================

app.post("/register", async (req, res) => {
    try {
       const { name, email, password } = req.body;

// Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);

const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
);

        res.json({
            message: "Registration successful!",
            userId: result.insertId
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// ===============================
// User Login
// ===============================

// ===============================
// User Login
// ===============================

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = rows[0];

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

res.json({
    message: "Login successful!",
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
});

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed."
        });
    }
});
// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.send("🐾 PawBite Backend is Running!");
});

// ===============================
// Database Test
// ===============================

app.get("/db-test", authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            message: "🐾 MySQL connected successfully!",
            result: rows
        });

    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "❌ MySQL connection failed"
        });
    }
});

// ===============================
// Get All Products
// ===============================

app.get("/products", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");

        res.json(rows);

    } catch (error) {
        console.error("Products error:", error);

        res.status(500).json({
            message: "❌ Failed to fetch products"
        });
    }
});

// ===============================
// Start Server
// ===============================

// Create Order
app.post("/orders", authenticateToken, async (req, res) => {
    try {
        const { items, total_amount } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order cannot be empty."
            });
        }

        // Create order
        const [orderResult] = await db.query(
            `INSERT INTO orders (user_id, total_amount)
             VALUES (?, ?)`,
            [userId, total_amount]
        );

        const orderId = orderResult.insertId;

        // Save order items
        for (const item of items) {
            await db.query(
                `INSERT INTO order_items
                (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)`,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]
            );
        }

        res.json({
            message: "Order placed successfully!",
            orderId: orderId
        });

    } catch (error) {
        console.error("Order error:", error);

        res.status(500).json({
            message: "Failed to place order."
        });
    }
});


app.listen(PORT, () => {
    console.log(`🐾 PawBite server running at http://localhost:${PORT}`);
});