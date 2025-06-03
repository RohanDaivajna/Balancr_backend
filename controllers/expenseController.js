const xlsx = require("xlsx")
const Expense = require("../models/Expense");

// Add a new expense for the authenticated user
exports.addExpense = async (req, res) => {
   const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;
         if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();

        res.status(201).json({newExpense});
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
}

// Get all expenses for the authenticated user
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({data:-1});
        res.json(expense);
    }catch(error){
        res.status(500).json({messgae:"Server error"});
    }
}

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
};

// Download all expenses as an Excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};