import React from "react";
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import useUserProfile from "../../pages/Profilepic";
export const UserHeader = () => {
    const { user, loading, error } =useUserProfile();
    return (
        <div className="flex justify-between items-center w-full px-20  h-24 bg-primary-content  ">
           <Link to={"/"}>
                <div className="text-3xl font-bold">Logo</div>
                </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
             
                <Link to={"/food"}>Menu</Link>
               <Link to={"user/order"}>Your Order</Link>
            </nav>

     <div className="flex gap-14 items-center">
        <DarkMode/>
        <Link to={"user/cart"}>  <ShoppingBag /></Link>
   
<Link to={'/user/profile'}>  
{user && user.image ? (
                        // If profilePic exists, display the image
                        <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full" />
                    ) : (
                        // If no profilePic, fallback to the default icon
                        <CircleUser />
                    )}  

 </Link>
     </div>
           
        </div>
    );
};