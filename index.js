import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT } from "./shared/core/config.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

const help = `
/hi - Say hello to bot
/weather - Weather in Yaounde`;

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
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
    )
    .then((response) => {
      bot.sendMessage(chatId, response.data);
    })
    .catch((error) => {
      bot.sendMessage(chatId, error);
    });
});
