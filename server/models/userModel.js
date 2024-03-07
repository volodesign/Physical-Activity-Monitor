const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        uniq: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    first_name:  {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    middle_name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        trim: true
    },
    height: {
        type: Number,
        required: true,
        trim: true
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
