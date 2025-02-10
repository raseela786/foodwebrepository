
const {   handleImageUpload1} = require("../utils/imageUpload");
const{ Food }=require("../model/foodModel");
const createFood = async (req, res,next) => {
    try {
        const user = req.user;

        const { title, description,  price,hotel} = req.body;
        let imageUrl;

        if (!title || !description  || !price|| !hotel) {
            return res.status(400).json({ message: "all fields required" });
        }

        const isfoodExist = await Food.findOne({ title });

        if (isfoodExist) {
            return res.status(400).json({ success: false, message: "food already added" });
        }

        if (req.file) {
         
            imageUrl = await handleImageUpload1(req.file.path);
        

        }

        const newFood = new Food({ title, description, price, image: imageUrl && imageUrl,hotel });
     if(user.role==='admin')
        newFood.admin=user.id;
        await newFood.save();

        res.status(201).json({ success: true, message: "food added successfully" });
    } catch (error) {
        next(error);
    }
};

const updateFood = async (req, res, next) => {
    try {
        const {foodId} = req.params;

        const { title, description,  price,hotel} = req.body;
        let imageUrl;

        const isFoodExist = await Food.findOne({_id:foodId});

        if (!isFoodExist) {
            return res.status(400).json({ success: false, message: "food item does not exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload1(req.file.path);
        }

       
      const updatedFood= await Food.findOneAndUpdate({_id:foodId},{title,description,price,hotel},{new:true,upsert:true})

        res.status(201).json({ success: true, message: "fooditem updated successfully",data:updatedFood });
    } catch (error) {
        next(error);
    }
};
const delteFood = async (req, res, next) => {
    try {
        const { foodId } = req.params;  // Extract foodId from the request parameters

        // Attempt to delete the food item by its ID
        const foodDeleted = await Food.findByIdAndDelete(foodId);

        // If no food item was found and deleted, return a 404 status
        if (!foodDeleted) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        // Successfully deleted the food item
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
            data: foodDeleted
        });
    } catch (error) {
        next(error);  // Pass any error to the global error handler
    }
};

    const getFooditemslist = async (req, res, next) => {
        try {
            const foodItems = await Food.find();
    
            res.status(200).json({ success: true, message: "food items fetched", data: foodItems });
        } catch (error) {
            next(error);
        }
    };
    const getFoodsDetails = async (req, res, next) => {
        try {
            const {foodId} =req.params;
            
            const foodItemsdetail = await Food.findById(foodId);
 
            res.status(200).json({ success: true, message: "food items fetched", data: foodItemsdetail });
        } catch (error) {
            next(error);
        }
    };
module.exports={createFood,updateFood,delteFood,getFooditemslist,getFoodsDetails};