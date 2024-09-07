const { User } = require("../model/userModel");
const bcrypt = require('bcrypt');
const {generateToken}= require("../utils/token")
const userSignup=async(req,res,next)=>
{
try{
   const {name,email,password,phone,food}=req.body;
if(! name|| !email || !password ){
   return res.status(400).json({success:false,
        message:"all field required"
    })
}
 const isuserExist =await User.findOne({email});
if(isuserExist)
{
    return res.status(400).json({message:"user already exist"})
}
const saltRounds=10;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log(hashedPassword);

const newUser =new User({name,email,password: hashedPassword,phone}) ;
await newUser.save();

const token=generateToken(newUser._id);

res.cookie("token",token);
res.json({Success:true,message:"user created successfully"})
}

catch(error)
{
    console.log(error)
    res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
}
}
////login
const userLogin=async(req,res,next)=>
    {
    try{
      const {email,password}=req.body;
      if(!email||!password)
      {
        res.status(400).json({message:"all fields are required"})
      }
      //user exist aano check
      const userExist= await User.findOne({email});
      if(!userExist)
      {
       return res.status(404).json({success:false,meassage:"user does nott exist"})
      }
      //password check
    const passwordMatch=  bcrypt.compareSync(password,userExist.password);
    if(!passwordMatch)
    {
        return res.status(401).json({meassage:"user not authorized"})
    }
    const token=generateToken(userExist._id);
res.cookie("token",token);
res.json({Success:true,message:"user login successfully"})
    }
    
    
    catch(error)
    {
        console.log(error)
    next(error);
    }
    }
    const userLogout=async(req,res,next)=>
        {
        try{
          res.clearCookie("token");
          res.json({message:'user logout success',suceess:true})
        }
        
        
        catch(error)
        {
            console.log(error)
            res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
        }
        }
        const userProfile=async(req,res,next)=>
            {
            try{
                const user=req.user;// or //const {user}=req;
                console.log(user,",,,,,,,,,,,,,,,,,user");
                
               // const {id}= req.params;
           const userData = await User.findOne({_id:user.id});
           return res.json({message:'user data fetcheds',suceess:true,data:userData})
            }
            
            
            catch(error)
            {
                console.log(error)
                res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
            }
            }
            const checkUser=async(req,res,next)=>
                {
                try{
                  const {user}=req;
                  if(!user)
                  {
                    return res.status(401).json({success:false,meassage:"user not authorized"})
                  }
               
               return res.json({message:'user authorised'})
                }
                
                
                catch(error)
                {
                    console.log(error)
                    res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
                }
                }
module.exports={userSignup,userLogin,userLogout,userProfile,checkUser}
