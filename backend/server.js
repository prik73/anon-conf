// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const pool = require("./db"); // Import the database connection

// require("dotenv").config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const SECRET = process.env.JWT_SECRET;

// app.use(express.json());
// app.use(cors());

// // User Signup
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
//       [name, email, hashedPassword]
//     );

//     res.json({ message: "User registered successfully!", user: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "User already exists or database error" });
//   }
// });

// // User Login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
//     res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error logging in" });
//   }
// });

// // Submit Anonymous Confession
// app.post("/confession", async (req, res) => {
//   try {
//     const { message } = req.body;
//     await pool.query("INSERT INTO confessions (message) VALUES ($1)", [message]);
//     res.json({ message: "Confession submitted anonymously!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error submitting confession" });
//   }
// });

// // Get All Confessions
// app.get("/confessions", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT message, created_at FROM confessions ORDER BY created_at DESC");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching confessions" });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));






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
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if user exists
      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert into DB
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
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
