const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: {type: String, required: false},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)