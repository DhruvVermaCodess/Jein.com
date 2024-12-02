import React, { useEffect, useState, useContext } from 'react';
import { BACKEND_URI } from '../utils';
import HeroSection from '../components/HeroSection';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { userId } = useContext(AuthContext);
    const [cart, setCart] = useState(null);

    const DeliveryCharge = 100;

    const fetchData = async () => {
        try {
            const response = await fetch(`${BACKEND_URI}/api/cart/user-cart?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setCart(data.message);
            } else {
                console.error('Failed to fetch cart data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const removeItem = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URI}/api/cart/remove-item/${id}?userId=${userId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data.message);
            fetchData(); // Refresh cart after item removal
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        if (userId) fetchData();
    }, [userId]);

    return (
        <>
            <HeroSection />
            <div className="flex flex-col md:flex-row w-screen p-6 gap-8">
                {/* Cart Items */}
                <div className="flex flex-col gap-6 w-full md:w-2/3">
                    {cart && cart.items.length > 0 ? (
                        cart.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:bg-gray-50"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-32"
                                />
                                <div className="flex flex-col">
                                    <p className="text-lg font-semibold">{item.product.name}</p>
                                    <p className="text-gray-600">₹ {item.product.price}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p onClick={()=>removeItem(item.product._id)} className='text-red-700 cursor-pointer inline hover:underline'>Remove</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No items in cart</p>
                    )}
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <p>Price:</p>
                            <p>₹{cart?.totalPrice ?? 0}</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p>Delivery:</p>
                            <p>₹{DeliveryCharge}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between text-lg font-semibold">
                            <p>Total:</p>
                            <p>₹{(cart?.totalPrice ?? 0) + DeliveryCharge}</p>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg hover:bg-blue-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
