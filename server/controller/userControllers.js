const { User } = require("../model/userModel");
const bcrypt = require('bcrypt');
const {generateToken}= require("../utils/token");
const { handleImageUpload1 } = require("../utils/imageUpload");
const userSignup=async(req,res,next)=>
{
    console.log("iside siguuuuuuuuuuup")
try{
   const {name,email,password,phone,food}=req.body;
   let imageUrl;
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
if (req.file) {
         
    imageUrl = await handleImageUpload1(req.file.path);


}
const saltRounds=10;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log(hashedPassword);

const newUser =new User({name,email,password: hashedPassword,phone,image: imageUrl && imageUrl}) ;
await newUser.save();

const token=generateToken(newUser._id);


res.cookie("token", token, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
});

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
    res.cookie("token", token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
    });
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
            try {
                res.clearCookie("token", {
                    sameSite: "None",
                    secure: true,
                    httpOnly: true,
                });
        
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
            const userProfiles=async(req,res,next)=>
                {
                try{
                    const user=req.user;// or //const {user}=req;
                    console.log(user,",,,,,,,,,,,,,,,,,user");
                    
                   // const {id}= req.params;
               const userData = await User.find({});
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
                const updateProfile= async (req, res, next) => {
                    try {
                        const {userId} = req.params;
                
                        const { name, email, password,phone} = req.body;
                        let  imageUrl;
                
                        const isUserExist = await User.findOne({_id:userId});
                
                        if (!isUserExist) {
                            return res.status(400).json({ success: false, message: "user does not exist" });
                        }
                
        if (req.file) {
            imageUrl = await handleImageUpload1(req.file.path);
        }
                      console.log("puthiya image",imageUrl);
        
                      const updatedUser= await User.findOneAndUpdate({_id:userId},{name, email, password,phone,image: imageUrl},{new:true,upsert:true})
                
                        res.status(201).json({ success: true, message: "user details updated successfully",data:updatedUser });
                    } catch (error) {
                        next(error);
                    }
                };
               const userProfilePic=async (req, res,next) => {
                    try {
                      const user = await User.findById(req.user._id); // Get user by ID (authentication required)
                      res.json({ data: user }); // Return user data including profilePic URL
                    } catch (error) {
                        next(error);
                      res.status(500).json({ message: "Failed to fetch profile" });
                    }
                  };
                  
module.exports={userSignup,userLogin,userLogout,userProfile,checkUser,userProfiles,updateProfile,userProfilePic}
