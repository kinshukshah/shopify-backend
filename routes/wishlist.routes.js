const express = require("express");
const Router = express.Router();
const { Wishlist } = require('../model/wishlist.model.js');

Router.get('/:userId',async (req,res) =>{
  try{
     let { userId } = req.params;
    let wishlist = await Wishlist.findOne({userId:userId }).populate({path:'wishlistItems.productId'});
    res.status(200).json({ success: true, wishlist });
  }catch(error){
    res.status(400).json({success:false,error})
  }
});

Router.post('/:userId/:productId',async (req,res) =>{
  try{
    let { userId,productId } = req.params;
     let wishlist = await Wishlist.findOne({ userId:userId });
     console.log(wishlist)
     if (wishlist) {
         wishlist.wishlistItems.push({
           productId,
         });
         let savedRes=await wishlist.save();
         savedRes=await savedRes.populate({path:'wishlistItems.productId'}).execPopulate();
       res.status(200).json({success:true,wishlist:savedRes})
     } else {
      let newWishlistItem = new Wishlist({ userId, wishlistItems: [{ productId}] });
      let savedItem = await newWishlistItem.save();
      savedItem=await savedItem.populate({path:'wishlistItems.productId'}).execPopulate();
      res.status(200).json({success:true,wishlist:savedItem})
    }
  }catch(error){
    res.status(400).json({success:false,error})
  }
})

Router.delete('/:userId/:productId',async (req,res) =>{
  try{
    const {userId,productId}=req.params;
    let wishlist = await Wishlist.findOne({ userId:userId });
    let newList=wishlist.wishlistItems.filter(item => !(item.productId == productId));
    wishlist.wishlistItems=newList
    wishlist=await wishlist.save();
    wishlist=await wishlist.populate({path:'wishlistItems.productId'}).execPopulate();
    res.status(200).json({success:true,wishlist})
  }catch(error){
    res.status(400).json({success:false,error})
  }
})

module.exports = Router;
