const mongoose = require("mongoose")

// Define the Expense schema
const ExpenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Reference to User
    icon: {type: String}, // Optional icon for the expense
    category:{type:String, required: true}, // Expense category
    amount: {type: Number, required: true}, // Expense amount
    date: {type: Date, default: Date.now}, // Date of expense
},{timestamps: true}); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Expense", ExpenseSchema);