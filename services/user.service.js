const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/client');
const userRoles = require('../consts');


const userService = {
  getAllUsers: async (req, res) => {
    try {
      await User.find({}, (err, result) => {
        if (err) {
          res.status(500).json('cantFindUsers');
        } else {
          res.status(200).json({ users: result });
        }
      });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  editProfile: async (req, res) => {
    try {
      const { name, email, surname, userName, userId, role, avatar, city, postalCode = 0, address, status } = req.body;
      const user = await User.findById(userId);

      if (!userId) return res.status(401).json('notCorrectUserId');

      user.name = name;
      user.email = email;
      user.surname = surname;
      user.userName = userName;
      user.avatar = avatar;
      user.address = address;
      user.city = city;
      user.postalCode = postalCode;
      user.status = status;

      await user.save();

      const token = jwt.sign(
        { userId, name, email, surname, userName, avatar, address, city, postalCode, status, role },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );

      res.status(200).json({ token });
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  makeAdmin: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) return res.status(401).json('userWasNotFound');
      if (user.role === userRoles.admin) return res.status(401).json('userIsAlreadyAdmin');

      user.role = userRoles.admin;
      await user.save();

      res.status(200).json('userRoleWasUpdated');
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
  removeAdmin: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) return res.status(401).json('userWasNotFound');
      if (user.role === userRoles.regular) return res.status(401).json('userIsAlreadyRegular');

      user.role = userRoles.regular;
      await user.save();

      res.status(200).json('userRoleWasUpdated');
    } catch (e) {
      res.status(500).json('somethingWentWrongPleaseTryAgainLater');
    }
  },
};

module.exports = userService;
