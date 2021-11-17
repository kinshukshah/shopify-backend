const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {DBConnect}=require("./dbConnect/db.connect.js");


const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

DBConnect();


app.get("/", (req, res) => {
  res.json({success:true,message:"Welcome to shopify backend"});
});

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/wishlist", require("./routes/wishlist.routes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});