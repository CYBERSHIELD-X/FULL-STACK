const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/productDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
