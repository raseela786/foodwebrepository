import React, { useState } from "react";
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import useUserProfile from "../../pages/Profilepic";

export const UserHeader = () => {
  const { user, loading, error } = useUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle mobile menu visibility
  };

  return (
    <div className="relative z-10 flex justify-between items-center w-full px-8 md:px-32 py-4 h-24 bg-primary-content shadow-lg">
      {/* Logo */}
      <Link to={"/"} className="flex items-center space-x-2">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text italic hover:text-white transition-all duration-500">
        OrderEat
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex gap-10 items-center font-semibold text-lg text-yellow-800">
        <Link to={"/"} className="hover:text-indigo-600 transition duration-300">
          Home
        </Link>

        <Link to={"/food"} className="hover:text-indigo-600 transition duration-300">
          Menu
        </Link>
 <Link to={"/hotelsr"} className="hover:text-indigo-600 transition duration-300">
        Restaurants
        </Link>
        <Link to={"user/order"} className="hover:text-indigo-600 transition duration-300">
          Your Order
        </Link>
      </nav>

      {/* Right Side (Desktop) */}
      <div className="hidden md:flex items-center gap-6">
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

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-3xl">
          ☰ {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="absolute z-20 top-24 left-0 right-0 flex flex-col items-center space-y-4 py-4 bg-gray-900 text-white transition-all duration-300">
          <Link
            to={"/"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Home
          </Link>

          <Link
            to={"/food"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Menu
          </Link>

          <Link
            to={"/hotelsr"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
        Restaurants
          </Link>
          <Link
            to={"user/order"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Your Order
          </Link>

          {/* Mobile version of Profile and Cart */}
          <div className="flex gap-5 items-center justify-center mt-5">
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
        </div>
      )}
    </div>
  );
};
