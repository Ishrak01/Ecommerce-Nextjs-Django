import axios from 'axios';
import Link from "next/link";
import { useState } from "react";
import BASE_URL from './BaseUrl';

const MaxMin = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://summerfield.store/products?min_price=${minPrice}&max_price=${maxPrice}`);
      setSearchResults(response.data.products);
      setOpen(true);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMinPrice('');
    setMaxPrice('');
    setSearchResults([]); // Clear search results
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (e.target.value === '' && setter === setMinPrice && maxPrice === '') {
      handleClose(); // Close if both minPrice and maxPrice are empty
    }
    if (e.target.value === '' && setter === setMaxPrice && minPrice === '') {
      handleClose(); // Close if both minPrice and maxPrice are empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full md:w-[300px] mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="min-price" className="sr-only">Minimum Price</label>
        <input
          type="number"
          id="min-price"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleInputChange(setMinPrice)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2"
        />
        <label htmlFor="max-price" className="sr-only">Maximum Price</label>
        <input
          type="number"
          id="max-price"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleInputChange(setMaxPrice)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Search</button>
      </form>

      {open && searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {searchResults.map((product) => (
            <Link key={product.id} href={`/SingleProduct/${product.id}`}>
              <div className="bg-white  rounded-lg shadow-md cursor-pointer" onClick={handleClose}>
                <img
                  src={BASE_URL + product.images[0].thumb} // Adjust this based on your product data structure
                  alt={product.title} // Adjust this based on your product data structure
                  className="h-20 w-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-sm font-bold mb-2  truncate">{product.title}</h2>
                <h2 className="text-sm font-bold mb-2  truncate">{product.selling_price} Taka</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaxMin;
