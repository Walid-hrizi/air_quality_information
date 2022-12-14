
const express = require("express");
// CONFIG DB
const dbConfig = require("./dbConfig"); 
// INITIALIZE APP
const app = express();
// CONNECT TO DB
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./routes/api/air")(app);
//Implement CRON JOB to check “ air quality “ for the Paris zone ( latitude: 48.856613 ,longitude: 2.352222)
require("./controllers/cron");

mongoose.url = dbConfig.mongoURI;
mongoose.connect(dbConfig.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
              })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  // STATIC FOLDER
app.use(express.static(path.join(__dirname, "client/public")));

// SIMPLE ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mini-project AIR QUALITY" });
});
// SET PORT, LISTEN FOR REQUESTS
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
