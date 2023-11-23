import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT, WEATHER_BOT } from "./shared/core/config.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

const help = `
/start - 😊 Welcome
/hi - 👋  Say hello to bot
/help -🐰 Help section
/weather - 🌦️ Weather in Yaounde`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `Welcome to your Telegram bot! 🌟 How can I assist you today?`;
  bot.sendMessage(chatId, welcomeMessage);
});

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
  const city = msg.text.split(" ")[1] ? msg.text.split(" ")[1] : "yaounde";
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
  );
  try {
    const data =
      "City: " +
      response.data.name +
      "\nTemperature: " +
      response.data.main.temp +
      " °C";
    bot.sendMessage(chatId, data);
  } catch (error) {
    console.error("Error fetching dog picture:", error.message);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching the dog picture."
    );
  }
});
