
const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { addToCart, removeFromCart, getCart, clearcart, updateQuantityInCart } = require("../../controller/cartControllers");

const router = express.Router();

router.post("/add-to-cart", userAuth, addToCart);
router.put("/remove", userAuth, removeFromCart);
router.get("/", userAuth, getCart);
router.post('/clear-cart',userAuth,clearcart)
router.put("/update-quantity",userAuth,updateQuantityInCart)
module.exports = { cartRouter: router };
