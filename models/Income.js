const mongoose = require("mongoose")

// Define the Income schema
const IncomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Reference to User
    icon: {type: String}, // Optional icon for the income
    source:{type:String, required: true}, // Income source
    amount: {type: Number, required: true}, // Income amount
    date: {type: Date, default: Date.now}, // Date of income
},{timestamps: true}); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Income", IncomeSchema);