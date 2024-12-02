// Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BACKEND_URI } from '../utils';
import { ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  const { isAuth, isAdmin, setIsAuth } = useContext(AuthContext);

  const logout = async () => {
    const response = await fetch(`${BACKEND_URI}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      setIsAuth(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              jein<span className="text-yellow-400">.com</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/cart" 
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {isAuth ? (
              <button 
                onClick={logout} 
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            {isAdmin && (
              <Link 
                to="/admin" 
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 