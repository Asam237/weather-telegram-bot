import { WEATHER_BOT } from "../../shared/core/config.js";
import axios from "axios";

let city = "Yaounde";

const weather = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_BOT}&units=metric`
    )
    .then((response) => {
      let weather = response.data;
      console.log("Weather ----->>>>>>", weather);
      // let data = `Weather`;
      let data = `Weather in ${weather.location.name}:\Temperature: ${weather.current.temp_c} C (чувст. как ${weather.current.feelslike_c} C)\nВетер: ${weather.current.wind_kph} км/час\nВлажность: ${weather.current.humidity}%\nОблачность: ${weather.current.cloud}%\nДата обновления: ${weather.current.last_updated}`;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export { weather, city };
