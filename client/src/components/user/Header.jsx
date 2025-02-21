import React from "react";
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import useUserProfile from "../../pages/Profilepic";
export const UserHeader = () => {
    const { user, loading, error } =useUserProfile();
   return (
  <div className="flex justify-between items-center w-full px-5 md:px-10 lg:px-20 h-24 bg-primary-content">
    {/* Logo */}
    <Link to={"/"}>
      <div className="text-3xl font-bold">Logo</div>
    </Link>

    {/* Navigation Links (Desktop) */}
    <nav className="hidden md:flex gap-16 items-center font-semibold">
      <Link to={"/"}>Home</Link>
      <Link to={"/food"}>Menu</Link>
      <Link to={"user/order"}>Your Order</Link>
    </nav>

    {/* Right Side (DarkMode, Cart, Profile) */}
    <div className="flex gap-10 items-center"> {/* Increased gap to 10 */}
      <DarkMode />
      <Link to={"user/cart"}>
        <ShoppingBag />
      </Link>
      <Link to={'/user/profile'}>
        {user && user.image ? (
          <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full" />
        ) : (
          <CircleUser />
        )}
      </Link>
    </div>

    {/* Mobile Navigation */}
    <div className="md:hidden flex items-center">
      <button className="text-xl">
        <i className="fas fa-bars"></i>
      </button>
    </div>
  </div>
);

};