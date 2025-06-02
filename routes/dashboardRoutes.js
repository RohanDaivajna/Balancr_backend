const express = require("express")
// Import controller and middleware
const { getDashboardData } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Get dashboard data (protected route)
router.get("/", protect, getDashboardData);

module.exports = router;