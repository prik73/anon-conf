import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool  from "../config/db.js"// Assuming you have a database connection

import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Register a new user
const SignupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2", 
      [email, username]
    );


    if (userExists.rows.length > 0) {
      const existingUser = userExists.rows[0];
      if (existingUser.email === email) {
        return res.status(400).json({ 
          message: "Email already registered.",
          field: "email"
        });
    }
    if (existingUser.username === username) {
      return res.status(400).json({ 
        message: "Username already taken. Please choose another.",
        field: "username"
      });
    }

  }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultAvatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

    // Save the user to the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, avatar_url) VALUES ($1, $2, $3, $4) RETURNING id, username, email, avatar_url, created_at",
      [username, email, hashedPassword, defaultAvatarUrl]
    );


    return res.status(201).json({
       message: "User registered successfully.", 
       user: newUser.rows[0] 
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by email
    const user = await pool.query(
      "SELECT id, username, password, avatar_url FROM users WHERE username = $1",
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ 
        message: "Invalid username or password.",
        field: "username"
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Invalid username or password.",
        field: "password"
      })
    };


    // Generate a JWT token
    const token = jwt.sign(
      { 
        id: user.rows[0].id, 
        username: user.rows[0].username,
        avatar_url: user.rows[0].avatar_url
      }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    );

    return res.status(200).json({ 
      message: "Login successful.",
      token,
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        avatar_url: user.rows[0].avatar_url
      }
    });  
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { SignupUser, loginUser };
