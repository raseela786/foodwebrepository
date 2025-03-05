import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosinstance';
import { Link } from "react-router-dom";

export const DashBoard = () => {
  const [hotelDetails, setHotelDetails] = useState([]); // List of hotels
  const [foodDetails, setFoodDetails] = useState([]); // List of food items
  const [selectedHotel, setSelectedHotel] = useState(null); // Store selected hotel for editing
  const [selectedFood, setSelectedFood] = useState(null); // Store selected food for editing
  const [isEditing, setIsEditing] = useState(false); // Track whether we are editing or not
  const [activeView, setActiveView] = useState(''); // Store active view

  // Fetch hotels from the backend
  const fetchHotels = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/hotel/hotelList',
      });
      setHotelDetails(response?.data?.data); // Set the fetched hotels into the state
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to load hotel data');
    }
  };

  // Fetch food items from the backend
  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/food/foodList',
      });
      setFoodDetails(response?.data?.data); // Set the fetched food items into the state
    } catch (error) {
      console.error('Error fetching food data:', error);
      toast.error('Failed to load food data');
    }
  };

  // Handle submit for updating hotel details
  const handleHotelSubmit = async (data) => {
    if (isEditing && selectedHotel) {
      try {
        const updatedData = {
          name: data.get('name'),
          location: data.get('location'),
          mobile: data.get('mobile'),
          description: data.get('description'),
        };

        await axiosInstance({
          method: 'PUT',
          url: `/hotel/update/${selectedHotel._id}`,
          data: updatedData,
        });

        toast.success('Hotel updated successfully!');
        
        // Re-fetch the list of hotels to get the updated data
        fetchHotels();

        setIsEditing(false);
        setSelectedHotel(null);
      } catch (error) {
        console.error('Error updating hotel:', error);
        toast.error('Failed to update hotel');
      }
    }
  };

  // Handle delete hotel
  const deleteHotel = async (_id) => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/hotel/delete/${_id}`,
      });
      toast.success('Hotel deleted successfully!');
      setHotelDetails(hotelDetails.filter((hotel) => hotel._id !== _id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast.error('Failed to delete hotel');
    }
  };

  // Handle submit for updating food details
  const handleFoodSubmit = async (data) => {
    if (isEditing && selectedFood) {
      try {
        const updatedData = {
          title: data.get('title'),
          price: data.get('price'),
          image: data.get('image'),
          hotel: data.get('hotel'),
        };

        await axiosInstance({
          method: 'PUT',
          url: `/food/update/${selectedFood._id}`,
          data: updatedData,
          headers: {
            'Content-Type': 'multipart/form-data', // Important header for file uploads
          },
        });

        toast.success('Food updated successfully!');
        
        // Re-fetch the list of food items to get the updated data
        fetchFoodList();

        setIsEditing(false);
        setSelectedFood(null);
      } catch (error) {
        console.error('Error updating food:', error);
        toast.error('Failed to update food');
      }
    }
  };

  // Handle file input change for image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFood((prevFood) => ({
          ...prevFood,
          image: reader.result,  // Use base64 image for preview
        }));
      };
      reader.readAsDataURL(file); // Read the file as base64 URL
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedHotel(null);
    setSelectedFood(null);
  };

  // Switch between views (Hotel List, Food List)
  const handleChangeView = (view) => {
    setActiveView(view);
    if (view === 'hotelList') {
      fetchHotels(); // Fetch hotels when switching to Hotel List view
    } else if (view === 'foodList') {
      fetchFoodList(); // Fetch food items when switching to Food List view
    }
  };

  useEffect(() => {
    // Fetch both hotels and food items on initial load
    fetchHotels();
    fetchFoodList();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link to={"/admin/Food-adding"}>Food Adding</Link>
          </li>
          <li>
            <Link to={"/admin/hotel"}>Hotel Adding</Link>
          </li>
          <li>
            <button onClick={() => handleChangeView('hotelList')}>Hotel List</button>
          </li>
          <li>
            <button onClick={() => handleChangeView('foodList')}>Food Item List</button>
          </li>
          <li>
            <Link to={"/admin/users"}>Registered Users</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-6 w-full">
        {/* Conditional Rendering based on activeView */}
        {activeView === 'hotelList' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotelDetails.map((hotel) => (
              <div key={hotel._id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">{hotel.name}</h3>
                <p className="text-lg text-gray-700 mb-2">
                  Location: <span className="font-semibold">{hotel.location}</span>
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  Phone: <span className="font-semibold">{hotel.mobile}</span>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Description: <span className="italic">{hotel.description}</span>
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteHotel(hotel._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'foodList' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {foodDetails.map((food) => (
              <div key={food._id} className="max-w-xs bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                <figure className="relative">
                  <img src={food.image} alt={food.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-4 left-4 bg-white text-black py-1 px-4 rounded-full shadow-md text-sm font-semibold">
                    {food.hotel}
                  </div>
                </figure>
                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">{food.title}</h2>
                  <p className="text-lg font-medium text-green-600">{food.price}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedFood(food);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFood(food._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Hotel Form */}
        {isEditing && selectedHotel && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">Edit Hotel</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleHotelSubmit(new FormData(e.target)); }}>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Hotel Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedHotel.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedHotel.location}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="mobile"
                  defaultValue={selectedHotel.mobile}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedHotel.description}
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full mb-2">Update Hotel</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary w-full">Cancel</button>
            </form>
          </div>
        )}

        {/* Edit Food Form */}
        {isEditing && selectedFood && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">Edit Food</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleFoodSubmit(new FormData(e.target)); }}>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Food Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedFood.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={selectedFood.price}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange} // Handle file input change
                  className="input input-bordered w-full"
                />
                {selectedFood.image && (
                  <div className="mt-2">
                    <img
                      src={selectedFood.image}
                      alt="Preview"
                      className="max-w-xs max-h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Hotel</label>
                <input
                  type="text"
                  name="hotel"
                  defaultValue={selectedFood.hotel}
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full mb-2">Update Food</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary w-full">Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
