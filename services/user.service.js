const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')
const userRoles = require('../consts')

const userService = {
  getAllUsers: async (req, res) => {
    try {
      await User.find({}, function(err, result) {
        if (err) {
          res.status(500).json("cantFindUsers")
        } else {
          res.status(200).json({ users: result });
        }
      })
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  editProfile: async (req, res) => {
    try {
      const { data, userId } = req.body
      const user = await User.findById(userId)

      if (!userId) return res.status(401).json("notCorrectUserId")

      user.name = data.name
      await user.save()

      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
        },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.status(200).json({ token })
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  makeAdmin: async (req, res) => {
    try {
      const { userId } = req.body
      const user = await User.findById(userId)

      if (!user) return res.status(401).json("userWasNotFound")
      if (user.role === userRoles.admin) return res.status(401).json("userIsAlreadyAdmin")

      user.role = userRoles.admin
      await user.save()

      res.status(200).json("userRoleWasUpdated")
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  removeAdmin: async (req, res) => {
    try {
      const { userId } = req.body
      const user = await User.findById(userId)

      if (!user) return res.status(401).json("userWasNotFound")
      if (user.role === userRoles.regular) return res.status(401).json("userIsAlreadyRegular")

      user.role = userRoles.regular
      await user.save()

      res.status(200).json("userRoleWasUpdated")
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  }
}

module.exports = userService
