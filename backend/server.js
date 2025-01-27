const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Database connection from db.js
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Test API Route
app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// ✅ User Signup Route
app.post('/api/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if user exists
      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [username]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert into DB
      const newUser = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      );
  
      res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
    } catch (err) {
      console.error("Signup Error:", err); // Logs the actual error
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// ✅ User Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Send Anonymous Message
app.post("/api/send-message", async (req, res) => {
    try {
      const { senderId, recipientUsername, message } = req.body;
  
      // Check if recipient exists
      const recipient = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [recipientUsername]
      );
  
      if (recipient.rows.length === 0) {
        return res.status(404).json({ error: "Recipient not found" });
      }
  
      const recipient_id = recipient.rows[0].id;
  
      // Insert message into database
      await pool.query(
        "INSERT INTO messages (sender_id, recipient_id, message) VALUES ($1, $2, $3)",
        [senderId, recipient_id, message]
      );
  
      res.status(201).json({ message: "Message sent successfully" });
  
    } catch (error) {
      console.error("❌ Error sending message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
