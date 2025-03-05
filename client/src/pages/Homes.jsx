import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Homes = () => {
  
  return (
  <div>
  {/* Hero Section with Banner Image */}
  <div
    className="relative w-full h-96 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-4">
        Savor the Best Meals, Delivered Fast
      </h1>
    </div>
  </div>

  {/* Content Below the Hero */}
  <div className="p-6">
    <p className="text-lg text-gray-600 font-semibold tracking-wide text-center md:text-xl md:text-gray-700 sm:px-8">
      Explore a wide variety of cuisines and have them delivered
      <span className="text-yellow-500 font-extrabold"> straight to your door</span>.
    </p>
  </div>
</div>
);
}