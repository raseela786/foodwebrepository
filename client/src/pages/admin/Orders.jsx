
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";


export const Orders = () => {
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
      <div>
          {user.length > 0 ? (
              user.map((user) => (
                  <div key={user.id} className="user-profile"> {/* Use a unique key */}
                      <h1>{user.name}</h1>
                      <h2>{user.email}</h2>
                      <img src={user.profilePic} alt={`${user.name}'s profile`} />
                     
                      <br />
                  </div>
              ))
          ) : (
              <p>No users found.</p>
          )}
        
      </div>
  );
};