const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')
const userRoles = require('../consts')

const userService = {
  getAllUsers: async (req, res) => {
    try {
      const usersCount = await User.find({ 'role':'regular' }).countDocuments()
      const adminsCount = await User.find({ 'role':'admin' }).countDocuments()

      await User.find({}, function(err, result) {
        if (err) {
          res.status(500).json({ message: "Can't find users." })
        } else {
          res.status(200).json({ users: result, usersCount, adminsCount });
        }
      })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
  editProfile: async (req, res) => {
    try {
      const { data, userId } = req.body
      const user = await User.findById(userId)

      if (!userId) return res.status(401).json({ message: "Not correct user id" })

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
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
  makeAdmin: async (req, res) => {
    try {
      const { userId } = req.body
      const user = await User.findById(userId)

      if (!user) return res.status(401).json({ message: "User was not found!" })
      if (user.role === userRoles.admin) return res.status(401).json({ message: "User is already admin!" })

      user.role = userRoles.admin
      await user.save()

      res.status(200).json({ message: "User role was updated" })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  },
  removeAdmin: async (req, res) => {
    try {
      const { userId } = req.body
      const user = await User.findById(userId)

      if (!user) return res.status(401).json({ message: "User was not found!" })
      if (user.role === userRoles.regular) return res.status(401).json({ message: "User is already regular!" })

      user.role = userRoles.regular
      await user.save()

      res.status(200).json({ message: "User role was updated" })
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again later." })
    }
  }
}

module.exports = userService