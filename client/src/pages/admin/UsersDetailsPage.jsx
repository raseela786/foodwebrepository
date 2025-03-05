import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";
import toast from "react-hot-toast";

export const UsersDetailsPage = () => {
    const [users, setUsers] = useState([]); // Changed state to hold an array of users
    const navigate = useNavigate();

    // Fetch user profile details
    const fetchUserProfiles = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/userProfiles",
            });
            setUsers(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/user/logout",
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    // Delete a user
    const handleDeleteUser = async (_id) => {
      alert(_id)
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: `/user/userDelete/${_id}`, // Corrected endpoint to match backend
              
            });

            if (response.status === 200) {
                // Remove the deleted user from the state
                setUsers(users.filter((user) => user._id !== _id));
              
              toast.success('User deleted successfully');
            }
        } catch (error) {
            console.log("Error deleting user:", error);
            alert('Failed to delete user');
        }
    };

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    return (
        <div className="container mx-auto py-8">
            {users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* User Details */}
                            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h1>
                            <h2 className="text-lg text-gray-600 mb-4">{user.email}</h2>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteUser(user._id)} // Call handleDeleteUser with the user's ID
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 text-xl">No users found.</p>
            )}
        </div>
    );
};
