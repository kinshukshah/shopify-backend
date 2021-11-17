const mongoose=require("mongoose");
const { Schema } = mongoose;

const productSchema=new Schema({
  name:{
    type: String,
    trim: true,
    required: "Name is required",
    maxLength: 50,
  },
  imageUrl:{
    type:String,
    trim:true,
    required:"Image Url is required",
  },
  price:{
    type:Number,
    required:"Price is required",
  },
  brandName:{
    type:String,
    trim:true,
    required:"Brand Name is required",
  },
  description:{
    type:String,
    trim:true,
    required:"Description is required",
  },
  ratings:{
    type:String,
    trim:true,
    required:"Rating is required",
  },
  category:{
    type:String,
    enum:['Hats','Sneakers','Jackets','Womens','Mens'],
    trim:true,
    required:"Category is required",
  },
  featured:{
    type:Boolean,
    default:false,
  },
  banner:{
    type:Boolean,
    default:false,
  },
  sizes:[{size:{
    type:String,
    enum:['S','M','L','XL','UK7','UK8','UK9'],
  }}]
},{timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports={Product};
