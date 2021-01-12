const profileService = require('../services/user.service')
const { Router } = require('express')

const router = Router()

router.get('/users', profileService.getAllUsers)
router.put('/profile', profileService.editProfile)
router.post('/makeAdmin', profileService.makeAdmin)
router.delete('/removeAdmin', profileService.removeAdmin)

module.exports = router