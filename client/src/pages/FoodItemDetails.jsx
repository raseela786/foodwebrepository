import React,{useEffect,useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../config/axiosinstance'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
export const FoodItemDetails = () => {
  const [fooddetails,setfooddetails]=useState([]);
  const [hotelDetails,sethotelDetails]=useState([]);
  const {name} =useParams();
  const {id} =useParams();
  const navigate= useNavigate();
  console.log(id)
  const fetchfooDetals = async () =>
    {

      try{
  
        const respons= await axiosInstance({
  
          
          method:"GET",
          url:`/food/foodDetails/${id}`,
        });
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrespose",respons);
        setfooddetails(respons?.data?.data)
      }
      catch(error)
      {
        console.log(error);
      }
    
  };
  const addToCart = async () => {
    try {
        const response = await axiosInstance({
            url: "/cart/add-to-cart",
            method: "POST",
            data: { foodId: fooddetails._id },
        });
        console.log(response);
        toast.success('item added to cart')
        navigate("/user/cart")
    } catch (error) {
        toast.error('item could not added to cart please login')
        navigate("/")
    }
};
const hoteldetails = async () => {
  try {
      const respons = await axiosInstance({
          url: `/hotel/hotelDetails/${name}`,
          method: "GET",
   
      });
      console.log(respons,"hotel del tails");
      toast.success('hotel details')
      sethotelDetails(respons?.data?.data)
  } catch (error) {
      toast.error('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
      navigate("/")
  }
};

  useEffect(()=>
    {
      fetchfooDetals();
      hoteldetails();
  }, []);
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Main Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
  
        {/* Food Details Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 flex-1 max-w-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{fooddetails.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{fooddetails.description}</p>
          <h3 className="text-xl text-green-600 font-bold mb-4">Price: ${fooddetails.price}</h3>
  
          {/* Image */}
          <div className="mb-4">
            <img
              className="w-full h-60 object-cover rounded-lg shadow-md"
              src={fooddetails.image}
              alt={fooddetails.title}
            />
          </div>
  
          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
  
        {/* Hotel Details Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 flex-1 max-w-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hotel Details</h3>
          {hotelDetails ? (
            <>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Name: {hotelDetails.name}</h4>
              <p className="text-lg text-gray-700 mb-2">Location: {hotelDetails.location}</p>
              <p className="text-lg text-gray-700 mb-4">Phone: {hotelDetails.mobile}</p>
            </>
          ) : (
            <p className="text-lg text-gray-500">Loading hotel details...</p>
          )}
        </div>
      </div>
    </div>
  );
}  