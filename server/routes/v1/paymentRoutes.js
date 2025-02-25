
const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { Order } = require("../../model/orderModel");

const stripe = require("stripe")(process.env.Stripe_Private_Api_Key);

const client_domain = process.env.CLIENT_DOMAIN;

const router = express.Router();

router.post("/create-checkout-session", userAuth, async (req, res, next) => {
    try {
        const { products,discounts,finalprice,discountindiv} = req.body;

        // Log the request to ensure that you're not processing multiple requests for the same session
        console.log("Creating checkout session with products: ", products);
        console.log("final priceeeeeeeeee",finalprice);
        console.log("final discounts",discounts);
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: "Cart items are required." });
          }
      
          // ✅ Calculate total price before discount
          const totalAmountInINR = products.reduce(
            (total, item) => total + item.foodId.price * item.quantity,
            0
          );
          const finalAmountInINR = Math.max(finalprice.toFixed(2), 0);
          const totalAmountInPaise = Math.round(finalAmountInINR * 100); // Convert to paise
          const discountFactor = finalAmountInINR / totalAmountInINR;
        const line = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.foodId.title,
                    images: [product.foodId.image],
                },
              
                //it_amount: Math.round((product.foodId.price - discountindiv) * 100),
                unit_amount: Math.round(product.foodId.price * discountFactor * 100), 
            },
            quantity: product.quantity || 1,// Default to 1 if no valid quantity is provided
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line,
            mode: "payment",

            success_url: `${client_domain}/user/payment/success`,
            cancel_url:  `${client_domain}/user/payment/cancel`,
        });
          // Calculate total price
          const totalPrice = finalprice;
console.log("maaaaaaangilyyy",totalPrice )
        // Prepare the food items for saving in the order model
        const foodItems = products.map((product) => ({
            foodId: product.foodId._id, // Save only the foodId reference
            quantity: product.quantity, // Store quantity for reference
        }));


        console.log("Session created: ", session.id);

     // Create and save the order
     const newOrder = new Order({
        userId: req.user.id, // Ensure the user is authenticated and the userId is available
        sessionId: session.id, // Save the Stripe session ID
        foodItems: foodItems, // Save the food items with their quantities
        totalPrice: totalPrice, // Save the calculated total price
        status: 'Pending', // Default status can be set to 'Pending'
    });
      
          await newOrder.save()
      
        res.json({ success: true, sessionId: session.id });

    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
});

module.exports = { paymentRoute: router }