const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('./db'); // Database connection
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';


const authRoutes = require("./src/routes/authRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const commentRoutes = require("./src/routes/commentRoutes");

app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests

const { handleNotFound, globalErrorHandler } = require("./src/middleware/errorHandlers");