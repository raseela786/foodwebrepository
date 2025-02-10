import React, { useEffect, useState } from 'react'; 
import { axiosInstance } from '../../config/axiosinstance';
import { CartCards } from '../../components/Cards';
import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
import  {useNavigate} from "react-router-dom"
import axios from 'axios';
export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // State for coupon code
  const [discount, setDiscount] = useState(0); // State for discount applied
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  const navigate=useNavigate();
  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/cart/",
      });
      setCartItems(response?.data?.data?.foodItems);
      setCartData(response.data?.data);
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  // Update quantity of a cart item
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.foodId._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Calculate the total price (subtotal + shipping + taxes - discount)
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item?.foodId?.price * item?.quantity;
    }, 0);
    
    return subtotal - discount;
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
        data: { products: cartItems },
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

  /* Apply coupon logic
  const applyCoupon = () => {
    // Example coupon logic: Apply a 10% discount for any coupon code
    if (couponCode) {
      setDiscount(calculateTotal() * 0.1); // Apply 10% discount
    }
  };*//*
  const applyCoupon = async () => {
    try {
      const response = await  axiosInstance.post("/coupons/checkout",
         {
        couponCode,
        cartId: cartData._id,
      });

      if (response.data.message === "Coupon applied successfully") {
        const { finalAmount: updatedFinalAmount, discount: appliedDiscount } = response.data;

        setDiscount(appliedDiscount || 0);
        setFinalAmount(updatedFinalAmount || cartData.totalPrice);
        toast.success("Coupon applied successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
    }
  };*/
// Call clearCart function after successful payment redirection
const handleSuccessRedirect = () => {
  clearCart(); // Clear the cart in the frontend
  navigate("/");
  toast.success("order placed") // Redirect to success page
};
const clearCart = () => {
  setCartItems([]); // Update cart items in state
  localStorage.removeItem("cart"); // Clear cart in local storage
};
const applyCoupon = async () => {
  try {
    const response = await axiosInstance.post("/coupons/apply", {
      couponCode,
      cartId: cartData._id,
    });

    if (response.data.message === "Coupon applied successfully") {
      const { finalAmount: updatedFinalAmount, discount: appliedDiscount } = response.data;

      setDiscount(appliedDiscount || 0);
      setFinalAmount(updatedFinalAmount || cartData.totalPrice);
      toast.success("Coupon applied successfully!");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to apply coupon.");
  }
};
  useEffect(() => {
    fetchCartItems();
  }, []);

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
          <span className="font-semibold">{calculateTotal().toFixed(2)}</span>
        </div>
                {/* Coupon Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Have a coupon?</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="DISCOUNT10"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
      

        </div>

        {/* Total Price */}
        <div className="flex justify-between text-xl font-semibold text-gray-900 border-t pt-4 mt-4 border-gray-300">
          <span>Total Price:</span>
          <span>
            {finalAmount}
          </span>
        </div>

        {/* Checkout Button */}
        <button onClick={makePayment} disabled={loading}>
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};
