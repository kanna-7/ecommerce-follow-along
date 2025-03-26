const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const jwt = require('jsonwebtoken');

const userModel = require("./models/userModel");

const cors = require("cors");

app.use(cors());

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

console.log(MONGO_PASSWORD)

const PORT = process.env.PORT || 8080;

const useRouter = require("./controller/userRouter");

const productRouter = require("./controller/productRouter");


app.get("/",(req,res)=>{
    try {
        res.send({message:"This is E-commerce Follow Along Backend"});
    } catch (error) {
        res.status(500).send({error});
    }
})

app.use("/user",useRouter);

app.use("/product",async(req,res,next)=>{
    try {
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(401).send({message:"Please login"});
        }
        const decoded = jwt.verify(auth, process.env.JWT_PASSWORD);
        const user = await userModel.findOne({_id:decoded.id});
        if(!user){
            return res.status(401).send({message:"Please register first"});
        }

        console.log(decoded) 
        next();
    } catch (error) {
      return res.status(500).send({message:"something went wrong"});  
    }
},productRouter);

app.listen(PORT,async ()=>{
    try {
       await mongoose.connect(`mongodb+srv://abhishektiwari136136:${MONGO_PASSWORD}@cluster0.55lt4.mongodb.net/`);
       console.log("Connected sucessfully");
    } catch (error) {
        console.log("Something went wrong not able to connect to server",error);
    }
});



