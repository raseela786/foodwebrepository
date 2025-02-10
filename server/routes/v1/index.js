const express = require("express");
const {userRouter}=require("./userRoutes");
const {foodRouter}=require("./foodRouter");
const { adminRouter } = require("./adminRoutes");
const { cartRouter } = require("./cartRoutes");
const { reviewRouter } = require("./reviewRoutes");
const { hotelRouter } = require("./hotelRoutes");
const {  paymentRoute } = require("./paymentRoutes");
const { couponRouter } = require("./couponRoutes");
const { orderRouter } = require("./orderRoutes");


const v1Router=express.Router();
v1Router.use("/user",userRouter);
v1Router.use("/food",foodRouter);
v1Router.use("/admin",adminRouter);
v1Router.use("/cart",cartRouter);
v1Router.use("/review",reviewRouter);
v1Router.use("/hotel",hotelRouter);
v1Router.use("/payment", paymentRoute);
v1Router.use('/coupons',couponRouter);
v1Router.use('/order',orderRouter);
module.exports={v1Router}