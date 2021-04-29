const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  todoLists: [{
    listName: { type: String },
    todos: [{
      todo: { type: String },
      status: { type: String }
    }],
  }],
});

module.exports = model('Todo', schema);
