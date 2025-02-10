import React from 'react'
import { Link } from "react-router-dom";
import { DarkMode } from '../ui/DarkMode';
import { axiosInstance } from '../../config/axiosinstance';
import { useNavigate } from 'react-router-dom';
export const AdminHeader = () => 

{
  const navigate=useNavigate();
  const logoutAdmin = async () => {
    try {
        const response = await axiosInstance({
            method: "POST",
            url: "/admin/logout",
        });
      
        navigate('/')
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Food Order Admin</h1>
      <nav className="flex gap-16 items-center font-semibold">
                <Link to={"hotel"}>Hotel-adding</Link>
                <Link to={"Food-adding"}>Food-adding</Link>
        
                <Link to={"users"}>RegisteredUsers</Link>
                 
                <Link to={"coupon"}>Coupon Creation</Link>
                <button onClick={logoutAdmin} className="btn btn-secondary"> Log-out </button>
            </nav>

     <div className="flex gap-14 items-center">
      <DarkMode/>

     </div>
           
        </header>
    );
};