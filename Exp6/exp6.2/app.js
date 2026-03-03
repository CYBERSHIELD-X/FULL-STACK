const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/studentDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const studentRoutes = require('./routes/studentRoutes');
app.use('/', studentRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
