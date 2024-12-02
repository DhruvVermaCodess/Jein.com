const express = require('express')
const Product = require('../models/ProductModel')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const router = express.Router()

cloudinary.config({
    cloud_name: 'dyr9amyq3',
    api_key: '149252666844626',
    api_secret: 'xJYiZzQvcwd4ebbIZ9n1BuTR5WM'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpg', 'png', 'jpeg']
    }
})

const upload = multer({storage: storage})

//get all products
router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.json({message: allProducts})
    } catch (error) {
        res.json({ message: error })
    }
})
//get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.json({message: product})
    } catch (error) {
        res.json({ message: error })
    }
})
//create a product
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const {name, description, price, category, subCategory, brand, stock} = req.body
        
        // Basic validation
        if (!name || !description || !price || !category || !subCategory || !brand || !stock) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        let image = '';
        
        if (req.file) {
            image = req.file.path;
        }
        
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            brand,
            stock,
            image
        })
        const savedProduct = await newProduct.save()
        res.status(201).json({ message: 'Product created successfully', product: savedProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error creating product: ' + error.message })
    }
})
//update product by ID
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body
        
        // Basic validation
        if (!updates.name && !updates.description && !updates.price  && !updates.brand && !updates.stock) {
            return res.status(400).json({ message: 'At least one field is required for update' })
        }

        if (req.file) {
            updates.image = req.file.path
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ message: 'Product updated successfully', product: updatedProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error updating product: ' + error.message })
    }
})
//delete product by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ message: 'Product deleted successfully', product: deletedProduct })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//sort products by price
router.get('/sort/:order', async (req, res) => {
    const { order } = req.params
    const sortedProducts = await Product.find().sort({ price: order === 'asc' ? 1 : -1 })
    res.json({ message: sortedProducts })
})
//get products by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params
    const productsByCategory = await Product.find({ category })
    res.json({ message: productsByCategory })
})

router.get('/sort/:order', async (req, res) => {
    const { order } = req.params;
    try {
        const sortedProducts = await Product.find().sort({ price: order === 'asc' ? 1 : -1 });
        res.json({ message: sortedProducts });
    } catch (error) {
        res.status(500).json({ message: 'Error sorting products: ' + error.message });
    }
});

module.exports = router;
