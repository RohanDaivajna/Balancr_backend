const jwt =  require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes and verify JWT token
exports.protect = async (req,res,next) => {
 let token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
 if(!token) return res.status(401).json({message:"Not authorized, no token "});

 try{
    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request, exclude password
    next();
 }catch(err){
    res.status(401).json({message:"Not authorized, token failed"});
 }
};