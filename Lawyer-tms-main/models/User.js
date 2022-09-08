const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
    },

    lawyerName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        trim: true,
    },

    telephoneNumber: {
        type: String,
        minLength: 5,
        maxLength: 50,
        trim: true,
    },

    profilePic: {
        type: String,
        default: "",
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

exports.User = User;