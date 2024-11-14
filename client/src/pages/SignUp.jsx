import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../config/axiosinstance';
export const SignUp = () => {
const {register,handleSubmit}=useForm();
const navigate=useNavigate();
const onSubmit = async (data)=>
{
  try{
    const reponse =await axiosInstance(
      {
        method:"POST",
        url:"/user/signup",
        data
      }
    )
    toast.success("Registered successfully");
navigate('/')
  }
  catch(error)
  {
    toast.error("Registration failed")
    console.log(error)
  }
}


  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign UP now!</h1>
      <p className="py-6">
      Create an account and start enjoying delicious meals at your doorstep!!
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register('name')}placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register('email')} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input type="number" {...register('phone')} placeholder="Phone" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register('password')} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <Link to={'/login'}>Existing User?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

