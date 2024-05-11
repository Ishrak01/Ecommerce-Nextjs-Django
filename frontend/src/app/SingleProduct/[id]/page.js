"use client"
import { useAddToCartMutation, useCartQuery } from "@/app/Features/Cart/cartApi";
import { useRelatedProductsQuery, useSingleProductsQuery } from "@/app/Features/Products/productsApi";


import BASE_URL from "@/app/components/BaseUrl";
import Link from "next/link";
import { useState } from 'react';
import toast from "react-hot-toast";


const SingleProductView = ({ params }) => {
  const { id } = params;
  console.log(id)
  const { data } = useSingleProductsQuery(id);
  const { data: relatedProducts,isLoading:loading } = useRelatedProductsQuery(id);
  let user_cart_id, body;
  const [addToCart] = useAddToCartMutation(user_cart_id, body);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  



  
  const { data: cartItems2, isLoading: newLoad } = useCartQuery();

  if(!newLoad && cartItems2){
    user_cart_id = cartItems2[cartItems2.length - 1].id;
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
    <main className="mx-[120px] container mt-8 p-4 space-y-4">
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
    </main>
  );
};

export default SingleProductView;




// "use client"
// import BASE_URL from "@/app/components/BaseUrl";
// import axios from 'axios';
// import Link from "next/link";
// import { useEffect, useState } from 'react';
// import toast from "react-hot-toast";
// import BASE_URL from "@/app/components/BaseUrl";

// const SingleProductView = ({ params }) => {
//   const { id } = params;
//   const [productData, setProductData] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [cartItems, setCartItems] = useState(null);
  

//   useEffect(() => {
//     axios.get(`${BASE_URL}/products/${id}`)
//       .then(response => {
//         setProductData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching product data:', error);
//         setLoading(false);
//       });

//     axios.get(`${BASE_URL}/products/${id}/related`)
//       .then(response => {
//         setRelatedProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching related products:', error);
//       });
//   }, [id]);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/cart`)
//       .then(response => {
//         setCartItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching cart items:', error);
//       });
//   }, []);

//   const handleAddToCart = () => {
//     if (!selectedSize || !selectedColor) {
//       toast.error("Please select size and color.");
//       return;
//     }
    
//     const selectedVariant = productData.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);
    
//     if (!selectedVariant) {
//       toast.error("Invalid variant.");
//       return;
//     }
    
//     if (quantity > selectedVariant.stock) {
//       toast.error("Quantity exceeds available stock.");
//       return;
//     }

//     const body = {
//       product_id: productData.id, 
//       color: selectedColor, 
//       size: selectedSize, 
//       image: 0, // Assuming image index 0 for now, you might need to adjust this
//       quantity: quantity 
//     };

//     axios.post(`${BASE_URL}/cart/${user}`, body)
//       .then(response => {
//         toast.success("Item added to cart.");
//         setCartItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error adding item to cart:', error);
//         toast.error("Failed to add item to cart.");
//       });
//   };

//   if (loading) {
//     return (
//       <div className="mx-[120px] flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-[120px] container mt-8 p-4">
//       {productData && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <div className="mb-4 md:mb-0">
//             <img
//               src={BASE_URL + productData.images[0].thumb}
//               alt="Product"
//               className="size-[300px] rounded-lg shadow-md"
//             />
//           </div>
//           <div>
//             <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">Size</h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {productData.variants.map(variant => (
//                 <button
//                   key={variant.size}
//                   className={`px-4 py-2 rounded-md border ${selectedSize === variant.size ? 'bg-orange-600 text-black' : 'bg-gray-200 text-gray-700'
//                     }`}
//                   onClick={() => setSelectedSize(variant.size)}
//                 >
//                   {variant.size}
//                 </button>
//               ))}
//             </div>
//             <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">Color</h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {productData.variants.map(variant => (
//                 <button
//                   key={variant.color}
//                   className={`px-4 py-2 rounded-md border ${selectedColor === variant.color ? 'bg-orange-600 text-black' : 'bg-gray-200 text-gray-700'
//                     }`}
//                   onClick={() => setSelectedColor(variant.color)}
//                 >
//                   {variant.color}
//                 </button>
//               ))}
//             </div>
//             <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">Quantity</h2>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//               className="w-24 px-4 py-2 border rounded-md"
//             />
//             <p className="text-gray-600 mb-2 md:mb-4">{productData.description}</p>
//             <p className="text-lg md:text-2xl font-bold text-primary mb-2 md:mb-4">
//               {productData.title} 
//             </p>
//             <button
//               className="bg-orange-600 text-black px-4 py-2 rounded-md hover:bg-primary-dark border"
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}

//       {relatedProducts && (
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             {relatedProducts.map(product => (
//               <div key={product.id} className="bg-white rounded-lg shadow-md p-2">
//                 <Link href={`/SingleProduct/${product.id}`}>
//                   <img
//                     src={BASE_URL + product.images[0].thumb}
//                     alt={product.name}
//                     className="size-[100px] rounded-lg mb-4"
//                   />
//                   <h2 className="text-lg text-black font-semibold mb-2 truncate">{product.title}</h2>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleProductView;

