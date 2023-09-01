const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const allowedCors = require('cors');
const { loginValidation, createUserValidation } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 1234, DB_URL = 'mongodb://127.0.0.1:27017/diplomadb' } = process.env;
const app = express();
mongoose.connect(DB_URL, {});

const Route = require('./routes');

app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.use(allowedCors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use('/users', auth, Route);
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
