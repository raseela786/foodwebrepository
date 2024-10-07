const { Admin } = require("../model/adminModel");
const bcrypt = require('bcrypt');
const {generateToken}= require("../utils/token")
const adminSignup=async(req,res,next)=>
{
try{
   const {name,email,password}=req.body;
if(! name|| !email || !password ){
   return res.status(400).json({success:false,
        message:"all field required"
    })
}
 const isadminExist =await Admin.findOne({email});
if(isadminExist)
{
    return res.status(400).json({message:"admin already exist"})
}
const saltRounds=10;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log(hashedPassword);

const newUser =new Admin({name,email,password: hashedPassword}) ;
await newUser.save();

const token=generateToken(newUser._id);

res.cookie("token",token);
res.json({Success:true,message:"admin created successfully"})
}

catch(error)
{
    console.log(error)
    res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
}
}
////login
const adminLogin=async(req,res,next)=>
    {
    try{
      const {email,password}=req.body;
      if(!email||!password)
      {
        res.status(400).json({message:"all fields are required"})
      }
      //user exist aano check
      const adminExist= await Admin.findOne({email});
      if(!adminExist)
      {
       return res.status(404).json({success:false,meassage:"admi does nott exist"})
      }
      //password check
    const passwordMatch=  bcrypt.compareSync(password,adminExist.password);
    if(!passwordMatch)
    {
        return res.status(401).json({meassage:"admi not authorized"})
    }
    const token=generateToken(adminExist._id,'admin');
res.cookie("token",token);
res.json({Success:true,message:"admi login successfully"})
    }
    
    
    catch(error)
    {
        console.log(error)
    next(error);
    }
    }
    const adminLogout=async(req,res,next)=>
        {
        try{
          res.clearCookie("token");
          res.json({message:'admi logout success',suceess:true})
        }
        
        
        catch(error)
        {
            console.log(error)
            res.status(error.statusCode || 500).json({message:error.message|| "internel server error"})
        }
        }
        const adminProfile=async(req,res,next)=>
            {
            try{
                const user=req.user;// or //const {user}=req;
                console.log(user,",,,,,,,,,,,,,,,,,user");
                
               // const {id}= req.params;
           const adminData = await User.findOne({_id:user.id});
           return res.json({message:'user data fetcheds',suceess:true,data:adminData})
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
                  const {admin}=req;
                  if(!admin)
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
module.exports={adminSignup,adminLogin,adminLogout,adminProfile,checkUser}
