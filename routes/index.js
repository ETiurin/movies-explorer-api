const routes = require('express').Router();

const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('*', auth, (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
