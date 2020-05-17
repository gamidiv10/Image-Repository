const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    emailId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);