const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  todoList: [{
    name: String,
    status: String,
  }],
});

module.exports = model('Todo', schema);
