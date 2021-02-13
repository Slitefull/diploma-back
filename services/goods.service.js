const Goods = require('../models/goods')
const Category = require('../models/category')

const goodsService = {
  createGood: async (req, res) => {
    try {
      const { name, description, category, price, onStockCount, thumbnail, discount } = req.body

      const isExist = await Goods.findOne({ name })
      if (isExist) return res.status(400).json({ message: "This commodity is already exists!" })

      const commodity = new Goods({ name, description, category, price, onStockCount, thumbnail, discount })
      await commodity.save()

      res.status(201).json({ message: "New commodity has been created" })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
  getAllGoods: async (req, res) => {
    try {
      const overallCount = await Goods.countDocuments()
      const overallCountStock = await Goods.find({ 'inStock': 'true' }).countDocuments()

      await Goods.find({}, function (err, result) {
        if (err) {
          res.status(500).json({ message: "Can't find goods." })
        } else {
          res.status(200).json({ goods: result, goodsCount: overallCount, onStock: overallCountStock });
        }
      })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
  createGoodsCategory: async (req, res) => {
    const { name } = req.body

    const isExist = await Category.findOne({ name })
    if (isExist) return res.status(400).json({ message: "This category is already exist!" })

    const category = new Category({ name })
    await category.save()

    res.status(201).json({ message: "New category has been created" })
  },
  getAllCategories: async (req, res) => {
    try {
      const overallCount = await Category.countDocuments()

      await Category.find({}, function (err, result) {
        if (err) {
          res.status(500).json({ message: "Can't find categories." })
        } else {
          res.status(200).json({ categories: result, categoriesCount: overallCount });
        }
      })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
}

module.exports = goodsService
