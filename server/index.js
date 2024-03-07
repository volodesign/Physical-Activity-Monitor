const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//server setup
const app = express();
const PORT = 3232;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());

//connect to mongo
mongoose.connect(process.env.MDB_CONNECT)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  
//set-up routes
app.use("/auth", require("./routers/userRouter"));