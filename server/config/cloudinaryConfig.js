//import { v2 as cloudinary } from 'cloudinary';
const{ v2 } =require("cloudinary");
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh iside cloudiarrrrrrrrrrrrrrrrrrrrry")
    // Configuration
v2.config({ 
    cloud_name: process.env.CLOUD_NAME, //df56ldxhf
    api_key: process.env.CLOUD_API_KEY, //825819614875491
    api_secret: process.env.CLOUD_API_SECRET// Click 'View API Keys' above to copy your API secret
  //5CTEK1sKsyFCgwNlNzpGuplFxDw
});

const cloudinaryInstance=v2;
console.log("haiiiiiiiiiiiiii ras cloudiaryyyyyyyy",cloudinaryInstance)
module.exports={cloudinaryInstance};

