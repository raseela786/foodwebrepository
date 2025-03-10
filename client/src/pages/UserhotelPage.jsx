import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from '../components/ui/Skeleton'; // Import Skeleton from your UI components
import { axiosInstance } from "../config/axiosinstance";
import { Link } from 'react-router-dom';

export const HotelsDetailsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hotel list details
  const fetchHotelList = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/hotel/hotelList", // Endpoint for fetching hotel list
      });

      console.log("API Response:", response); // Log the full response
      console.log("Response Data:", response?.data); // Log the data part of the response

      // Safely check if 'data' contains an array and then set it to the state
      if (Array.isArray(response?.data?.data)) {
        setHotels(response?.data?.data); // Access the 'data' array from the response
      } else {
        console.error("Expected an array inside 'data', but received:", response?.data?.data);
        setHotels([]); // Set an empty array if data is not valid
      }

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log("Error fetching hotel list:", error);
      setLoading(false); // Stop loading even if there was an error
    }
  };

  useEffect(() => {
    fetchHotelList();
  }, []);

  return (
    <div className="container mx-auto py-8">
      {/* Skeleton loading effect */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
          {/* Render Skeletons */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
          {/* Render Hotels */}
          {Array.isArray(hotels) && hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="max-w-xs bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between"
              >
                {/* Hotel Image */}
                <img
                  src={hotel.image || 'default-image-url.jpg'}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-t-3xl mb-4"
                />
                <div className="px-4 py-4 flex flex-col items-center text-center">
                  {/* Hotel Name */}
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.name}</h1>
                  {/* Hotel Mobile */}
                  <p className="text-md text-gray-600 mb-4">Mobile: {hotel.mobile}</p>

                  {/* Wrap the button inside the Link component for navigation */}
                  <Link to={`/hotelmenu/${hotel?.name}`}>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-500 transition-colors duration-300 transform hover:scale-105"
                    >
                      Menu Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-600">No hotels found.</p>
          )}
        </div>
      )}
    </div>
  );
};
