const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String, 
        required: true,
        minlength: [6, 'Password should be at least 6 characters']
    },
    profilePicture: {
        type: String,
        default: ''
    },
    role: {
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)