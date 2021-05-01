const { Router } = require('express');
const authService = require('../services/auth.service');


const router = Router();

router.post('/register', authService.register);
router.post('/login', authService.login);

module.exports = router;
