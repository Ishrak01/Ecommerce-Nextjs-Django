"use client"
import axios from 'axios';
import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://summerfield.store/products?keyword=${query.trim()}`);
      setSearchResults(response.data.products);
      setOpen(true);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setInputQuery("");
  };

  const handleOnChange = (input) => {
    setInputQuery(input);
    if (input.trim() === '') {
      setOpen(false); 
    } else {
      handleSearch(input);
      setOpen(true);
    }
  };

  return (
    <div className="w-full  md:w-[600px] mx-auto">
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">Search Products</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-15 p-2.5 "
            placeholder="Search Products"
            value={inputQuery}
            onChange={(e) => handleOnChange(e.target.value)}
            required
          />
        </div>
      </form>

      {open && searchResults.length > 0 && (
        <div className="absolute top-full left-0  mt-2 bg-blue-500 w-full border border-gray-300 rounded-lg shadow-md p-4">
          <button onClick={handleClose} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul>
            {searchResults.map((product) => (
              <Link key={product.id} href={`/SingleProduct/${product.id}`}>
                <li className='text-white' onClick={handleClose}>{product.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
