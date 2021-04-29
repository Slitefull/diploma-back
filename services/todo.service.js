const Todo = require('../models/todo');


const todoService = {
  getAllLists: async (req, res) => {
    try {
      const { userId } = req.params;
      const { todoLists } = await Todo.findOne({ userId });

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(200).json({ lists: [] });
    }
  },
  createList: async (req, res) => {
    try {
      const { userId, list } = req.body;

      const todoList = await Todo.findOne({ userId });

      if (todoList) {
        const { todoLists } = todoList;
        todoLists.push(list)
        await todoList.save();
        res.status(201).json('newTodoListHasBeenAdded');
      } else {
        const newTodo = new Todo({ userId, todoLists: [list] });
        await newTodo.save();
        res.status(201).json('newTodoListHasBeenCreated');
      }
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  createTodo: async (req, res) => {
    try {
      const { userId, listId } = req.params;
      const { status, todoName } = req.body;

      const lists = await Todo.findOne({ userId });
      const selectedList = lists.todoLists.find((todo) => todo._id.toString() === listId);
      selectedList.todos.push({ todo: todoName, status })
      await lists.save();

      res.status(200).json('newTodoHasBeenCreated');
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
};

module.exports = todoService;
