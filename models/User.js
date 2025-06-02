const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true}, // User's full name
        email:{type: String, required: true, unique: true}, // User's email (unique)
        password:{type: String, required: true}, // Hashed password
        profileImageUrl:{type: String, default: null}, // Optional profile image URL
    },
    {timestamps: true} // Adds createdAt and updatedAt fields
);

// Hash password before saving user document
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);