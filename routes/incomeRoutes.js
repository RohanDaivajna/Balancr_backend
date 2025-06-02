const express = require("express")
const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new income (protected route)
router.post("/add", protect, addIncome);

// Get all incomes for the user (protected route)
router.get("/get", protect, getAllIncome);

// Download incomes as Excel file (protected route)
router.get("/downloadexcel", protect, downloadIncomeExcel)

// Delete an income by ID (protected route)
router.delete("/:id", protect, deleteIncome);

module.exports = router;