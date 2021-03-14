const todoService = require('../services/todo.service');
const { Router } = require('express');

const router = Router();

router.post('/list', todoService.createList);
router.get('/list/userId=:userId', todoService.getAllLists);

module.exports = router;
