import axios from "axios";

console.log("In client/src/utils/API.js");

//Weather UnderGround API Functions

export default {
  // Gets weather forecast information from the Weather Underground API
  getWeatherForecast: function(response) {
       return axios.get("/api/weatherUndergroundForecast");
  },


//Weather DB API Functions

  deleteWeatherForecastInDB: function() {
       return axios.delete("/api/weatherDB");
  },
  readWeatherFromDB: function() {
    return axios.get("/api/weatherDB");
  },


//Zone DB API Functions

  deleteWateringZoneInDB: function() {
       return axios.delete("/api/zoneDB");
  },
  readWateringZoneFromDB: function() {
    return axios.get("/api/zoneDB");
  },

};
