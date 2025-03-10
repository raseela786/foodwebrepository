const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const { addHotel, updateHotel, delteHotel, getHotelList, gethotelDetails, getHotels } = require("../../controller/hotelControllers");

const { upload } = require("../../middlewares/multer");
const router = express.Router();
//router.post("/create",adminAuth,upload.single('image'),createFood);
//router.put("/update/:foodId",adminAuth,upload.single('image'),updateFood);
router.post("/create",adminAuth,upload.single('image') ,addHotel);
router.put("/update/:hotelId",adminAuth,upload.single('image'),updateHotel);
router.delete("/delete/:hotelId",adminAuth,delteHotel)
router.get("/hotelList", getHotelList);
router.get("/hotelDetails/:name",gethotelDetails)
router.get("/hotelnamelist",getHotels)
module.exports = { hotelRouter: router };