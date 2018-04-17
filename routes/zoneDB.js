console.log("In routes/zoneDB.js");
const zoneDBController = require("../controllers/zoneDBController");
//dependencies
const passport = require('passport');

///////////////////////

module.exports = (app) => {

      // Matches with "/zoneDB"
      app
      .route("/api/zoneDB")
            .get(zoneDBController.findAll)
            .post(zoneDBController.create)
            .delete(zoneDBController.removeDB);

      // Matches with "/zoneDB/:id"
      app
      .route("/api/zoneDB:zoneNumber")
            .get(zoneDBController.findById)
            .put(zoneDBController.update)
            .delete(zoneDBController.remove);

}
