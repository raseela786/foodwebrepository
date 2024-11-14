import React from 'react'
import { useNavigate } from 'react-router-dom';
export const Adminlogout = () => {


const handleLogout = async () => {
  try {
      const response = await axiosInstance({
          method: "POST",
          url: "/admin/logout",
      });
    
      navigate('/logings')
  } catch (error) {
      console.log(error);
  }
};}