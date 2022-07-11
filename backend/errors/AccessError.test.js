//* Импорт классового элемента ошибки
const AccessError = require('./AccessError');

/* eslint-disable no-undef */
it('Создаем экземпляр объекта ошибки AccessError', () => {
  expect(new AccessError('Можно удалять только свои карточки!'))
    .toEqual(new AccessError('Можно удалять только свои карточки!'));
});

//! Не работает
