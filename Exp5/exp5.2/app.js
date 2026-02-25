const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/", require("./routes/studentRoutes"));

// Error Handling
app.use((err, req, res, next) => {
    res.render("error", { message: err.message });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
