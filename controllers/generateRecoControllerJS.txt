console.log("In controllers/generateRecoController.js");
const db = require("../models");
var inMemZone;

const axios = require("axios");

function computeNextWaterDateTime(zoneNumber,inMemZone){
  return 1524605500;
  //HARI, PLEASE PLACE YOUR SOPHISTICATED ALGORITHM HERE, REPLACING THE RETURN STATEMENT ABOVE !!!!
}

function updateWateringZoneDB(zoneNumber){
  db.WateringZone
   .find({"zoneNumber": zoneNumber}, function(err, inMemZone) {
    if (!err){ 
      console.log("In generateRecoController.js/updateWateringZoneDB #1");
      console.log("zoneNumber: ", zoneNumber, " inMemZone: ", inMemZone); 
      db.WateringZone.update({"zoneNumber": zoneNumber}, {$set: {"projectedNextWaterDateTime": computeNextWaterDateTime(zoneNumber,inMemZone)}}, function(err, raw){
        if (err) { console.log("database call failed with error:", err)}
        else {console.log ("database call succeeded with zoneNumber and raw = ",zoneNumber, raw)}
      });
      console.log("zone ", zoneNumber, " should now be updated with the nextWaterDateTime!");
    } else {throw err;}
    })
}

module.exports = {
  generateZoneRecos: function(req, res) {
    console.log("In controller/generateRecoController - READY TO DO GREAT THINGS");

    for (let index = 1; index < 7; index++) {
      updateWateringZoneDB(index);
    }
  } 
};
