const express = require("express");
const {userRouter}=require("./userRoutes");
const {foodRouter}=require("./foodRouter");

const v1Router=express.Router();
v1Router.use("/user",userRouter);
v1Router.use("/food",foodRouter);

module.exports={v1Router}