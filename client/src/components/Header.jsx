import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full px-6 md:px-20 py-4 h-24 bg-primary-content shadow-lg">
      {/* Logo Section with Italicized Styling */}
      <Link to={"/"} className="flex items-center space-x-2">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text italic hover:text-white transition-all duration-500">
          Get Your Favorite Food
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-10 items-center font-semibold text-lg text-yellow-800">
        <Link to={"/"} className="hover:text-indigo-600 transition duration-300">
          Home
        </Link>

        <Link to={"/food"} className="hover:text-indigo-600 transition duration-300">
          Menu
        </Link>

        <Link to={"/login"} className="hover:text-indigo-600 transition duration-300">
          Login
        </Link>
      </nav>

      {/* Dark Mode Toggle and Join Us Button */}
      <div className="flex items-center gap-6">
        <DarkMode />
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
