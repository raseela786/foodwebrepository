const express = require("express");
const { userSignup,userLogin, userLogout, userProfile, checkUser, userProfiles, updateProfile } = require("../../controller/userControllers");
const {userAuth}=require("../../middlewares/userAuth");
const { adminAuth } = require("../../middlewares/adminAuth");

const router = express.Router();
router.post("/signup",userSignup);
router.post("/login",userLogin);
router.post("/logout",userAuth,userLogout);

router.get("/userProfile",userAuth,userProfile);
router.get("/userProfiles",adminAuth,userProfiles);
router.get("/userList")

router.get("/check-user",userAuth,checkUser);
router.put("/update");
router.put("/update/:userId",userAuth,updateProfile);
router.delete("/delete") 
module.exports={userRouter:router} 