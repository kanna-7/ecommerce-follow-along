const express =require("express");
const productRouter = express.Router();
const productModel = require("../models/productModel");
const procuctImages = require("../middleware/multer");
productRouter.post("/addproduct",async(req,res,next)=>{
    productImages.array("images,6")(req,res,(err)=>{
        if(err){
            return res.status(500).send({msg:"Something went wrong while uploding images"});
        }
    })
},async(req,res)=>{
    try{
        const {title,description,price}= req.body;
        if(!title || !description || !price){
            resizeBy.status(404).send({msg:"Please add all fields"});
        }
        const images = req.file;
        

    }catch (error){
        return resizeBy.status(500).send({msg:"Something went wrong",error});
    }
})