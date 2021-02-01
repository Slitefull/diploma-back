const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  onStockCount: { type: Number },
  thumbnail: { type: String },
  discount: { type: Number }
})

module.exports = model('Goods', schema)