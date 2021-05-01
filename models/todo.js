const { Schema, model } = require('mongoose');


const schema = new Schema({
  userId: { type: String, required: true },
  todoLists: [{
    listName: { type: String },
    todos: [{
      name: { type: String },
      isActive: { type: Boolean },
    }],
  }],
});

module.exports = model('Todo', schema);
