"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BASE_URL from "./BaseUrl";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products?page=${currentPage}`);
        setAllProducts((prevProducts) => [...prevProducts, ...response.data.products]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetchingMore || loading) {
        return;
      }
      setIsFetchingMore(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore, loading]);

  useEffect(() => {
    if (!isFetchingMore) return;

    const fetchMoreProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products?page=${currentPage + 1}`);
        setAllProducts((prevProducts) => [...prevProducts, ...response.data.products]);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error fetching more products:", error);
      } finally {
        setIsFetchingMore(false);
      }
    };

    fetchMoreProducts();
  }, [isFetchingMore, currentPage]);

  const lastProductRef = useRef();

  const setLastProductRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingMore) {
        setIsFetchingMore(true);
      }
    });
    if (node) observer.current.observe(node);
    lastProductRef.current = node;
  };

  return (
    <div className="container md:px-8 lg:px-10 ">
  
      <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {allProducts.map((product, index) => (
          <Link key={product.id} href={`/SingleProduct/${product.id}`}>
            <div
              ref={index === allProducts.length - 1 ? setLastProductRef : null}
              className="block bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={BASE_URL + product.images[0].thumb}
                alt={product.title}
                className="h-20 w-40 object-cover text-black rounded-md"
              />
              <h2 className="text-xs text-black font-semibold mb-2 truncate">{product.title}</h2>
              <h2 className="text-xs text-black font-semibold mb-2 ">{product.selling_price} Taka</h2>
            </div>
          </Link>
        ))}
        {isFetchingMore && <div>Loading more...</div>}
      </div>
    </div>
  );
};

export default Products;
