const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;
const timestamp = require("../middleware/timestamp");

const orderSchema = new Schema({
  creator: { type: [{ type: ObjectId, ref: "User" }], required: true },
  productsList: {
    type: [
      {
        product: [{ type: ObjectId, ref: "Product", required: true }],
        type: { type: String, enum: ["M", "XL", "XXL"], required: true },
        itemsCount: { type: Number, min: 0, required: true }
      }
    ],
    required: true
  },
  deliveryType: { type: String, required: true, enum: ["delivery", "office"] },
  deliveryAdress: { type: String, required: true },
  sumToPay: { type: Number, min: 0, required: true },
  status: {
    type: String,
    required: true,
    enum: ["inProgress", "declined", "finished", "failed"]
  }
});

orderSchema.plugin(timestamp);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
