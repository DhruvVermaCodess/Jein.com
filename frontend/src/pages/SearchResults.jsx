import React, { useEffect, useState } from 'react';
import { BACKEND_URI } from '../utils';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query') || '';

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/product/`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      const filteredItems = data.message.filter((item) =>
        [item.name, item.description, item.category, item.brand, item.subcategory]
          .some((field) => field && field.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-lg text-gray-500">
            Found {results.length} items matching your search
          </p>
        </div>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.length > 0 ? (
            results.map((product) => (
              <Link 
                to={`/product/${product._id}`}
                key={product._id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-xl"
              >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64"
                  />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No results found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
