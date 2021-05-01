const { Router } = require('express');
const todoService = require('../services/todo.service');


const router = Router();

router.post('/list', todoService.createList);
router.get('/list/userId=:userId', todoService.getAllLists);
router.delete('/list/userId=:userId/listId=:listId', todoService.deleteListById);

router.post('/newTodo/userId=:userId/listId=:listId', todoService.createTodo);
router.put('/todoStatus/userId=:userId/listId=:listId/todoId=:todoId', todoService.changeTodoStatus);
router.delete('/deleteTodo/userId=:userId/listId=:listId/todoId=:todoId', todoService.deleteTodo);

module.exports = router;
