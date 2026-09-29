require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

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

// ===============================
// User Registration
// ===============================

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
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
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.send("🐾 PawBite Backend is Running!");
});

// ===============================
// Database Test
// ===============================

app.get("/db-test", async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`🐾 PawBite server running at http://localhost:${PORT}`);
});