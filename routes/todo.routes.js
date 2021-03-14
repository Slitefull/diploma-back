const todoService = require('../services/todo.service');
const { Router } = require('express');

const router = Router();

router.post('/todo', todoService.createTodo);

module.exports = router;
