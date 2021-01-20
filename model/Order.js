const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
