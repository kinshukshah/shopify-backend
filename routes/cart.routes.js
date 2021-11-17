const express = require("express");
const Router = express.Router();
const { Cart } = require('../model/cart.model.js');

Router.get('/:userId', async (req, res) => {
  try {
    let { userId } = req.params;
    let cartList = await Cart.findOne({userId:userId }).populate({path:'cartItems.productId'});
    res.status(200).json({ success: true, cartList });
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
})

Router.post('/:userId/:productId', async (req, res) => {
  const query=req.query;
  try {
    let { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId:userId });
    if (cart) {
      let itemIndex = cart.cartItems.findIndex(p => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.cartItems[itemIndex];
        productItem.quantity=query.action == "increase" ?productItem.quantity+1 : productItem.quantity-1; 
        cart.cartItems[itemIndex] = productItem;
      }else{
        cart.cartItems.push({
          productId,
          quantity:1
        });
      }
      cart=await cart.save();
      cart=await cart.populate({path:'cartItems.productId'}).execPopulate();
      res.status(200).json({success:true,cart})
    } else {
      let newCartItem = new Cart({ userId, cartItems: [{ productId, quantity:1 }] });
      let savedItem = await newCartItem.save();
      savedItem=await savedItem.populate({path:'cartItems.productId'}).execPopulate();
      res.status(200).json({success:true,cart:savedItem})
    }

  } catch (error) {
    res.status(400).json({success:false,error})
  }
})

Router.delete('/:userId/:productId',async (req,res) =>{
  try{
    const {userId,productId}=req.params;
    let cart = await Cart.findOne({ userId:userId });
    let newList=cart.cartItems.filter(item => !(item.productId == productId));
    cart.cartItems=newList
    cart=await cart.save();
    cart=await cart.populate({path:'cartItems.productId'}).execPopulate();
    res.status(200).json({success:true,cart})
  }catch(error){
    res.status(400).json({success:false,error})
  }
})
module.exports = Router;