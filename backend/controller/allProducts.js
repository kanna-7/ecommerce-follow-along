const express = require("express");

const allProductRouter = express.Router();

const productsModel = require("../models/productsModel")

allProductRouter.get('/',async(req,res)=>{
    try {
        const products = await productsModel.find();
        return res.status(200).send({msg:"Successfull",products});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong"});
    }
})

allProductRouter.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({msg:"Please provide id.."});
        }
        const product = await productsModel.findOne({_id:id});
        return res.status(200).send({msg:"Successfull",product});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong"});
    }
})

module.exports = allProductRouter;