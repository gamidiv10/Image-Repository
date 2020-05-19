const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, "User ID is required"],
        unique: [true, "Email ID must be unique"]
    },
    firstName:{
        type: String,
        required: [true, "First Name is required"],
    },
    lastName:{
        type: String,
        required: [true, "Last Name is required"],
    },
    emailId:{
        type: String,
        required: [true, "Email ID is required"],
        unique: [true, "Email ID must be unique"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    }
})

module.exports = mongoose.model('User', UserSchema);