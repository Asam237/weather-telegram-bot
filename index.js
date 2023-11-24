import { TELEGRAM_BOT, WEATHER_BOT } from "./shared/core/config.js";
import { Telegraf } from "telegraf";
import fetch from "node-fetch";

const bot = new Telegraf(TELEGRAM_BOT);
const apiKey = WEATHER_BOT;

bot.start((ctx) =>
  ctx.reply(
    "Welcome! Send me a location (city name) to get the current weather."
  )
);

bot.on("text", async (ctx) => {
  const location = ctx.message.text;
  const weatherData = await getWeatherData(location);

  if (weatherData) {
    const message = formatWeatherMessage(weatherData);
    ctx.reply(message);
  } else {
    ctx.reply(
      "Sorry, I couldn't retrieve the weather information for that location."
    );
  }
});

const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const formatWeatherMessage = (weatherData) => {
  const { name, main, weather } = weatherData;
  const temperature = main.temp;
  const description = weather[0].description;
  return `Current weather in ${name}:
  Temperature: ${temperature}°C
  Description: ${description}`;
};

bot.launch();
