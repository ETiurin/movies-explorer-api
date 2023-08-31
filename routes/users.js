const userRoutes = require('express').Router();
const {
  createUser,
  getUserInfo,
} = require('../controllers/users');
// eslint-disable-next-line import/no-unresolved, import/extensions
const { createUserValidation } = require('../middleware/validation');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', createUserValidation, createUser);

module.exports = userRoutes;
