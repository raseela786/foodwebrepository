import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosinstance';
import { CartCards } from '../../components/Cards';
import { loadStripe } from "@stripe/stripe-js";
export const CartPage = () => {
    const [cartItems,setCartItems]=useState([])
    const [cartData,setCartData]=useState({})
    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/cart/",
            });
            
            console.log("=============cart",response)
            setCartItems(response?.data?.data?.foodItems);
       setCartData(response.data?.data)
           //setCartItems(response?.data?.data?.courses);
           // setCartData(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(cartItems,"-cartitenm")
    console.log("cartdaaaaaaaaaaaaaaata",cartData)
    
    console.log(cartItems,"-cartitenm")
    console.log("cartdaaaaaaaaaaaaaaata",cartData)
    
  // Remove item from the cart
  const handleRemoveItem = async (itemId) => {
    alert(itemId)
    try {
      // You can make an API call to remove the item from the cart in the backend here
      // Example: await axiosInstance.delete(`/cart/remove-item/${itemId}`);

      // For now, let's remove it locally from the state
     
      const response = await axiosInstance({
        method: "PUT",
        url: "/cart/remove",
        data: { foodId: itemId},
      })
      
      // If the server responds successfully, update the local state
      if (response.status === 200) {
        // Update the cart locally by filtering out the removed item
        const updatedCartItems = cartItems.filter((item) => item.foodId._id !== itemId);
        setCartItems(updatedCartItems);
        setCartData(response.data?.data)
      }
    } catch (error) {
      console.log('Error removing item:', error);
    }
  };
    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products :cartItems },
            });

            console.log(session, "=======session");
            const result = stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });

        } catch (error) {
            console.log(error);
        }
    };

useEffect(()=>
{
    fetchCartItems();
},[]);
return (
  <div className='flex gap-10 px-10 py-10'>
    {/* Cart Items Section */}
    <div className='w-8/12'>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cartItems.map((value, index) => (
        <CartCards item={value} key={index} onRemove={handleRemoveItem} />
      ))}
    </div>

    {/* Price Summary Section */}
    <div className='w-4/12 bg-white rounded-lg shadow-md p-6 flex flex-col gap-6'>
      <h2 className='text-2xl font-semibold text-gray-800'>Price Summary</h2>

      {/* Price Details */}
      <div className="flex justify-between text-gray-700">
        <span className="font-medium">Subtotal:</span>
        <span className="font-semibold">{cartData?.subtotal || '0.00'}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span className="font-medium">Shipping:</span>
        <span className="font-semibold">{cartData?.shipping || '0.00'}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span className="font-medium">Taxes:</span>
        <span className="font-semibold">{cartData?.taxes || '0.00'}</span>
      </div>
      
      {/* Total Price */}
      <div className="flex justify-between text-xl font-semibold text-gray-900 border-t pt-4 mt-4 border-gray-300">
        <span>Total Price:</span>
        <span>{cartData?.totalPrice || '0.00'}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={makePayment}
        className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none transition-colors duration-200"
      >
        Checkout
      </button>
    </div>
  </div>
);
};

