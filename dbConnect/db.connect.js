const mongoose = require("mongoose");
const mySecret = process.env['mongoURI'];
function DBConnect() {
  mongoose
    .connect(mySecret, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error(err));
}

module.exports = { DBConnect }