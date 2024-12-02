import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import banner from '../assets/resize.jpg';

const Homepage = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Books', icon: '📚' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Home', icon: '🏠' },
    { name: 'Sports', icon: '⚽' }, 
    { name: 'Toys', icon: '🎮' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Search */}
      <HeroSection />
      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name}`}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-600">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={banner} 
            alt="banner" 
            className="w-full h-64 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="px-8 sm:px-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Summer Sale
              </h2>
              <p className="text-white/90 mb-6">
                Up to 50% off on selected items
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" onClick={() => navigate('/allProducts')}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
