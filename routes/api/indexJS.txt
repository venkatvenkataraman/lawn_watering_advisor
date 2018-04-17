console.log("In routes/api/index.js");

const router = require("express").Router();
const weatherDBRoutes = require("./weatherDB");
const weatherUndergroundRoutes = require("./weatherUnderground");

router.use("/weatherDB", weatherDBRoutes);

router.use("/weatherUndergroundForecast", weatherUndergroundRoutes);

module.exports = router;

//LEARNING:
//DON'T THINK I NEED BELOW OR ANY OTHER DEFINITIONS LIKE THESE!!
// router.use("/weatherDB/deleteDB", weatherDBRoutes);
