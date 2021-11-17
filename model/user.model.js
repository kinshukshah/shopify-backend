const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required:"Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required:"Email is required" 
  },
  password: {
    type: String,
    minLength: 5,
    required:"Password is required"
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };