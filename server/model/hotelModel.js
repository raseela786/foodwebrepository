
const mongoose =require("mongoose") ;
//giving schema name
const hotelSchema=new mongoose.Schema({
 name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    mobile:
    {
        type: String,
        required: true
    },
    
},
{
    timestamps:true
});
//schema exporting using this name db creating
 const Hotel =mongoose.model('Hotel',hotelSchema);
 module.exports={Hotel};