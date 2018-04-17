console.log("In routes/api/weatherDB.js");
const router = require("express").Router();
const weatherDBController = require("../../controllers/weatherDBController");

// Matches with "/api/weatherDB"
router
  .route("/")
      .get(weatherDBController.findAll)
      .post(weatherDBController.create)
      .delete(weatherDBController.removeDB);

// Matches with "/api/weatherDB/:id"
router
  .route("/:id")
      .get(weatherDBController.findById)
      .put(weatherDBController.update)
      .delete(weatherDBController.remove);

//LEARNING:
//DON'T THINK I NEED BELOW OR ANY OTHER DEFINITIONS LIKE THESE!!
//JUST NEED THE ".delete" definition for route("/") above.
// Matches with "/api/weatherDB/deleteDB"
// router
//   .route("/deleteDB")
      //BELOW TWO  does not work.
      // .then (response => {console.log("In routes/api/weatherDB.js")})
      // .delete(weatherDBController.removeDB);
  

module.exports = router;