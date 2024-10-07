
const {  handleImageUpload} = require("../utils/imageUpload");
const{ Hotel }=require("../model/hotelModel");
const addHotel = async (req, res, next) => {
    try {
        const user = req.user;

        const {name, description, location,mobile} = req.body;
 
        if (!name || !description  || !mobile || !location) {
            return res.status(400).json({ message: "all fields required" });
        }

        const ishotelExist = await Hotel.findOne({ name });

        if (ishotelExist) {
            return res.status(400).json({ success: false, message: "hotel already added" });
        }

      

        const newHotel = new Hotel ({name, description, location,mobile  });
     if(user.role==='admin')
        newHotel.admin=user.id;
        await newHotel.save();

        res.status(201).json({ success: true, message: "hotel added successfully" });
    } catch (error) {
        next(error);
    }
};

const updateHotel = async (req, res, next) => {
    try {
        const {hotelId} = req.params;

        const { name, description, location,mobile} = req.body;
      

        const isHotelExist = await Hotel.findOne({_id:hotelId});

        if (!isHotelExist) {
            return res.status(400).json({ success: false, message: "hotel does not exist" });
        }

       
      const updatedHotel= await Hotel.findOneAndUpdate({_id:hotelId},{name, description, location,mobile},{new:true,upsert:true})

        res.status(201).json({ success: true, message: "hotel details updated successfully",data:updatedHotel });
    } catch (error) {
        next(error);
    }
};
const delteHotel = async (req, res, next) => {
    try {
        const {hotelId} = req.params;
   
    const hotelDeleted= await Hotel.findByIdAndDelete({_id:hotelId});
    if(!hotelDeleted)
        return res.status(400).json({ success: true, message: "hotel details already deleted" });  
    res.status(200).json({ success: true, message: "hotel deleted successfully"});
    }
     catch (error) {
        next(error);
    }};
module.exports={addHotel,updateHotel,delteHotel};