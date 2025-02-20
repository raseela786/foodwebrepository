const { Cart } = require("../model/cartModel");
const { Food } = require("../model/foodModel");

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodId , quantity = 1} = req.body;

        // Find the food to ensure it exists and fetch its price
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "food item not found" });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId,foodItems: [] });
        }

        // Check if the fooditem is already in the cart
        //const foodExists = cart.foodItems.some((item) => item.foodId.equals(foodId));
      //  if (foodExists) {
         //   return res.status(400).json({ message: "food item already in cart" });
       // }

        // Add the food to the cart
        cart.foodItems.push({
            foodId,
            price: food.price,
        });

        // Recalculate the total price
        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodId } = req.body;
console.log("fooooooooooooooooooooooooooooood from frot ed",{ foodId })
        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the food item from the cart
        cart.foodItems = cart.foodItems.filter((item) => item.foodId !=foodId);

        // Recalculate the total price
        cart.calculateTotalPrice();
        

        // Save the cart
        await cart.save();

        res.status(200).json({ success: true, message: "cart item removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("foodItems.foodId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "cart items fetched", success: true, data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const clearcart = async (req, res) => {
    try {
        const userId = req.user.id; // JWT token should set user ID in the request
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found in the token' });
        }

        // Clear the cart for the authenticated user
        await Cart.deleteOne({ userId: userId });

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
};
const updateQuantityInCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { foodId, quantity } = req.body;
  
      // Find the user's cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Find the food item in the cart
      const foodItemIndex = cart.foodItems.findIndex(
        (item) => item.foodId.toString() === foodId
      );
      
      if (foodItemIndex === -1) {
        return res.status(404).json({ message: "Food item not found in cart" });
      }
  
      // Update the quantity of the food item in the cart
      cart.foodItems[foodItemIndex].quantity = quantity;
  
      // Recalculate the total price
      cart.calculateTotalPrice();
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
module.exports = { addToCart, removeFromCart, getCart ,clearcart,updateQuantityInCart};