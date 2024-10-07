const mongoose =require("mongoose") ;
//giving schema name
const adminSchema=new mongoose.Schema({
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

});
//schema exporting using this name db creating
 const Admin =mongoose.model('Admin',adminSchema);
 module.exports={Admin};