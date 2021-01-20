const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
  ],
});
module.exports = mongoose.model("Genre", genreSchema);
