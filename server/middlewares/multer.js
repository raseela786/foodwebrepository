const multer  = require("multer");
const storage = multer.diskStorage({
    //destination: function (req, file, cb) {
     // cb(null, '/tmp/my-uploads')
   // }, copied from npm multer dcmnt why i commended meeans server thanne save aakunnilla
    filename: function (req, file, cb) {
        console.log(file,"fileeeeeeeeeeeeeee");
 
      cb(null, file.originalname)
    }
  });

  const upload = multer({ storage: storage });
  module.exports={upload};