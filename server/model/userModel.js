const mongoose =require("mongoose") ;
//giving schema name
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
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
}
});
//schema exporting using this name db creating
 const User =mongoose.model('User',userSchema);
 module.exports={User};