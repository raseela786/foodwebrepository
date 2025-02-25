import React, { useEffect, useState } from 'react'; 
import { axiosInstance } from '../../config/axiosinstance';
import { CartCards } from '../../components/Cards';
import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const CartPage = () => {
  const [loadingSubtotal, setLoadingSubtotal] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // State for coupon code
  const [discount, setDiscount] = useState(0); // State for discount applied
  const [discountindiv, setDiscountindiv] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]); // To hold the available coupons
  const [selectedCoupon, setSelectedCoupon] = useState(null); // To hold the selected coupon
  const navigate = useNavigate();

  // Fetch cart items from API
  const fetchCartItems = async () => {
    setLoadingSubtotal(true); // Start loading
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/cart/",
      });
      setCartItems(response?.data?.data?.foodItems);
      setCartData(response.data?.data);
      setFinalAmount(response?.data?.data.totalPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubtotal(false); // End loading
    }
  };

  // Remove item from the cart
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/cart/remove",
        data: { foodId: itemId },
      });

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter((item) => item.foodId._id !== itemId);
        setCartItems(updatedCartItems);
        setCartData(response.data?.data);
        setFinalAmount(response.data.totalPrice || 0);
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.foodId._id === itemId) {
        return { ...item, quantity: newQuantity }; // Update the quantity locally
      }
      return item;
    });
    
    setCartItems(updatedCartItems);
  
    // Send updated quantity to the backend
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/cart/update-quantity", // Endpoint for updating quantity
        data: { foodId: itemId, quantity: newQuantity ,totalPrices:finalAmount}, // Send the updated foodId and quantity
      });
  
      // After updating, you might want to update the final amount as returned from backend
      setFinalAmount(response.data.cart.totalPrice); // Update the final price based on backend response
  
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
  };

  // Calculate total price (subtotal + shipping + taxes - discount)
  const calculateTotal = (items) => {
    const subtotal = items.reduce((total, item) => {
      return total + item?.foodId?.price * item?.quantity;
    }, 0);
    return subtotal - discount;
  };

  // Fetch available coupons based on subtotal
  const fetchAvailableCoupons = async () => {
    const subtotal = calculateTotal(cartItems);
    try {
      const response = await axiosInstance.post("/coupons/getcoupons", { subtotal });
      if (response.data.success) {
        setAvailableCoupons(response.data.coupons);
      } else {
        setAvailableCoupons([]); // Clear the list if no coupons available
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Apply coupon
  const applyCoupon = async () => {
    if (!selectedCoupon) {
      toast.error("Please select a coupon");
      return;
    }
    try {
      const response = await axiosInstance.post("/coupons/apply", {
        couponCode: selectedCoupon.code,
        cartId: cartData._id,
      });

      if (response.data.message === "Coupon applied successfully") {
        const { finalAmount: updatedFinalAmount, discount: discount,discountindiv: discountindiv } = response.data;

        // Set the new discount and finalAmount
        setDiscount(discount || 0);
        setFinalAmount(updatedFinalAmount || calculateTotal(cartItems)); // Recalculate final amount
setDiscountindiv(discountindiv || 0 );
        toast.success("Coupon applied successfully!");
  
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
    }
  };

  // Handle payment
  const makePayment = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: {
          products: cartItems,
          finalprice: finalAmount,
          discounts: discount,
          discountindiv:discountindiv
        },
      });

      const result = await stripe.redirectToCheckout({
        sessionId: session?.data?.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle success redirect
  const handleSuccessRedirect = () => {
    clearCart(); // Clear the cart in the frontend
    navigate("/"); // Redirect to home or success page
    toast.success("Order placed");
  };

  // Clear cart from frontend and localStorage
  const clearCart = () => {
    setCartItems([]); // Update cart items in state
    localStorage.removeItem("cart"); // Clear cart in local storage
  };

  // Recalculate finalAmount whenever cartItems or discount change
  useEffect(() => {
    const updatedTotal = calculateTotal(cartItems);
    setFinalAmount(updatedTotal);
  }, [cartItems, discount]); // Recalculate when cartItems or discount change

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    fetchAvailableCoupons();
  }, [cartItems, discount]); // Re-fetch available coupons when cart items or discount change

  return (
    <div className="flex gap-10 px-10 py-10">
      {/* Cart Items Section */}
      <div className="w-8/12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        {cartItems.map((value, index) => (
          <CartCards
            key={index}
            item={value}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>

      {/* Price Summary Section */}
      <div className="w-4/12 bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">Price Summary</h2>

        {/* Price Details */}
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Subtotal:</span>
          <span className="font-semibold">
            {loadingSubtotal ? "Loading..." : calculateTotal(cartItems).toFixed(2)}
          </span>
        </div>

        {/* Coupon Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Available Coupons</h3>
          {availableCoupons.length > 0 ? (
            <div className="flex flex-col gap-2">
              {availableCoupons.map((coupon) => (
                <div key={coupon.code}>
                  {selectedCoupon && selectedCoupon.code === coupon.code ? (
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-200"
                      disabled
                    >
                      {coupon.code} - {coupon.discount}% OFF (Selected)
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      onClick={() => setSelectedCoupon(coupon)}
                    >
                      {coupon.code} - {coupon.discount}% OFF
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No coupons available</p>
          )}
        </div>

        {/* Apply Coupon Button */}
        <button
          onClick={applyCoupon}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          disabled={!selectedCoupon}
        >
          Apply Coupon
        </button>

        {/* Total Price */}
        <div className="flex justify-between text-xl font-semibold text-gray-900 border-t pt-4 mt-4 border-gray-300">
          <span>Total Price:</span>
          <span>{finalAmount}</span>
        </div>

        {/* Checkout Button */}
        <button onClick={makePayment} disabled={loading}>
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};
