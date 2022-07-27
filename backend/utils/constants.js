//* Сохраняем в константу код ответа «создано»
module.exports.codCreated = 201;

//* Сохраняем в константу код ответа «внутренняя ошибка сервера»
module.exports.codInternalServerError = 500;

//* Сохраним в константу текст ошибки 'Такого пользователя нет'
module.exports.textErrorNoUser = 'Такого пользователя нет';

//* Сохраним в константу текст ошибки 'Такой карточки нет'
module.exports.textErrorNoCard = 'Такой карточки нет';

//* Сохраним в константу текст ошибки 'Неправильно указан логин или пароль'
module.exports.textErrorNoValidEmailPassword = 'Неправильные почта или пароль';

//* Сохраним в константу текст ошибки 'На сервере произошла ошибка'
module.exports.textErrorInternalServer = 'На сервере произошла ошибка';

//* Сохраним в константу текст ошибки 'Карточка удалена'
module.exports.textMessageDeleteCard = 'Карточка удалена';

//* Ключевая фраза для создания токена при разработке
module.exports.keywordTokenDev = 'keyword-for-token-generation';

//* Вынес в константы регулярное выражение для проверки URL
module.exports.regExURL = /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/;
