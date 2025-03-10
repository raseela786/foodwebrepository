import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  return (
    <div className="relative z-10 flex justify-between items-center w-full px-8 md:px-32 py-4 h-24 bg-primary-content shadow-lg">
      {/* Logo Section with Italicized Styling */}
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
        <Link to={"/login"} className="hover:text-indigo-600 transition duration-300">
          Login
        </Link>
      </nav>

      {/* Dark Mode Toggle and Join Us Button (visible on desktop) */}
      <div className="hidden md:flex items-center gap-6">
        <DarkMode />
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-primary py-2 px-6 rounded-md text-white font-semibold transition-all duration-300 hover:bg-indigo-700"
        >
          Join Us
        </button>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-3xl">
          ☰ {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="absolute z-20 top-0 left-0 right-0 flex flex-col items-center space-y-4 py-4 bg-gray-900 text-white">
          {/* Home Link */}
          <Link
            to={"/"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Home
          </Link>

          {/* Menu Link */}
          <Link
            to={"/food"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Menu
          </Link>

          {/* Login Link */}
          <Link
            to={"/login"}
            className="text-lg text-white hover:bg-red-500 hover:text-white py-2 px-6 rounded-md transition duration-300"
            onClick={toggleMenu} // Close the menu on click
          >
            Login
          </Link>

          {/* Always visible Join Us Button */}
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary py-2 px-6 rounded-md text-white font-semibold transition-all duration-300 hover:bg-indigo-700"
          >
            Join Us
          </button>
        </div>
      )}

      {/* Always visible Join Us Button (not inside the hamburger menu) */}
      <div className="md:hidden flex items-center mt-4">
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-primary py-2 px-6 rounded-md text-white font-semibold transition-all duration-300 hover:bg-indigo-700"
        >
          Join Us
        </button>
      </div>
    </div>
  );
};
