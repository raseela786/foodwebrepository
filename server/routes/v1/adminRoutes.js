const express = require("express");


const { adminSignup, adminLogin, adminLogout, adminProfile } = require("../../controller/adminControllers");
const { adminAuth } = require("../../middlewares/adminAuth");
const { checkUser } = require("../../controller/userControllers");
const router = express.Router();
router.post("/signup",adminSignup);
router.post("/login",adminLogin);
router.post("/logout",adminLogout);

router.get("/adminProfile",adminAuth,adminProfile);


router.get("/check-user",adminAuth,checkUser);
router.put("/update");
router.delete("/delete") 
module.exports={adminRouter:router} 