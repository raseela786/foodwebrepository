const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const { addHotel, updateHotel, delteHotel, getHotelList, gethotelDetails } = require("../../controller/hotelControllers");

const router = express.Router();

router.post("/create",adminAuth,addHotel);
router.put("/update/:hotelId",adminAuth,updateHotel);
router.delete("/delete/:hotelId",adminAuth,delteHotel)
router.get("/hotelList", getHotelList);
router.get("/hotelDetails/:name",gethotelDetails)
module.exports = { hotelRouter: router };