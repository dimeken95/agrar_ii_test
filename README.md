# agro.kz.ai landing

Статический лендинг в стиле предоставленного скриншота.

## Быстрый запуск

Откройте `index.html` в браузере.

## Отправка формы в Telegram

Настройка находится в `script.js`:

- `botToken` — токен Telegram-бота от [@BotFather](https://t.me/BotFather)
- `chatId` — id канала/группы/чата, куда придут заявки

Пример:

```js
const TELEGRAM_CONFIG = {
  botToken: "123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  chatId: "@my_channel_name",
};
```

## Важно по безопасности

Сейчас отправка выполняется напрямую из браузера (просто для быстрого старта).
Для продакшена лучше вынести отправку в backend/API, чтобы не светить токен бота в клиентском JS.
