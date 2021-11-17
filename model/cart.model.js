const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  cartItems: [{
    productId:{
      type: Schema.Types.ObjectId,
      ref:"Product"
    },
    quantity:{
      type: Number,
      required: "Quantity is required"
    }
  }]
},{ timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };