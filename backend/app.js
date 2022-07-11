require('dotenv').config();

//* Подключаем фреймворк express для сервера на ноде
const express = require('express');

//* Подключаем модуль для повышения безопасности сервера
const helmet = require('helmet');

//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Подключаем модуль обработки запроса body
const bodyParser = require('body-parser');

//* Подключаем модуль обработки запроса cookie
const cookieParser = require('cookie-parser');

//* Подключаем обработчик ошибок валидации celebrate
const { errors } = require('celebrate');

//* Подключаем модуль ограничения запросов к серверу
const rateLimit = require('express-rate-limit');

const cors = require('./middlewares/cors');

//* Подключаем обработчик router
const routes = require('./routes/index');

//* Возьмём порт (по умолчанию 3000) из переменной окружения
const { PORT = 3000 } = process.env;

//* Создаем приложение методом express
const app = express();

//* Подключаем модуль для логирования
const { requestLogger, errorLogger } = require('./middlewares/logger');

//* Подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

//* Импорт мидлвэр централизованной обработки ошибок
const handlingErrors = require('./middlewares/handlingErrors');

//* Ограничение количества запросов к серверу
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

//* Обрабатываем количество запросов к серверу
app.use(limiter);

//* Повышаем безопасность запроса через модуль helmet
app.use(helmet());

//* Обрабатываем тело запроса через модуль body-parser
app.use(bodyParser.json());

//* Обрабатывает CORS запроса
app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));

//* Обрабатываем куки через модуль cookie-parser
app.use(cookieParser());

//* Подключаем логгер запросов
app.use(requestLogger);

//* Обрабатываем все routes
app.use(routes);

//* Подключаем логгер ошибок
app.use(errorLogger);

//* Обрабатываем ошибки с celebrate
app.use(errors());

//* Централизованная обработка ошибок
app.use(handlingErrors);

//* Установим слушателя на порт
app.listen(PORT);
