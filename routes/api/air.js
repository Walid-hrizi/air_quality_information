const air_quality = require("../../controllers/air_quality.js");
var router = require("express").Router();
 const App = app => {
  // Post a new router Air with latitude and longitude
  router.get("/air/:latitude,:longitude", air_quality.find);
  // Get datetime where the paris zone is the most polluted
  router.get("/air/maxzone", air_quality.maxzone);
 
  app.use("/api", router);
};
module.exports = App