const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user and return token
router.post("/login", loginUser);

// Get user info (protected route)
router.get("/getUser", protect,  getUserInfo);

// Upload user profile image
router.post("/upload-image", upload.single('image'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    // Construct image URL and return to client
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
});

module.exports = router;