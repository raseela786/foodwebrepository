const express = require("express");

const { upload } = require("../../middlewares/multer");
const { createFood, updateFood, delteFood, getFooditemslist, getFoodsDetails, getHotels, getFooditemslistbyname } = require("../../controller/foodControllers");
const { adminAuth } = require("../../middlewares/adminAuth");
const {userAuth}= require("../../middlewares/userAuth")

const router = express.Router();

router.post("/create",adminAuth,upload.single('image'),createFood);
router.put("/update/:foodId",adminAuth,upload.single('image'),updateFood);
router.delete("/delete/:foodId",adminAuth,delteFood);
//router.get("/foodList",userAuth, getFooditemslist);
router.get("/foodList", getFooditemslist);
router.get("/foodList/:name",getFooditemslistbyname);

router.get("/foodDetails/:foodId",getFoodsDetails)

module.exports = { foodRouter: router };