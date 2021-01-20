const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],

  firstName: { type: String, max: 100 },
  lastName: { type: String, max: 100 },
  dateOfBirth: { type: Date },
  dateOfDeath: { type: Date },
});

let AuthorsModel = mongoose.model("Authors", Schema);

module.exports = AuthorsModel;
