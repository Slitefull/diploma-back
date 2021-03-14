const Todo = require('../models/todo');


const todoService = {
  getAllLists: async (req, res) => {
    try {
      const { userId } = req.params;
      await Todo.find({ userId }, function (err, result) {
        if (err) {
          res.status(500).json('cantFindUsers');
        } else {
          res.status(200).json({ lists: result });
        }
      });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  createList: async (req, res) => {
    try {
      const { userId, list } = req.body;

      const newTodo = new Todo({ userId, todoLists: [list] });

      await newTodo.save();
      res.status(201).json('newTodoListHasBeenCreated');
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
};

module.exports = todoService;
