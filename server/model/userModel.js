const mongoose =require("mongoose") ;
//giving schema name
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image: {
        type: String, // URL or path to the image
        required: false,
        default:"https://media.istockphoto.com/id/1250567402/photo/table-top-view-of-indian-food.jpg?s=612x612&w=0&k=20&c=pyL7bJn4SSYuMJnBO4zBoX5vFONZTHRBt-M70DZAjk8=",
    },
   email:
{
    type:String,
    required:true
},

password:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
food:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Food",
},
hotel:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hotel",
        },
    blocked: {
            type: Boolean,
            default: false // New field with default value
        }
       
});
//schema exporting using this name db creating
 const User =mongoose.model('User',userSchema);
 module.exports={User};