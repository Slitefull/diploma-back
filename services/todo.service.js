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
        todoLists.push(list);
        await todoList.save();
      } else {
        const newTodo = new Todo({ userId, todoLists: [list] });
        await newTodo.save();
      }
      const { todoLists } = todoList;

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  deleteListById: async (req, res) => {
    try {
      const { userId, listId } = req.params;

      const list = await Todo.findOne({ userId });
      list.todoLists = list.todoLists.filter((item) => item._id.toString() !== listId);
      await list.save();
      const { todoLists } = list;

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  createTodo: async (req, res) => {
    try {
      const { userId, listId } = req.params;
      const { todo } = req.body;

      const list = await Todo.findOne({ userId });
      const selectedList = list.todoLists.find((item) => item._id.toString() === listId);
      selectedList.todos.push(todo);
      await list.save();
      const { todoLists } = list;

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  changeTodoStatus: async (req, res) => {
    try {
      const { userId, listId, todoId } = req.params;
      const { isActive } = req.body;

      const list = await Todo.findOne({ userId });
      const selectedList = list.todoLists.find((item) => item._id.toString() === listId);
      const selectedTodo = selectedList.todos.find((todo) => todo._id.toString() === todoId);
      selectedTodo.isActive = !isActive;
      await list.save();

      const { todoLists } = list;

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { userId, listId, todoId } = req.params;

      const list = await Todo.findOne({ userId });
      const selectedList = list.todoLists.find((item) => item._id.toString() === listId);
      selectedList.todos = selectedList.todos.filter((todo) => todo._id.toString() !== todoId);
      await list.save();
      const { todoLists } = list;

      res.status(200).json({ lists: todoLists });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
};

module.exports = todoService;
