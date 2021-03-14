const Todo = require('../models/todo');


const todoService = {
  createTodo: async (req, res) => {
    try {
      const { userId, todo } = req.body;

      const newTodo = new Todo({
        userId,
        todoList: [todo],
      });

      await newTodo.save();
      res.status(201).json('newTodoHasBeenCreated');
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
};

module.exports = todoService;
