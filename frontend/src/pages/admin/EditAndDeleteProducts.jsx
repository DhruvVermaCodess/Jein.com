import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URI } from '../../utils';

const EditAndDeleteProducts = () => {
    const [products, setProducts] = useState([]);
    const [editModal, setEditModal] = useState(false)
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`${BACKEND_URI}/api/product/`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data.message);
            } else {
                const err = await response.json();
                setError(err.message);
            }
        } catch (error) {
            setError('Failed to fetch products');
            console.error('Error:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URI}/api/product/delete/${id}`,{
                method: 'DELETE'
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message)
                fetchData()
            } else {
                const err = await response.json();
                alert(err.message);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
            
            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-w-1 aspect-h-1">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-4">₹{product.price}</p>
                                <div className="flex gap-3">
                                    <button 
                                        className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                                        onClick={() => setEditModal(true)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No products found.
                    </div>
                )}
            </div>

            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        {/* Add your edit form here */}
                        <button 
                            className="mt-4 w-full bg-gray-900 text-white py-2 rounded"
                            onClick={() => setEditModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditAndDeleteProducts;
