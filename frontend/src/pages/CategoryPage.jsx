import React, { useState, useEffect } from 'react'
import { BACKEND_URI } from '../utils'
import { useParams, Link } from 'react-router-dom'

const CategoryPage = () => {
    const {category} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URI}/api/product/category/${category}`);
            const data = await res.json();
            setProducts(data.message);
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

    if (!products) {
        return <p className="text-center text-lg">Product not found.</p>;
    }
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Products in {category}</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
                <Link to={`/product/${product._id}`} key={i} className='group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                    <div className='h-64 overflow-hidden'>
                        <img
                            src={product.image}
                            alt={product.name}
                            className='h-full'
                        />
                    </div>
                    <div className='p-4'>
                        <h3 className='text-lg font-medium text-gray-900 mb-1 line-clamp-1'>{product.name}</h3>
                        <p className='text-xl font-bold text-gray-900 mb-3'>₹{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategoryPage