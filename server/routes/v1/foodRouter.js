const express = require("express");

const { upload } = require("../../middlewares/multer");
const { createFood, updateFood, delteFood } = require("../../controller/foodControllers");
const { adminAuth } = require("../../middlewares/adminAuth");

const router = express.Router();

router.post("/create",adminAuth,upload.single('image'),createFood);
router.put("/update/:foodId",adminAuth,upload.single('image'),updateFood);
router.delete("/delete/:foodId",adminAuth,delteFood)
module.exports = { foodRouter: router };