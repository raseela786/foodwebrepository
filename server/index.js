const express = require("express");
const cors=require("cors");
const { apiRouter } = require("./routes");
const { connectDB } = require("./config/db");
const cookieParser=require("cookie-parser");
const { handleError } = require("./utils/error");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","https://foodwebreraz-client.vercel.app"],
    credentials: true,
    methods :['POST','GET',"PUT","DELETE","OPTION"],
 
}));
connectDB();
app.get("/",(req,res)=>
{
    res.send("hhhhhhhhhhhhhhhhhhhhhh")
    
})

app.use("/api",apiRouter);
app.use(handleError); 
app.all("*",(req,res)=>{
    return res.status(404).json({message:"end point doesnt exist"});
})
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
