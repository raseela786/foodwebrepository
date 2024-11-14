
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";


export const UsersDetailsPage = () => {
    const [user, setUser] = useState([]);

    const navigate = useNavigate()

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance ({
                method: "GET",
                url: "/user/userProfiles",
            });
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/user/logout",
            });
          
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        fetchUserProfile();
    }, []);
    return (
        <div className="container mx-auto py-8">
          {user.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {user.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                >
                  
    
                  {/* User Details */}
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h1>
                  <h2 className="text-lg text-gray-600 mb-4">{user.email}</h2>
    
                  {/* Optional: Add some extra information if needed */}
                  {/* <p className="text-sm text-gray-500">More details about the user.</p> */}
    
                  {/* Optionally, you could add a button or link to view more */}
                  {/* <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">View Profile</button> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-xl">No users found.</p>
          )}
        </div>
      );
    };