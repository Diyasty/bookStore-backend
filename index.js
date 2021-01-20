const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const cors = require("cors");
const BookRouter = require("./routes/Books");
const GenresRouter = require("./routes/Genres");
const UserRouter = require("./routes/Users");
const OrderRouter = require("./routes/Orders");
const AuthRouter = require("./auth/authRouter");
const AuthorRouter = require("./routes/Authors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errHandler);
app.use("/uploads", express.static("uploads"));
app.use("/books", BookRouter);
app.use("/users", UserRouter);
app.use("/orders", OrderRouter);
app.use("/authors", AuthorRouter);
app.use("/auth", AuthRouter);
app.use("/genres", GenresRouter);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database.."))
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
