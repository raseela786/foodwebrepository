import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { useNavigate, useParams } from 'react-router-dom';

export const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [profilePic, setProfilePic] = useState(null); // State to handle image preview
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
            setProfilePic(user?.image || null); // Set initial profile image for editing
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

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Show preview of the selected image
            setEditedUser((prevUser) => ({
                ...prevUser,
                image: file, // Save the file to editedUser state
            }));
        }
    };

    // Handle saving the changes to the server
    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", editedUser?.name);
        formData.append("email", editedUser?.email);
        formData.append("password", editedUser?.password);
        formData.append("phone", editedUser?.phone);

        if (editedUser?.image) {
            formData.append("image", editedUser?.image); // Add image to form data if present
        }

        try {
            await axiosInstance({
                method: "PUT",
                url: `/user/update/${user?._id}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data", // Set content type for file upload
                },
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
        setProfilePic(user?.image || null); // Revert profile picture
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
            setProfilePic(user?.image || null); // Set initial profile image
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                    {/* Display profile image */}
                    <div className="mb-4">
                        {isEditing ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full mb-4"
                                />
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full mx-auto object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                                        <span className="text-xl text-white">No Image</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {user?.image ? (
                                    <img
                                        src={user?.image}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full mx-auto object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                                        <span className="text-xl text-white">No Image</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

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
