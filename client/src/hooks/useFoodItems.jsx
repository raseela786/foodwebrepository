import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosinstance";

export const useFoodItems= ()=>
{
    const [data,setdata]=useState([]);
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true);
    console.log(data,"====data")
   const fetchfoodlist = async () =>
    {
      console.log("iside fetch foodlist")
      try{
  
        const respons= await axiosInstance({
  
          
          method:"GET",
          url:"/food/foodList",
        });
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrespose",respons);
        setTimeout(() => {
          setdata(respons?.data?.data)
        setLoading(false)
        }, 1000);
        
      }
      catch(error)
      {
        console.log(error);
        setError(error)
        setLoading(true)
      }
    
  };
  useEffect(()=>
    {
      fetchfoodlist();
  }, []);
  return [data,error,loading];
}