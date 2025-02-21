import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserHeader } from '../components/user/Header'
import { useDispatch, useSelector } from 'react-redux'

import { AdminHeader } from '../components/admin/Header'
import { clearUser, saveUser } from '../redux/features/userSlice'
import { axiosInstance } from '../config/axiosinstance'
//import { clearUser, saveUser } from '../redux/features/userSlice'
export const AdminLayout = () => {
  const [loading,setLoaading]=useState(true);
  console.log("ussssssssssssserllllllllllllayou")
  // const [isUserExist,setIsUserExist]= useState(true);
  //const { isUserExist } = useSelector((state) => state.user);
  const {isUserExist} =useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const location= useLocation();
  console.log(isUserExist,"=================isuser")
  const checkuser =async()=>{
    try{
        const response =await axiosInstance(
          {
            method:"GET",
            url:"/admin/check-user",
    
          }
        );
       
   dispatch(saveUser())
   setLoaading(false);
       
}
catch(error)
{
    dispatch(clearUser())
    console.log(error)
setLoaading(false)
}
}
useEffect(()=>{    
  checkuser();
},[location.pathname])

  return loading ? null :(
    <div>
     {isUserExist && <AdminHeader/>} 
    <div className='min-h-96'><Outlet/></div>
   </div>
  )
}
