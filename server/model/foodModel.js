const mongoose =require("mongoose") ;
//giving schema name
const foodSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hotel: {
        type: String,
        ref: "Hotel",
        required: true,
    },
    image: {
        type: String, // URL or path to the image
        required: false,
        default:"https://media.istockphoto.com/id/1250567402/photo/table-top-view-of-indian-food.jpg?s=612x612&w=0&k=20&c=pyL7bJn4SSYuMJnBO4zBoX5vFONZTHRBt-M70DZAjk8=",
    },

    
},
{
    timestamps:true
});
//schema exporting using this name db creating
 const Food =mongoose.model('Food',foodSchema);
 module.exports={Food};