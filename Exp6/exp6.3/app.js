const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/transactionDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api", require("./routes/transferRoutes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
