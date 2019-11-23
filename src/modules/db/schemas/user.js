const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;
const timestamp = require("../middleware/timestamp");

const userSchema = new Schema({
  username: { type: String, required: true },
  telephone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  favoriteProducts: [{ type: ObjectId, ref: "Product" }],
  viewedProducts: [{ type: ObjectId, ref: "Product" }],
  orders: [{ type: ObjectId, ref: "Order" }]
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
