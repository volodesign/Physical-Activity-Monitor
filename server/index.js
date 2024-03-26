const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//server setup
const app = express();
const PORT = 3232;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//connect to mongo
mongoose
  .connect(process.env.MDB_CONNECT)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//set-up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/api", require("./routers/userApi"));
