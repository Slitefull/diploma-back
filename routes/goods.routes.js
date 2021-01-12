const goodsService = require ('../services/goods.service')
const { Router } = require('express')

const router = Router()

router.get('/goods', goodsService.getAllGoods)

module.exports = router