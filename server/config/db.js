const mongoose = require("mongoose");
console.log(process.env.MONGO_URI)
const connectDB =async(req,res)=>{
    try{
await mongoose.connect(process.env.MONGO_URI);
console.log("db connected successfully");
    }
    catch(error)
    {
console.log(error);
res.status(500).json(error);
    }
    
}
module.exports={ connectDB }