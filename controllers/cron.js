//Implement CRON JOB to check “ air quality “ for the Paris zone ( latitude: 48.856613 ,longitude: 2.352222)

const open = require('open');
var cron = require('node-cron');
const http = require('http');
cron.schedule('* * * * *', () => {
  http.get('http://localhost:8080/api/air/48.856613,2.352222');
 });

