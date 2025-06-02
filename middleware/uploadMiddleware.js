const multer = require("multer");

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'uploads/'); // Save files to 'uploads/' directory
    },
    filename:(req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
    },
});

// Filter to allow only specific image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true); // Accept file
    }else{
        cb(new Error("Only .jpeg, .png and ,jpg formats are allowed"), false); // Reject file
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;