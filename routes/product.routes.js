const express = require("express");
const Router=express.Router();
const {Product}=require('../model/product.model.js');

Router.get('/getProducts',async(req,res) =>{
  try{
    let products=await Product.find({})
    res.status(200).json({success:true,products})
  }catch(error){
    res.status(401).json({success:false,error})
  }
})

Router.get('/songs',(req,res) =>{
  res.json({songs:[{name:"Abc"},{name:"DEF"}]})
})

Router.post('/addProduct',async (req,res) =>{
  console.log(req.body);
  try{
    const product=new Product(req.body);
    let savedProduct=product.save();
    res.status(200).json({success:true})
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
})

module.exports=Router;