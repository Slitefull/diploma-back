const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  priceWithDiscount: { type: Number },
  category: { type: String, required: true },
  description: { type: String },
  onStockCount: { type: Number },
  thumbnail: { type: String },
});

module.exports = model('Goods', schema);
