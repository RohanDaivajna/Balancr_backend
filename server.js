require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db") // MongoDB connection
const authRoutes = require("./routes/authRoutes") // Auth route handlers
const incomeRoutes = require("./routes/incomeRoutes") // Income route handlers
const expenseRoutes = require("./routes/expenseRoutes") // Expense route handlers
const dashboardRoutes = require("./routes/dashboardRoutes") // Dashboard route handlers

const app = express();

// List of allowed origins for CORS
const allowedOrigins = [
  process.env.CLIENT_URL,                // your deployed frontend (set this in Render env vars)
  "http://localhost:8000",
  "https://balancr-frontend.vercel.app",
  "https://balancr-frontend-git-main-rohan-daivajnas-projects.vercel.app",
  "https://balancr-frontend-puy2jxe0n-rohan-daivajnas-projects.vercel.app",              // local dev frontend
  
].filter(Boolean);

// CORS middleware configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json()); // Parse incoming JSON requests

connectDB(); // Connect to MongoDB

// Health check route
app.get("/", (req, res) => {
  res.send("Balancr backend is running!");
});

// API route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`)); // Start server