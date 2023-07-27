const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true['firstName is required'],
    },
    lastName: {
        type: String,
        required: true['lastName is required'],
    },
    email: {
        type: String,
        required: true['Email is required'],
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true['Password is required'],
    },
    password: {
        type: String,
        required: true['Password is required'],
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


const userModel = mongoose.model('Users', userSchema);

module.exports = userModel