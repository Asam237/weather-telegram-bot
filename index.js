import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT, WEATHER_BOT } from "./shared/core/config.js";
import axios from "axios";

const bot = new TelegramBot(TELEGRAM_BOT, { polling: true });

const help = `
/start - 👋  Start to bot
/help -🐰 Help section
/weather - 🌦️ Weather in Yaounde`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Welcome to your Telegram bot ${msg.from.first_name} 😊\nType /help to explore the various options.`
  );
});

bot.onText(/\/todo/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `Welcome to the To-Do List Bot! 
  To add a task, use the /add command. 
  To view your tasks, use the /tasks command. 
  To remove a task, use the /remove command.`;

  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/add (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const task = match[1];

  if (!tasks.has(chatId)) {
    tasks.set(chatId, []);
  }

  tasks.get(chatId).push(task);

  bot.sendMessage(chatId, `Task "${task}" added successfully!`);
});

// Handle /tasks command
bot.onText(/\/tasks/, (msg) => {
  const chatId = msg.chat.id;

  if (!tasks.has(chatId) || tasks.get(chatId).length === 0) {
    bot.sendMessage(chatId, 'You have no tasks.');
  } else {
    const taskList = tasks.get(chatId).join('\n');
    bot.sendMessage(chatId, `Your tasks:\n${taskList}`);
  }
});

// Handle /remove command
bot.onText(/\/remove (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const taskToRemove = match[1];

  if (!tasks.has(chatId) || tasks.get(chatId).length === 0) {
    bot.sendMessage(chatId, 'You have no tasks to remove.');
  } else {
    const taskIndex = tasks.get(chatId).indexOf(taskToRemove);

    if (taskIndex !== -1) {
      tasks.get(chatId).splice(taskIndex, 1);
      bot.sendMessage(chatId, `Task "${taskToRemove}" removed successfully!`);
    } else {
      bot.sendMessage(chatId, `Task "${taskToRemove}" not found.`);
    }
  }
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
      " °C\nDescription: " +
      response.data.weather[0].description;
    bot.sendMessage(chatId, data);
  } catch (error) {
    console.error("Error fetching dog picture:", error.message);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching the dog picture."
    );
  }
});
