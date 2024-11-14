import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { useNavigate, useParams } from 'react-router-dom';

export const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the user profile from the API
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/userProfile",
            });
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle logout action
    const handleLogout = async () => {
        try {
            await axiosInstance({
                method: "POST",
                url: "/user/logout",
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    // Handle edit button click, toggle edit mode
    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // Sync editedUser state with user data when entering edit mode
            setEditedUser({ ...user });
        }
    };

    // Handle input field change while editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle saving the changes to the server
    const handleSave = async () => {
        try {
            await axiosInstance({
                method: "PUT",
                url: `/user/update/${user?._id}`,
                data: editedUser,
            });

            setUser(editedUser); // Update user state with edited values
            setIsEditing(false);  // Exit edit mode
        } catch (error) {
            console.log(error);
        }
    };

    // Handle cancel button click, revert the edited user back to the original state
    const handleCancel = () => {
        setEditedUser(user); // Revert to original user data
        setIsEditing(false);  // Exit edit mode
    };

    // Fetch user profile data when component mounts
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Sync editedUser with user when user data is updated
    useEffect(() => {
        if (user) {
            setEditedUser(user); // Populate editedUser with fetched user data
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={editedUser?.name || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                placeholder="Enter your name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editedUser?.email || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                placeholder="Enter your email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={editedUser?.password || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                placeholder="Enter your password"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editedUser?.phone || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                                placeholder="Enter your phone number"
                            />
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                           
                            <p className="text-sm text-gray-500">{user?.phone}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-8">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
                    >
                        Log-out
                    </button>
                </div>
            </div>
        </div>
    );
};
