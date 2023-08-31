const moviesRoutes = require('express').Router();
const {
  getMovies,
  deleteMovie,
  saveMovie,
} = require('../controllers/movies');
// eslint-disable-next-line import/no-unresolved, import/extensions
const { saveMovieValidation, deleteMovieValidation } = require('../middleware/validation');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', saveMovieValidation, saveMovie);
moviesRoutes.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRoutes;
