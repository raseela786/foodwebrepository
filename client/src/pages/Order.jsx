import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosinstance";


const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
     
      const response = await axiosInstance({
        url: "/order/my-orders",
        method: "GET",
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
    
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">
                  Total: <span className="font-bold text-xl">${order.totalPrice.toFixed(2)}</span>
                </p>
              </div>

              <ul className="list-disc pl-5 text-sm text-gray-600">
                {order.products?.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.quantity} × ${ (product.price / 100).toFixed(2)}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-gray-500">
                <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
