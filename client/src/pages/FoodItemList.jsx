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
      <div className="grid grid-cols-1  md:grid-cols-4">
        {loading ? skeletons : data.map((value) => (
          <FoodCards food={value} key={value?._id} />
        ))}
      </div>
    );
}
