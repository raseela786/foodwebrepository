
const {  handleImageUpload} = require("../utils/imageUpload");
const{ Food }=require("../model/foodModel");
const createFood = async (req, res, next) => {
    try {
        const user = req.user;

        const { title, description,  price} = req.body;
        let imageUrl;

        if (!title || !description  || !price) {
            return res.status(400).json({ message: "all fields required" });
        }

        const isfoodExist = await Food.findOne({ title });

        if (isfoodExist) {
            return res.status(400).json({ success: false, message: "food already added" });
        }

        if (req.file) {
           
            imageUrl = await handleImageUpload(req.file.path);
           

        }

        const newFood = new Food({ title, description, price, image: imageUrl && imageUrl });
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

        const { title, description,  price} = req.body;
        let imageUrl;

        const isFoodExist = await Food.findOne({_id:foodId});

        if (!isFoodExist) {
            return res.status(400).json({ success: false, message: "food item does not exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

       
      const updatedFood= await Food.findOneAndUpdate({_id:foodId},{title,description,price},{new:true,upsert:true})

        res.status(201).json({ success: true, message: "fooditem updated successfully",data:updatedFood });
    } catch (error) {
        next(error);
    }
};
const delteFood = async (req, res, next) => {
    try {
        const {foodId} = req.params;
    const foodDeleted=Food.findByIdAndDelete({id:foodId});
    if(!foodDeleted)
        return res.status(400).json({ success: true, message: "fooditem already deleted" });  
    res.status(200).json({ success: true, message: "foode deleted successfully",data:foodDeleted });
    }
     catch (error) {
        next(error);
    }};
module.exports={createFood,updateFood,delteFood};