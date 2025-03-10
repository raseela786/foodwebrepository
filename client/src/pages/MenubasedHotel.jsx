import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';
import { Skeleton } from '../components/ui/Skeleton';
import { FoodCards } from '../components/Cards';

export const MenubasedHotel = () => {
  const { name } = useParams(); // Get the hotel name from URL params
  const navigate = useNavigate();
  const [fooddetails, setFooddetails] = useState([]); // To store the food items
  const [loading, setLoading] = useState(true); // Loading state to show skeletons

  // Fetch food items based on the hotel name
  const fetchFoodDetails = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/food/foodList/${name}`, // Make sure the API path is correct
      });

      // Log the response for debugging
      console.log('Fetched food items:', response);

      // Set food details in the state
      setFooddetails(response?.data?.data || []);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error('Error fetching food items:', error);
      setLoading(false); // Stop loading even if there is an error
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchFoodDetails();
  }, [name]); // Fetch food items when hotel name changes

  // Skeletons to show while loading
  const skeletons = Array.from({ length: 5 }, (_, index) => <Skeleton key={index} />);

  return (
    <div className="container mx-auto py-8">
      {/* Display Skeletons if loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
          {skeletons}
        </div>
      ) : (
        // Render Food Cards if data is available
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
          {fooddetails.length > 0 ? (
            fooddetails.map((food) => (
              <div
                key={food._id}
                className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Pass the food item to the FoodCards component */}
                <FoodCards food={food} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-600">No food items found for this hotel.</p>
          )}
        </div>
      )}
    </div>
  );
};
