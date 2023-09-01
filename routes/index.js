const routes = require('express').Router();

const { registration, login } = require('../controllers/users');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  registerValidation,
  loginValidation,
// eslint-disable-next-line import/no-unresolved, import/extensions
} = require('../middlewares/validations');

routes.post('/signup', registerValidation, registration);
routes.post('/signin', loginValidation, login);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('*', auth, (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
