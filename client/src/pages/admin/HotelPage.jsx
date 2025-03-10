import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosinstance';

export const HotelPage =() => {
  const { register, handleSubmit } = useForm();
  const navigate= useNavigate();
  const onSubmit = async(data )=>
    {
      alert(data.name)
      alert(data.description)
      alert(data.location)
     alert(data.mobile)
try{
   // Create FormData object to handle file upload
   const formData = new FormData();
   formData.append('name', data.name);
   formData.append('description', data.description);
   formData.append('location', data.location);
   formData.append('mobile', data.mobile);
   formData.append('image', data.image[0]); // Assuming only one image is selected

 // Log the FormData content to inspect it
 for (let [key, value] of formData.entries()) {
   console.log("raseeeeeeeeeeeeeee",key, value);
 }
const response =await axiosInstance(
  {
    method:"POST",
    url:"/hotel/create",
    data:formData,
    headers: {
      'Content-Type': 'multipart/form-data', // Important header for file uploads
    },
  }
)
console.log("response",response);
toast.success("Hotel added successfully!");
navigate("/admin/dashboard");
}
catch(error)
{

  console.log(error)
}
       }
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Add now!</h1>
     
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}> 
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register('name')}placeholder="Hotel name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text"{...register('description')} placeholder="description" className="input input-bordered" required />
        
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">location</span>
          </label>
          <input type="text"{...register('location')} placeholder="location" className="input input-bordered" required />
        
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile</span>
          </label>
          <input type="text"{...register('mobile')} placeholder="mobile number" className="input input-bordered" required />
        
        </div>
        
        <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input type="file" {...register('image')} placeholder="picture" className="input input-bordered" required />
            </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add Hotel details</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
