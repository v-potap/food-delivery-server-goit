const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const productSchema = new Schema({
  _id: Number,
  sku: Number,
  name: String,
  description: String,
  price: String,
  currency: String,
  weight: Number,
  expiration: Number,
  creatorId: Number,
  categories: Array,
});

productSchema.plugin(timestamp);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;