import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT } from "./shared/core/config.js";
import { city, weather } from "./bot_modules/weather/index.js";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });


bot.onText(/\/hi/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}`);
});

// bot.onText(/\/help/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, help.info);
// });

// bot.onText(/\/weather/, (msg) => {
//   const chatId = msg.chat.id;
//   city = msg.text.split(" ")[1] ? msg.text.split(" ")[1] : "Yaounde";
//   bot.sendMessage(
//     chatId,
//     weather.then((weather) => bot.sendMessage(chatId, weather))
//   );
// });
