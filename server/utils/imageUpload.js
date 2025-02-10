/*const {cloudinaryInstance} = require("../config/cloudinaryConfig")
const hadleImageUpload =async(path)=>
{
    try{
        const uploadResult = await cloudinaryInstance.uploader.upload(path);
    // const uploadResult = await cloudinaryInstance.uploader.upload(path,{format:"pdf"});resource_type:"raw"///ivide mattam varuthiyal pdfum upload cheyym
        return uploadResult.url;
    }
catch(error)
{
    next(error);
}
}
module.exports={hadleImageUpload}*/

const { cloudinaryInstance } = require("../config/cloudinaryConfig");


const handleImageUpload1 = async(path)=>{
    try {
        console.log("haiiiiiiii iside hadle image")
       // const uploadResult = await cloudinaryInstance.uploader.upload(path);
       const uploadResul= await cloudinaryInstance.uploader.upload(path);
        console.log(uploadResul,"path");
        return uploadResul.url;


    } catch (error) {
        next(error);
        
    }
}

module.exports={handleImageUpload1}