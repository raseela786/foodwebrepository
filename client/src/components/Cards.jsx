import React from 'react'
import { Link } from 'react-router-dom'
export const FoodCards = ({ food }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden transition-all duration-300 ease-in-out">
      {/* Image Section */}
      <div className="relative rounded-t-2xl overflow-hidden">
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-48 object-cover rounded-t-2xl transform transition-all duration-300 ease-in-out hover:scale-110"
        />
        {/* Hotel Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-4 rounded-full shadow-md text-xs font-semibold">
          {food.hotel}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Food Title */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">{food.title}</h2>

        {/* Price */}
        <p className="text-xl font-medium text-green-600">{`$${food.price.toFixed(2)}`}</p>

        {/* More Details Button */}
        <div className="flex justify-between items-center mt-4">
          <Link to={`/fooditem-details/${food?._id}/${food.hotel}`}>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-full hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300">
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export const CartCards = ({ item, product,onRemove,onUpdateQuantity }) => {
  const handleRemoveClick = () => {
    // Trigger the onRemove function passed from the CartPage component
    onRemove(item.foodId._id);
    
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increment") {
      onUpdateQuantity(item.foodId._id, item.quantity + 1);
    } else if (operation === "decrement" && item.quantity > 1) {
      onUpdateQuantity(item.foodId._id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4 mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* Food Image */}
      <img
        src={item?.foodId?.image}
        alt="cart-item"
        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
      />

      {/* Food Info */}
      <div className="flex-1 ml-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{item?.foodId?.title}</h2>
        <p className="text-sm text-gray-600">{item?.foodId?.description}</p>
        <p className="text-lg font-bold text-green-500 mt-1">{item?.foodId?.price}</p>
      </div>
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange("decrement")}
          className="px-2 py-1 bg-yellow-500 rounded-full hover:bg-red-500 transition-colors"
        >
          -
        </button>
        <span className="text-lg">{item?.quantity}</span>
        <button
          onClick={() => handleQuantityChange("increment")}
          className="px-2 py-1 bg-yellow-500 rounded-full hover:bg-red-500 transition-colors"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemoveClick}
        className="bg-red-600 text-white py-1.5 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none"
      >
        Remove
      </button>
    </div>
  );
};