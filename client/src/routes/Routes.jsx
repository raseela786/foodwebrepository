import {createBrowserRouter} from "react-router-dom"
import { Homes } from "../pages/Homes"

import { About } from "../pages/About";
import { FoodItemList } from "../pages/FoodItemList";
import { FoodItemDetails } from "../pages/FoodItemDetails";

import { SignUp } from "../pages/SignUp";
import { UserLayout } from "../layout/UserLayout";
import { AuthUser } from "./protectedRoutes/AuthUser";
import { ProfilePage } from "../pages/user/ProfilePage";
import { ErrorPage } from "../pages/ErrorPage";
import { CartPage } from "../pages/user/CartPage";
import { Heading2 } from "lucide-react";
import { AdminLayout } from "../layout/AdminLayout";
import { LoginPageA } from "../pages/admin/LoginPageA";
import { HotelPage } from "../pages/admin/HotelPage";
import { FoodAddingPage } from "../pages/admin/FoodAddingPage";
import { Orders } from "../pages/admin/Orders";
import { UsersDetailsPage } from "../pages/admin/UsersDetailsPage";
import { DashBoard } from "../pages/admin/DashBoard";
import { Adminlogout } from "../pages/admin/Adminlogout";
import { SuccessPage } from "../pages/user/payment/SuccessPage";
import { LoginPage } from "../pages/LoginPage";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'',
          element:<Homes/>,
        },
        {
          path:'about',
          element:<About/>,
        },
        {
          path: "login",
          element: <LoginPage/>
      },
      {
          path: "signup",
          element: <SignUp/>,
      },
      {
          path: "food",
          element: <FoodItemList />,
      },
      {
          path: "fooditem-details/:id/:name",
          element: <FoodItemDetails />,
      },
      {
        path:'user',
        element:  <AuthUser/>,
     
        children:[
          {
          path:"profile",
          element:<ProfilePage/>
        },
        {
          path:"cart",
          element:<CartPage/>
        },
        {
          path: "payment/success",
  element:<SuccessPage/>
      },
      
      
      {
        path: "payment/cancel",
        element: <h2>failed</h2>
    },
        ],
            },
      ],
    },
   
    {    
      path:'admin',
element:<AdminLayout/>,


        children:[
          {
            path:"logings",
            element: <LoginPageA/>
          },
          {
            path:"logout",
            element: <Adminlogout/>
          },
          
          {
            path:"",
                   // element: ,
            children:[
              {
                path:"dashboard",
                element: <DashBoard/>
              },
          {
          path:"hotel",
          element: <HotelPage/>
        },
        {
          path:"Food-adding",
          element: <FoodAddingPage/>
        },
        {
          path:"orders",
          element:<Orders/>
        },
        {
          path:"users",
          element: <UsersDetailsPage/>
        },
        
        ]
    }
  ]
    }
  
  ]);