const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { getAverageRating, addReview, deleteReview, getfooditemReviews } = require("../../controller/reviewControllers");

const router = express.Router();

router.get("/avg-rating/:foodId", userAuth, getAverageRating);
router.get("/food-review/:foodId", userAuth, getfooditemReviews);
router.post("/add-review", userAuth, addReview);
router.put("/delete/:reviewId", userAuth, deleteReview);

module.exports = { reviewRouter: router };