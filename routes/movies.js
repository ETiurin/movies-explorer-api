const moviesRoutes = require('express').Router();
const {
  getMovies,
  deleteMovie,
  saveMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
// eslint-disable-next-line import/no-unresolved, import/extensions
const { saveMovieValidation, deleteMovieValidation } = require('../middlewares/validations');

moviesRoutes.get('/', auth, getMovies);
moviesRoutes.post('/', auth, saveMovieValidation, saveMovie);
moviesRoutes.delete('/:_id', auth, deleteMovieValidation, deleteMovie);

module.exports = moviesRoutes;
