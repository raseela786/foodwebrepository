
const{ Hotel }=require("../model/hotelModel");
const { handleImageUpload1 } = require("../utils/imageUpload");
const addHotel = async (req, res, next) => {
    try {
        const user = req.user;
    
        const {name, description, location,mobile} = req.body;
        let imageUrl;
        console.log("name,",name)
        console.log(" description, ",description);
        console.log("loca,",location)
        console.log("mob,",mobile)
        
        if (!name || !description  || !mobile || !location) {
            return res.status(400).json({ message: "all fields required" });
        }

        const ishotelExist = await Hotel.findOne({ name });

        if (ishotelExist) {
            return res.status(400).json({ success: false, message: "hotel already added" });
        }
        if (req.file) {
         
            imageUrl = await handleImageUpload1(req.file.path);
        

        }
      

        const newHotel = new Hotel ({name, description, location,mobile , image: imageUrl && imageUrl });
     if(user.role==='admin')
        newHotel.admin=user.id;
        await newHotel.save();

        res.status(201).json({ success: true, message: "hotel added successfully" });
        
    } catch (error) {
        next(error);
    }
};
const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();  // Assuming the Hotel model has the names
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
};

const updateHotel = async (req, res, next) => {
    try {
        const {hotelId} = req.params;

        const { name, description, location,mobile} = req.body;
        let imageUrl;

        const isHotelExist = await Hotel.findOne({_id:hotelId});

        if (!isHotelExist) {
            return res.status(400).json({ success: false, message: "hotel does not exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload1(req.file.path);
        }
      const updatedHotel= await Hotel.findOneAndUpdate({_id:hotelId},{name, description, location,mobile,image: imageUrl},{new:true,upsert:true})

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
    const getHotelList = async (req, res, next) => {
        try {
            const hotelList = await Hotel.find();
    
            res.status(200).json({ success: true, message: "list of hotels fetched", data: hotelList });
        } catch (error) {
            next(error);
        }
    };
    const gethotelDetails = async (req, res, next) => {
        try {
            const {name} =req.params;
            
            const hoteldetail = await Hotel.findOne({name});
 
            res.status(200).json({ success: true, message: "hotel details fetched", data: hoteldetail });
        } catch (error) {
            next(error);
        }
    };
module.exports={addHotel,updateHotel,delteHotel,getHotelList,gethotelDetails,getHotels};