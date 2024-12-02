const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const User = require('../models/UserModel')
const router = express.Router()

// Add input validation middleware
const validateSignupInput = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    next();
};

// Signup route with validation
router.post('/signup', validateSignupInput, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Sanitize inputs
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedName = name.trim();
        
        const user = await User.findOne({ email: sanitizedEmail });
        if (user) {
            return res.status(409).json({ message: 'User already exists' }); // Changed to 409 Conflict
        }
        
        const hashedPassword = await bcrypt.hash(password, 12); // Increased rounds to 12
        const newUser = new User({
            name: sanitizedName,
            email: sanitizedEmail,
            password: hashedPassword
        });
        await newUser.save();
        
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' }); // Don't expose error details
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const sanitizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: sanitizedEmail });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Generic message for security
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        req.session.userID = user._id;
        req.session.userRole = user.role; // Store user role in session
        
        res.status(200).json({message: 'Login successful',});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error while logging out' });
            }
            res.clearCookie('connect.sid'); // Adjust to your session cookie name
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } else {
        return res.status(400).json({ message: 'No active session to log out' });
    }
});

//authenticated route
router.get('/checkAuth', (req, res) => {
    try {
        if (req.session && req.session.userID) {
            return res.json({ message: true });
        } 
        res.json({ message: false });
    } catch (error) {
        console.error('CheckAuth error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//userId route
router.get('/userId', (req, res) => {
    if (req.session && req.session.userID) {
        return res.json({ userId: req.session.userID });
    }
    res.status(401).json({ message: 'Unauthorized' });
});

//isAdmin route
router.get('/isAdmin', (req, res) => {
    try {
        if (req.session && req.session.userRole === 'admin') {
            return res.json({ message: true });
        }
        res.json({ message: false });
    } catch (error) {
        console.error('IsAdmin error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router

