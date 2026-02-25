const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB Connect
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/product", require("./routes/productRoutes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
