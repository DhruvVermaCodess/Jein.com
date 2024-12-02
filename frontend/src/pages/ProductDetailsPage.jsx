import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URI } from '../utils';
import { AuthContext } from '../context/AuthContext'

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { handleAddToCart, userId } = useContext(AuthContext)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URI}/api/product/${id}`);
            const data = await res.json();
            setProduct(data.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center text-lg">{error}</p>;
    }

    if (!product) {
        return <p className="text-center text-lg">Product not found.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-[500px]"
                    />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-gray-600 text-lg">{product.description}</p>

                    <div className="flex items-center space-x-2 my-2">
                        <span className="text-2xl font-semibold text-gray-900">
                            ₹{product.price}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-600">{product.brand}</span>
                    </div>

                    <div className="pt-6 space-y-3">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product._id, 1, product.price, userId)
                        }} className="w-full px-6 py-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300 font-semibold">
                            Add to Cart
                        </button>
                        <button className="w-full px-6 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-300 font-semibold">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
