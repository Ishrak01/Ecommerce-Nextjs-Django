
"use client"
import { withAuth } from "@/withAuth";
import Link from "next/link";
import { useState } from 'react';
import toast from "react-hot-toast";
import { useCartQuery, useDeleteCartItemMutation, useUpdateCartQuantityMutation } from "../Features/Cart/cartApi";
import BASE_URL from "../components/BaseUrl";

const Cart = () => {
  
  
  const { data: cartItems, isLoading: loading } = useCartQuery();
  const [removeCartItem, { isLoading: loading3 }] = useDeleteCartItemMutation();
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const [updateCartItem,{isLoading:loading2}] = useUpdateCartQuantityMutation();

  const handleUpdateCartItem = (user_cart_id, cartId, product_id, quantity) => {
    setUpdatingItemId(product_id); 
  
    updateCartItem({ 
      user_cart_id, 
      body: [{ 
        "id": cartId, 
        "quantity": Math.max(quantity, 1) 
      }]
    }).then(() => {
      setUpdatingItemId(null);
    }).catch((error) => {
      console.log("Error updating cart item:", error); // Log the error response
      setUpdatingItemId(null);
      if (error.response && error.response.data && error.response.data.detail) {
        // Show toast notification for the error message
        toast.error(error.response.data.detail);
      }
    });
  };
  

  const handleRemoveCartItem = (user_cart_id, item_id) => {
    removeCartItem({ user_cart_id, item_id });
  };

  const calculateTotalPrice = () => {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.items.reduce((subTotal, item) => {
        return subTotal + item.product.selling_price * item.quantity;
      }, 0);
    }, 0);
  };



  if (loading || loading2 || loading3) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-opacity-25 border-r-4 border-gray-300 h-16 w-16 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="text-gray-600 font-extrabold">Your cart is empty!</p>
        <br />
        <Link href="/">Go to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg p-8">
        <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
        <ul className="space-y-8">
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img className="h-16 w-16 rounded-md" src={BASE_URL + item.product.images[0].thumb} alt={item.product.title} />
                    <div>
                      <h3 className="text-lg font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">Price: BDT {item.product.selling_price}</p>
                      
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      disabled={updatingItemId === item.id || item.product.stock <= 0}
                      onClick={() => {
                        setUpdatingItemId(item.id);
                        handleUpdateCartItem(cartItem.id, item.id, item.product.id, item.quantity + 1);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md">{item.quantity}</span>
                    <button
                      disabled={updatingItemId === item.id || item.product.stock <= 0}
                      onClick={() => {
                        setUpdatingItemId(item.id);
                        handleUpdateCartItem(cartItem.id, item.id, item.product.id, item.quantity - 1);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      -
                    </button>
                    <button
                      disabled={updatingItemId === item.id}
                      onClick={() => handleRemoveCartItem(cartItem.id, item.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-between">
          <span className="text-lg font-semibold">Total: BDT {calculateTotalPrice()}</span>
          <Link href="/checkout">
            <p className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Checkout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Cart);
