const express = require("express");
const { userSignup,userLogin, userLogout, userProfile, checkUser, userProfiles, updateProfile, userProfilePic } = require("../../controller/userControllers");
const {userAuth}=require("../../middlewares/userAuth");
const { adminAuth } = require("../../middlewares/adminAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();
router.post("/signup",upload.single('image'),userSignup);
router.post("/login",userLogin);
router.post("/logout",userAuth,userLogout);

router.get("/userProfile",userAuth,userProfile);
router.get("/userProfiles",adminAuth,userProfiles);
router.get("/userList")
router.get("/userProfile",userAuth,userProfilePic);
router.get("/check-user",userAuth,checkUser);
router.put("/update");
router.put("/update/:userId",userAuth,updateProfile);
router.delete("/delete") 
module.exports={userRouter:router} 