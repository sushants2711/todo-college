
import mongoose from "mongoose";

// createa userModel for register a user 
const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
}, { timestamps: true });

export default mongoose.model("user", userModel);