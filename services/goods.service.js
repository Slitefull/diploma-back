const Goods = require('../models/goods')
const Category = require('../models/category')

const goodsService = {
  createGood: async (req, res) => {
    try {
      const { name, description, category, price, onStockCount=0, thumbnail, discount=0 } = req.body

      const isExist = await Goods.findOne({ name })
      if (isExist) return res.status(400).json("thisCommodityIsAlreadyExists")

      const priceWithDiscount = price - discount;

      const commodity = new Goods({
        name,
        description,
        price,
        discount,
        priceWithDiscount,
        category,
        onStockCount,
        thumbnail,
      })
      await commodity.save()

      res.status(201).json("newCommodityHasBeenCreated")
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  getAllGoods: async (req, res) => {
    try {
      const overallCount = await Goods.countDocuments()
      const overallCountStock = await Goods.find({ 'inStock': 'true' }).countDocuments()

      await Goods.find({}, function (err, result) {
        if (err) {
          res.status(500).json("cantFindGoods")
        } else {
          res.status(200).json({ goods: result, goodsCount: overallCount, onStock: overallCountStock });
        }
      })
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  createGoodsCategory: async (req, res) => {
    const { name } = req.body

    const isExist = await Category.findOne({ name })
    if (isExist) return res.status(400).json('thisCategoryIsAlreadyExist')

    const category = new Category({ name })
    await category.save()

    res.status(201).json("somethingWentWrongPleaseTryAgainLater")
  },
  getAllCategories: async (req, res) => {
    try {
      const overallCount = await Category.countDocuments()

      await Category.find({}, function (err, result) {
        if (err) {
          res.status(500).json("cantFindCategories")
        } else {
          res.status(200).json({ categories: result, categoriesCount: overallCount });
        }
      })
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
}

module.exports = goodsService
