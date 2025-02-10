// routes/couponRoutes.js
// routes/v1/CouponRoutes.js
const express = require('express');
const { createCoupon, validateCoupon, applyCoupon } = require('../../controller/couponControllers');

//const { adminAuth } = require('../../middlewares/adminAuth');
const router = express.Router();


// Route to create a new coupon (admin only)
router.post("/create",  createCoupon);

// Route to validate a coupon
router.post('/validate', validateCoupon);

// RoApply a coupon to the cart (accessible to all users)
router.post('/apply', applyCoupon);

module.exports = { couponRouter: router };