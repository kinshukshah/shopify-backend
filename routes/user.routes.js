const express = require('express');
const Router = express.Router();
const { auth } = require("../middleware/auth");
const {User}=require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require('lodash')

Router.get('/getUser', auth, (req, res) => {
  let user = { name: "Kinshuk", age: 22, pincode: 401107 };
  res.json({ success: true, user})
});

Router.get('/:userId',async (req,res) =>{
  try{
    let {userId}=req.params;
    let user=await User.findById({_id:userId});

    user ? res.status(200).json({success:true,user:_.pick(user,['email','name','token','_id'])}):res.status(400).json({success:false,error:"User not found"});
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
})

function getJwtToken(userId) {
  var token = jwt.sign({ userId: userId }, process.env['secretKey'], { expiresIn: '24h' });
  return {token,tokenExp:24};
}

Router.post('/login',async (req, res) => {
  let { email, password } = req.body;
  try{
  const user = await User.findOne({ email });
  if(user){
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        let{token,tokenExp}=getJwtToken(user._id)
        let doc = await User.findOneAndUpdate({email}, {token,tokenExp}, {new: true});
        res.status(200).json({success:true,user:_.pick(doc,['_id',"email","name","token"])})
      } else {
        res.status(400).json({ success:false,error: "Invalid Password" });
      }
  }else {
      res.status(401).json({ success:false,error: "User does not exist" });
  }
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
  // if (username == "kinshuk" && password == "kinshuk@123") {
  //   let token=getJwtToken("25021999");
  //   res.status(200).json({success:true,token})
  // }else{
  //   res.status(401).json({success:false})
  // }
});

// Router.post('/', (req, res) => {
//   console.log("Incoming");
//   let { username, password } = req.body;
//   if (username == "kinshuk" && password == "kinshuk@123") {
//     let token=getJwtToken("25021999");
//     res.status(200).json({success:true,token})
//   }else{
//     res.status(401).json({success:false})
//   }
// });


Router.post('/register',async (req, res) => {
  const{body}=req;
  if(!(body.email && body.password && body.name)){
    return res.status(400).json({success:false,message:"Data not formatted properly"})
  }
  const user=new User(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).json({success:true,user:_.pick(doc,['_id','email','name'])}));
});

module.exports = Router;