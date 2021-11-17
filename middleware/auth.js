const jwt = require('jsonwebtoken');
function auth(req,res,next){
  let token=req.headers.authorization;
  console.log("Incoming Auth Request",token);
  var decoded = jwt.verify(token, process.env['secretKey']);
  console.log(decoded.userId)
  if(decoded.userId == "25021999"){
    next();
  }else{
    res.status(401).json({success:false,message:"Unauthorized"})
  }
  //next();
}
function hash(req,res,next){
  
  //next();
}
module.exports={auth};