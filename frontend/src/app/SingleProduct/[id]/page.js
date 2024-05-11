"use client"
import { useAddEmptyCartMutation, useAddToCartMutation, useCartQuery } from "@/app/Features/Cart/cartApi";
import { useRelatedProductsQuery, useSingleProductsQuery } from "@/app/Features/Products/productsApi";


import BASE_URL from "@/app/components/BaseUrl";
import Link from "next/link";
import { useState } from 'react';
import toast from "react-hot-toast";




const SingleProduct= ({ params }) => {
  const { id } = params;
  
  const { data } = useSingleProductsQuery(id);
  const { data: relatedProducts,isLoading:loading } = useRelatedProductsQuery(id);
  let user_cart_id, body;
  const [addToCart] = useAddToCartMutation(user_cart_id, body);
  const [addEmptyCart] = useAddEmptyCartMutation();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  



  
  const { data: cartItems2, isLoading: newLoad } = useCartQuery();

  if(!newLoad && cartItems2){
    user_cart_id = cartItems2[cartItems2.length - 1].id;
  }
  else{
    // const {data: emptyCartResponse, isLoading: newRes} = addEmptyCart({});
    // if(!newRes && emptyCartResponse){
    //   user_cart_id = emptyCartResponse[emptyCartResponse.length - 1].id;
    // }
    // else return;
    alert("No cart available")
  }
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }
    const selectedVariant = data.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);
    if (!selectedVariant) {
      toast.error("Invalid variant.");
      return;
    }
  
    if (quantity > selectedVariant.stock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }
    body = {
      product_id: data.id, 
      color: selectedColor, 
      size: selectedSize, 
      image: 0, 
      quantity: quantity 
    }

    addToCart({user_cart_id, body});
    toast.success("Item added to cart.");



    
  };
  if (loading) {
    return (
      <div className="mx-[120px] flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-[120px] container mt-8 p-4 space-y-4 ">
      {data && (
        <div className="grid  grid-cols-1 md:grid-cols-3  ">
          <div className="mb-4 md:mb-0">
            <img
              src={BASE_URL + data.images[0].thumb}
              alt="Product"
              className="size-[300px]   rounded-lg shadow-md"
            />
            <br/>
             {data.title} 
          </div>
         
          <div className="space-x-3">
          <h2 className="text-2xl md:text-xl font-semibold mb-2 md:mb-4">Size</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.variants.map(variant => (
                <button
                  key={variant.size}
                  className={`px-4 py-2 rounded-md border ${selectedSize === variant.size ? 'bg-orange-600 text-black' : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setSelectedSize(variant.size)}
                >
                  <h1 className="text-xl">{variant.size}</h1>
                </button>
              ))}
            </div>
            <h2 className="text-2xl md:text-xl font-semibold mb-2 md:mb-4">Color</h2>
            <div className="flex  gap-2 mb-4">
              {data.variants.map(variant => (
                <button
                  key={variant.color}
                  className={`px-4 py-2 rounded-md border ${selectedColor === variant.color ? 'bg-orange-600 text-black' : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setSelectedColor(variant.color)}
                >
                  {variant.color}
                </button>
              ))}
            </div>
            <h2 className="text-2xl md:text-xl font-semibold mb-2 md:mb-4">Quantity</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-24 px-4 py-2 border rounded-md"
            />
           
            
            <button
              className="bg-orange-600 text-black px-4 py-2 rounded-md hover:bg-primary-dark border"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {relatedProducts && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 size-[1000px]">
            {relatedProducts.products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-2">
                <Link href={`/SingleProduct/${product.id}`}>
                
                    <img
                      src={BASE_URL + product.images[0].thumb}
                      alt={product.name}
                      className="size-[250px] rounded-lg mb-4"
                    />
                    <h2 className="text-lg text-black font-semibold mb-2 truncate">{product.title}</h2>
                  
                </Link>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;




