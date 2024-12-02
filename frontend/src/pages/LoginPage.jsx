import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BACKEND_URI } from '../utils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  if(isAuth) {
    return (
      navigate('/')
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message)
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong!');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-md rounded-md p-6">
        {/* Amazon-like Logo */}
        <div className="text-center mb-4">
          <a href="/" className="text-3xl font-bold text-orange-500">
            <span className="text-gray-800">jein</span>.com
          </a>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign-In</h2>

        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-400 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300 transition duration-200"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          By signing in, you agree to Amazon's{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Conditions of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Notice
          </a>.
        </p>

        <hr className="my-4" />

        <p className="text-sm text-gray-800">
          New to Amazon?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline"
          >
            Create your Amazon account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
