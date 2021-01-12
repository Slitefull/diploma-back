const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String },
  price: { type: Number },
  count: { type: Number },
  thumbnail: { type: String },
  inStock: { type: Boolean }
})

module.exports = model('Goods', schema)