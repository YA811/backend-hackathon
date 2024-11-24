// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  customer_name: String,
  segment: String,
});

const User = mongoose.model('User', userSchema);

// models/Product.js
const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  category: String,
  sub_category: String,
  product_name: String,
  product_cost_to_consumer: Number,
});

const Product = mongoose.model('Product', productSchema);

// models/Region.js
const regionSchema = new mongoose.Schema({
  region_id: { type: String, unique: true },
  country_code: String,
  country: String,
  region: String,
  sub_region: String,
  salesperson: String,
});

const Region = mongoose.model('Region', regionSchema);

// models/Order.js
const orderItemSchema = new mongoose.Schema({
  product_id: String,
  region_id: String,
  sales: Number,
  quantity: Number,
  discount: Number,
  profit: Number,
  postal_code: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
});

const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true },
  order_date: Date,
  ship_date: Date,
  ship_mode: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer_id: String,
  order_items: [orderItemSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  User,
  Product,
  Region,
  Order,
};