const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sessionId:
        {
type:String,
required:true,
        },
        foodItems: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                   // required: true,
                },
               
            },
        ],
        totalPrice: {
            type: Number,
           // required: true,
            default: 0,
        },
    },
    { timestamps: true }
);



const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };