const todoService = require('../services/todo.service');
const { Router } = require('express');

const router = Router();

router.post('/list', todoService.createList);
router.get('/list/userId=:userId', todoService.getAllLists);
router.post('/list/newTodo/userId=:userId/listId=:listId', todoService.createTodo);
router.delete('/list/userId=:userId/listId=:listId', todoService.deleteList);

module.exports = router;
