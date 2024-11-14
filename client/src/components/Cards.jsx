import React from 'react'
import { Link } from 'react-router-dom'

export const FoodCards = ({ food }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      {/* Image */}
      <figure className="relative">
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {/* Hotel Badge */}
        <div className="absolute top-4 left-4 bg-white text-black py-1 px-4 rounded-full shadow-md text-sm font-semibold">
          {food.hotel}
        </div>
      </figure>

      {/* Card Body */}
      <div className="p-6 space-y-3">
        {/* Food Title */}
        <h2 className="text-xl font-semibold text-gray-800 truncate">{food.title}</h2>

        {/* Price */}
        <p className="text-lg font-medium text-green-600">{food.price}</p>

        {/* More Details Button */}
        <div className="flex justify-end mt-4">
          <Link to={`/fooditem-details/${food?._id}/${food.hotel}`}>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors duration-200">
              More details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export const CartCards = ({ item, product,onRemove }) => {
  const handleRemoveClick = () => {
    // Trigger the onRemove function passed from the CartPage component
    onRemove(item.foodId._id);
    
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