import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition duration-300">Go Home</Link>
    </div>
  )
}

export default NotFoundPage