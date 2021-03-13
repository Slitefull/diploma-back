const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String },
  surname: { type: String },
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  status: { type: String },
})

module.exports = model('Users', schema)
