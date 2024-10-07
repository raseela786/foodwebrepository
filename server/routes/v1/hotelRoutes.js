const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const { addHotel, updateHotel, delteHotel } = require("../../controller/hotelControllers");

const router = express.Router();

router.post("/create",adminAuth,addHotel);
router.put("/update/:hotelId",adminAuth,updateHotel);
router.delete("/delete/:hotelId",adminAuth,delteHotel)
module.exports = { hotelRouter: router };