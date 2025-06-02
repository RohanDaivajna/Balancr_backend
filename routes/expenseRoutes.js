const express = require("express")
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new expense (protected route)
router.post("/add", protect, addExpense);

// Get all expenses for the user (protected route)
router.get("/get", protect, getAllExpense);

// Download expenses as Excel file (protected route)
router.get("/downloadexcel", protect, downloadExpenseExcel)

// Delete an expense by ID (protected route)
router.delete("/:id", protect, deleteExpense);

module.exports = router;