import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT } from "./shared/core/config.js";
import { city, get } from "./bot_modules/weather/index.js";
import { help } from "./bot_modules/help/index.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

bot.onText(/\/hi/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hi, ${msg.from.first_name}`);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, help);
});

bot.onText(/\/weather/, (msg) => {
  const chatId = msg.chat.id;
  city = msg.text.split(" ")[1] ? msg.text.split(" ")[1] : "Yaounde";
  bot.sendMessage(
    chatId,
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
      )
      .then((response) => {
        console.log("Response ->", response.data);
        return response.data;
      })
      .then((weather) => bot.sendMessage(chatId, weather))
  );
});
