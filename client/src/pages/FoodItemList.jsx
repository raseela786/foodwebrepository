import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosinstance'
import { FoodCards } from '../components/Cards';
import { useFoodItems } from '../hooks/useFoodItems';
import { Skeleton } from '../components/ui/Skeleton';
export const FoodItemList = () => {

  const [data,error,loading]=useFoodItems() 
/*return (
    <div >
      <h1>Food item list</h1>
      {loading?(
      Array(10).fill({}).map((value,index)=>(
<Skeleton  key={index}/>
      )))
      :(
      <div className="grid grid-cols-3">
    {
    data.map((value)=>(
      <FoodCards food={value} key={value?._id}/>
    ))}
  </div>
      )}    
    </div>
  )
   */ const skeletons = Array.from({ length: 3 }, (_, index) => <Skeleton key={index} />);
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
      {loading ? (
        skeletons
      ) : (
        data.map((value) => (
          <div
            key={value?._id}
            className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            <FoodCards food={value} />
          </div>
        ))
      )}
    </div>
  );
  
}
