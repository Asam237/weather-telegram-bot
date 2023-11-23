import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT, WEATHER_BOT } from "./shared/core/config.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

const help = `
/hi - Say hello to bot
/weather - Weather in Yaounde`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to your Telegram bot!");
});

bot.onText(/\/hi/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hi, ${msg.from.first_name}`);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, help);
});

bot.onText(/\/dog/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    const imageUrl = response.data.message;
    bot.sendPhoto(chatId, imageUrl);
  } catch (error) {
    console.error("Error fetching dog picture:", error.message);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching the dog picture."
    );
  }
});

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  // city = (msg.text.split(' ')[1]) ? msg.text.split(' ')[1] : 'Yaounde';
  // console.log("CITY --->", city);
  console.log("CITY -->", msg.text.split(" ")[1]);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=mokolo&appid=${WEATHER_BOT}&units=metric`
    );
    bot.sendMessage(chatId, response.data.name);
  } catch (error) {
    console.error("Error fetching dog picture:", error.message);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching the dog picture."
    );
  }
});
