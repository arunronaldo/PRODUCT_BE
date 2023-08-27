const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./Routes/routes");
require("dotenv").config();
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = 5001;
const MONGO_URL = "mongodb+srv://arundrc:arun1999@product.h0cqcs6.mongodb.net/";

mongoose
  .connect(MONGO_URL)
  .then((e) => console.log("connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Middleware for fileupload function
console.log(__dirname)
app.use(fileUpload({
  uploadTimeout: 0,
  // limits: { fileSize: },
  useTempFiles: true,
  tempFileDir: `${__dirname}/../temp`
}))

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log("PORT LISTENING ON 5001");
});
