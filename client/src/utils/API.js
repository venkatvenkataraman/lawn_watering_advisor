import axios from "axios";

console.log("In client/src/utils/API.js");

export default {
  // Gets weather forecast information from the Weather Underground API
  getWeatherForecast: function(response) {
       return axios.get("/api/weatherUndergroundForecast");
  },
  deleteWeatherForecastInDB: function() {
       return axios.delete("/api/weatherDB");
  },
  readWeatherFromDB: function() {
    return axios.get("/api/weatherDB");
  }

};
