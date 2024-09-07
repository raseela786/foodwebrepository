const express = require("express");
const { userSignup,userLogin, userLogout, userProfile, checkUser } = require("../../controller/userControllers");
const {userAuth}=require("../../middlewares/userAuth");
const router = express.Router();
router.post("/signup",userSignup);
router.post("/login",userLogin);
router.post("/logout",userLogout);

router.get("/userProfile",userAuth,userProfile);
router.get("/userList")

router.get("/check-user",userAuth,checkUser);
router.put("/update");
router.delete("/delete") 
module.exports={userRouter:router} 