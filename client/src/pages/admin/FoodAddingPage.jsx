import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosinstance';


export const FoodAddingPage = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('hotel', data.hotel);
      formData.append('image', data.image[0]); // Assuming only one image is selected

      const response = await axiosInstance({
        method: "POST",
        url: "/food/create",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file uploads
        },
      });

      console.log("response", response);
      toast.success("Food data added successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

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
              <input type="text" {...register('title')} placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input type="text" {...register('description')} placeholder="description" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="text" {...register('price')} placeholder="price" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hotel Name</span>
              </label>
              <input type="text" {...register('hotel')} placeholder="hotel" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input type="file" {...register('image')} placeholder="picture" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Food details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
