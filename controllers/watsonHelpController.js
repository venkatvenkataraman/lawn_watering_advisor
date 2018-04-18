console.log("In controllers/watsonHelpController.js");
const db = require("../models");

module.exports = {
  classifyAndUpdateZoneStatuses: function(req, res) {
    console.log("In controller/watsonHelpController");
    console.log("READY TO ISSUE API CALL TO WATSON AND GET BACK RESULTS");


    console.log("Now ready to update watsonImageClass field in the wateringZone DB")



    // db.CityWateringRest
    //   .find(req.query)
    //   .sort({ date: -1 })
    //   .then(dbCityWateringRest => res.json(dbCityWateringRest))
    //   .catch(err => res.status(422).json(err));
  }
  
};
