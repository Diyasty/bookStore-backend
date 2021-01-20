const mongoose = require("mongoose");
const { schema } = require("./Author");

let Schema = new mongoose.Schema({
  isbn: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Authors",
  },
  genre: { type: mongoose.Types.ObjectId, ref: "Genre" },
  image: { type: String },
  pages: {
    type: Number,
  },
  price: {
    type: Number,
    default: 0,
    currency: "USD",
  },
  sale: {
    type: Number,
  },
  priceAfterSale: {
    type: Number,
  },
});

Schema.pre("save", async function (n) {
  let book = this;

  const sale = (book.sale / 100) * book.price;

  return (book.priceAfterSale = book.price - sale);
});

let BooksModel = mongoose.model("Books", Schema);
delete BooksModel.sale;

module.exports = BooksModel;
