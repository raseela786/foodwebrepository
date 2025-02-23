// controllers/couponController.js
const Coupon = require("../model/couponModel");
const {Cart} = require("../model/cartModel");



/**
 * Create a new coupon
 */
const createCoupon = async (req, res) => {
  console.log("Request Body:", req.body); // Log input
  try {
    const { code, discount, expiryDate} = req.body;

    if (!code || !discount || !expiryDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      isActive: true, 
      
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error("Error creating coupon:", error.message);
    res.status(500).json({ success: false, message: "Failed to create coupon" });
  }
};
const getCoupons = async (req, res) => {

    const { subtotal } = req.body;  // Getting subtotal from the request body
console.log("sutmmmmmmmmmmmmmmmmmmmotal",subtotal);
    try {
      // Find active coupons that are eligible for the subtotal
      const coupons = await Coupon.find({
        isActive: true,
        expiryDate: { $gte: new Date() },  // Check if coupon is not expired
        minSubtotal: { $lte: subtotal },  // Ensure coupon's minimum subtotal is less than or equal to the current subtotal
      });
  console.log("aaaaaaaaaavailable coupons",coupons);
      if (!coupons) {
        return res.status(404).json({ success: false, message: "No available coupons for this subtotal." });
      }
  
      res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      console.error("Error fetching available coupons:", error.message);
      res.status(500).json({ success: false, message: "Failed to fetch available coupons." });
    }
  };
/**
 * Validate a coupon
 */
 const validateCoupon = async (req, res) => {
  const { couponCode } = req.body;

  try {
    // Check if the coupon exists
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      console.log("Coupon validation failed: Not found");
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    // Check if the coupon is active
    if (!coupon.isActive) { 
      console.log("Coupon validation failed: Inactive");
      return res.status(400).json({
        success: false,
        message: "Coupon is inactive.",
      });
    }

    // Check if the coupon has expired
    if (new Date(coupon.expiryDate) < new Date()) {
      console.log("Coupon validation failed: Expired");
      return res.status(400).json({
        success: false,
        message: "Coupon has expired.",
      });
    }

    res.status(200).json({
      success: true,
      discount: coupon.discount,
      message: "Coupon is valid.",
    });
  } catch (error) {
    console.error("Error validating coupon:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while validating the coupon.",
    });
  }
};

/**
 * Apply a coupon to the cart
 */
 /*const applyCoupon = async (req, res) => {
  const { couponCode, cartTotal } = req.body;

  try {
    // Validate the coupon
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(400).json({ success: false, message: "Invalid coupon code." });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ success: false, message: "Coupon is inactive." });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon has expired." });
    }

    // Calculate the discount
    const discount = (cartTotal * coupon.discount) / 100;
    const finalAmount = Math.max(0, cartTotal - discount);

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully.",
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error("Error applying coupon:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to apply coupon.",
    });
  }
};
*/
// Apply coupon in checkout
const applyCoupon = async (req, res) => {
const { couponCode, cartId } = req.body;

  try {
    console.log("Received couponCode:", couponCode);
    console.log("Received cartId:", cartId);

    const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
    console.log("Found coupon:", coupon);

    if (!coupon) {
      return res.status(400).json({ message: 'Invalid or inactive coupon code' });
    }

    const cart = await Cart.findById(cartId);
    console.log("Found cart:", cart);

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    cart.calculateTotalPrice(); // Call calculateTotalPrice before using totalPrice
console.log("Cart total price after calculation:", cart.totalPrice);


    const discount = (cart.totalPrice * coupon.discount) / 100;
    console.log("Calculated discount:", discount);

    const finalAmount = cart.totalPrice - discount;
    console.log("Final amount after applying discount:", finalAmount);

    const amountToPay = finalAmount < 0 ? 0 : finalAmount;
    cart.totalPrice = amountToPay;
    await cart.save();
    return res.status(200).json({
      message: 'Coupon applied successfully',
      finalAmount: amountToPay,
      discount:discount,
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    return res.status(500).json({
      message: 'Error applying coupon',
      error: error.message || 'An unknown error occurred',
    });
  }
};
module.exports ={createCoupon,validateCoupon,applyCoupon,getCoupons};