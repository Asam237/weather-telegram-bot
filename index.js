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

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
    );
    bot.sendMessage(chatId, response.data);
  } catch (error) {
    console.error("Error fetching:", error);
    bot.sendMessage(chatId, "Sorry, an error occurred while fetching.");
  }
});
