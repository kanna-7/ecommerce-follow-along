const express = require("express")

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

var jwt = require('jsonwebtoken');

const userModel = require("./models/userModel")

const connect = require("./mongoDB");
const userRouter = require("./controller/userRouter");

const productRouter = require("./controller/productRouter");

const allProductRouter = require("./controller/allProducts");
 
app.get("/",(req,res)=>{
    try {
        res.status(200).send({mgs:"This is e-commerce code along backend"});
    } catch (error) {
        res.status(500).send({message:"error occured"});
    }
})

//localhost:8000/user/login

app.use("/user",userRouter);

app.use("/product",async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        const user = await userModel.findById(decoded.id);
        
        if (!user && user.id) {
            return res.status(404).json({ message: "Please signup" });
        }
        console.log(user.id)
        req.userId = user.id; 
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Token", error });
    }
},productRouter);

app.use('/allproducts',allProductRouter);


app.listen(8000,async()=>{
    try {
        await connect();
        console.log("Server connected successfully");
    } catch (error) {
        console.log("Error",error)
    }
})