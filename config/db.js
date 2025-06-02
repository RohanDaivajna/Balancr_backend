const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {}); // Connect using connection string from .env
        console.log("MongoDB connected");
    }catch(err){
        console.log("Error connecting to MongoDB",err);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;