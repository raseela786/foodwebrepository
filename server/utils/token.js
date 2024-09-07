var jwt = require('jsonwebtoken');
//id means ith vach token cretae cheyyum then role may be admn user..etc here defaultly  role is user
const generateToken =(id,role)=>
{
    try{
          var token = jwt.sign({id:id ,role:role||"user"}, process.env.JWT_SECRET_KEY);
          return token;
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports={generateToken};