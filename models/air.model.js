const mongoose = require("mongoose");
const { format } = require('date-fns');
// Get Date and Time
var x = new Date().getTime();
const today = (`${format(x, 'dd.MM.yyyy do  hh:mm:ss  a')}`);
const ObjectID = require('mongodb').ObjectId;
//Schema : I specified the result of nearest city: by area and pollution
var documentAir_quality = mongoose.Schema(
    {
        Result: {
            data: {
                city: String,
                state: String
            },
            Pollution: {
                ts: String,
                aqius: String,
                mainus: String,
                aqicn: String,
                maincn: String,
                //Save Date and time
                Date_Created: { type: String },
            },
        },
    },
    {
        versionKey: false
    }
);
const documentAir = mongoose.model("air_qualitys", documentAir_quality);
module.exports = { documentAir };
