const goodsService = require('../services/goods.service');
const { Router } = require('express');

const router = Router();

router.get('/goods', goodsService.getAllGoods);
router.post('/goods', goodsService.createGood);
router.post('/category', goodsService.createGoodsCategory);
router.get('/category', goodsService.getAllCategories);

module.exports = router;
