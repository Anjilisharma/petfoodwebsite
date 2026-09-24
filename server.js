const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🐾 PawBite Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`🐾 PawBite server running at http://localhost:${PORT}`);
});