var jwt = require('jsonwebtoken');
const adminAuth=(req,res,next)=>{

    try{
console.log(req.cookies);
const {token}=req.cookies;
if(!token)
{
    return res.status(401).json({success:false,meassage:"user not authorized"})
}
const tokenVerified= jwt.verify(token,process.env.JWT_SECRET_KEY)//id role will inside token
if(!tokenVerified)
{
    return res.status(401).json({success:false,meassage:"user not authorized"})
}
if(tokenVerified.role!=="admin")
    {
        return res.status(401).json({success:false,meassage:"user not authorized"})
    }
req.user=tokenVerified;//adutha middle vare pass cheyyum next no need to create anymore oru req in user enna object cret cheydu athil tknvrfd assign cheydu
next();

    }
    catch{
       
        console.log(error)
        res.status(error.statusCode || 500).json({message:error.message|| "internel server error"}) 
    }
}
module.exports={adminAuth};