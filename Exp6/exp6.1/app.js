const express = require("express");
const app = express();

const logger = require("./middlewares/logger");
const apiRoutes = require("./routes/apiRoutes");

// Logging Middleware (Global)
app.use(logger);

// Routes
app.use("/api", apiRoutes);

// Error Handler (Last Me)
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Server Error ❌");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
