const router = require("express").Router();
const weatherUndergroundController = require("../../controllers/weatherUndergroundController");

// Matches with "/api/weatherForecast"
router
  .route("/")
  .get(weatherUndergroundController.getWeatherForecast);

router
  .route("/api/weatherForecast")
  .get(weatherUndergroundController.getWeatherForecast);
  
module.exports = router;
