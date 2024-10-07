const { Food } = require("../model/foodModel");
const { Review } = require("../model/reviewModel");

const addReview = async (req, res) => {
    try {
        const { foodId, rating, comment } = req.body;
        const userId = req.user.id;

        // Validate if the food exists
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "food item not found" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, foodId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the fooditem's average rating here

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getfooditemReviews = async (req, res) => {
    try {
        const { foodId } = req.params;

        const reviews = await Review.find({ foodId }).populate("userId", "name ").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this course" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const deleteReview = async (req, res) => {
    try {
        
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getAverageRating = async (req, res) => {
    try {
        const { foodId } = req.params;

        const reviews = await Review.find({ foodId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this foodItem" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { getAverageRating, deleteReview, addReview, getfooditemReviews };