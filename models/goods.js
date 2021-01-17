const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  category: { type: String, required: true },
  description: { type: String },
  count: { type: Number },
  thumbnail: { type: String },
  discount: { type: Boolean }
})

module.exports = model('Goods', schema)