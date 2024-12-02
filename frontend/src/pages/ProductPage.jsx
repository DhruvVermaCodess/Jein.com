import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from '../utils'
import {Link} from 'react-router-dom'

const ProductPage = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
     
    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BACKEND_URI}/api/product/`)
            if (response.ok) {
                const data = await response.json()
                setProducts(data.message)
            } else {
                const data = await response.json()
                setError(data.message)
            }
        } catch (err) {
            setError('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }
    const handleSort = async (order) => {
        const response = await fetch(`${BACKEND_URI}/api/product/sort/${order}`)
        const data = await response.json()
        setProducts(data.message)
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Filter section */}
            <div className='sticky top-0 z-10 bg-white border-b'>
                <div className='max-w-7xl mx-auto px-4 py-3 flex justify-end'>
                    <select onChange={(e) => handleSort(e.target.value)} className='px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'>
                        <option value={null}>Sort by</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {products && products.map((product, i) => (
                            <Link to={`/product/${product._id}`} key={i} className='bg-white rounded p-4 hover:shadow-lg transition-shadow duration-300'>
                                <div className="aspect-w-1 aspect-h-1 mb-4">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className='object-contain w-full h-full'
                                    />
                                </div>
                                <h3 className='text-sm text-gray-700 mb-1 line-clamp-2'>{product.name}</h3>
                                <p className='text-lg font-medium text-gray-900'>₹{product.price}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductPage