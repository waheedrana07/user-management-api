const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');

const app = express();
app.use(express.json()); // Essential: Allows your API to understand JSON data sent via Postman

// Connect to MongoDB Atlas
console.log("Attempting to connect to MongoDB..."); // This should show up immediately

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Database Connected Successfully!");
    })
    .catch((err) => {
        console.error("❌ Database Connection Error!");
        console.error("Reason:", err.message); // This will tell us if it's a password or IP issue
    });

// 2. Simple Test Route (Open http://localhost:3000 in browser to check)
app.get('/', (req, res) => res.send("User Management API is Live!"));

// CREATE: Add a new user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User Created!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));