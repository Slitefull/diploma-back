const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  todoList: [{
    todo: { type: String },
    status: { type: String },
  }],
});

module.exports = model('Todo', schema);
