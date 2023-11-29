import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT, WEATHER_BOT } from "./shared/core/config.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

const help = `
/start - 👋 Start to bot
/help -🐰 Help section
/weather - 🌦️ Weather in Yaounde`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Welcome to your Telegram bot ${msg.from.first_name} 😊\nType /help to explore the various options.`
  );
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, help);
});

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text.split(" ")[1] ? msg.text.split(" ")[1] : "yaounde";
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
  );
  try {
    const data =
      "Current weather in: " +
      response.data.name +
      "\nTemperature: " +
      response.data.main.temp +
      "°C\nDescription: " +
      response.data.weather[0].description;
    bot.sendMessage(chatId, data);
  } catch (error) {
    console.error("Error fetching : ", error.message);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching weather."
    );
  }
});

