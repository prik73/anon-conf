import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';



import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Middlewares
app.use(json()); // Parse JSON request body
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
)); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests

// Import routes
import authRoutes from "../src/routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js";
import adminRoutes from "../src/routes/adminRoutes.js";

// Define routes
app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/v1/users", userRoutes); // User-related routes (messages, comments, etc.)
app.use("/api/v1/admin", adminRoutes); // Admin-related routes

app.get('/j', (req, res)=>{
  res.send('hello')
})

// Error handlers


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
