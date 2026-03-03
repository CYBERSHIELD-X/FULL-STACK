const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
