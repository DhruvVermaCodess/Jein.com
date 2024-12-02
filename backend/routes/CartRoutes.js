const express = require('express');
const Cart = require('../models/CartModel');
const router = express.Router();

router.get('/user-cart', async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await Cart.findOne({ user: userId, isActive: true }).populate('items.product', 'name image price');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/add-to-cart', async (req, res) => {
    try {
        const { productId, quantity, price, userId } = req.body;

        if (!userId || !productId || !quantity || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let cart = await Cart.findOne({ user: userId, isActive: true });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity, price }],
                isActive: true
            });
        } else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.price = price;
            } else {
                cart.items.push({ product: productId, quantity, price });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/remove-item/:id', async (req, res) => {
    try {
        const { id } = req.params; // id of the product to remove
        const { userId } = req.query; // Pass userId from frontend

        const cart = await Cart.findOne({ user: userId, isActive: true });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from cart
        cart.items = cart.items.filter(item => item.product.toString() !== id);
        await cart.save();

        res.json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
