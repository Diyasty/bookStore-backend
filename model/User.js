const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: false,
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Schema.pre("save", async function (n) {
  let user = this;
  await bcrypt.hash(user.password, 12).then((v) => {
    user.password = v;
    n();
  });
});

let UserModel = mongoose.model("Users", Schema);

module.exports = UserModel;
