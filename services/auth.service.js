const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')


const authService = {
  register: async (req, res) => {
    try {
      const { name, surname, userName, email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) return res.status(400).json("thisUserIsAlreadyExists")

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ name, surname, userName, email, password: hashedPassword, role: 'regular' })
      await user.save()

      res.status(201).json("newUserHasBeenCreated")
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) return res.status(400).json("userIsNotFound")

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json("invalidPasswordPleaseTryAgain")

      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          surname: user.surname,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.status(200).json({
        avatar: user.avatar || null,
        token,
      })
    } catch (e) {
      res.status(500).json("somethingWentWrongPleaseTryAgainLater")
    }
  }
}

module.exports = authService
