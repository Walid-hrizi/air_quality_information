const { documentAir } = require("../models/air.model");
const fetch = require('node-fetch');
const { format } = require('date-fns');
const open = require('open');
exports.find = (req, res) => {
    // const longitude = 48.856613;
    // const latitude = 2.352222;
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=f6ad6585-59bc-4198-8a61-2b502eca3b6a`, {
        method: 'GET',
        headers: {
            contentType: 'application/json',
            accept: 'application/json',
        },
    })
        .then(res => res.json())
        // I specified the result of nearest city: by area and pollution
        .then(data => {
            res.send({ Result: ({ data: ({ city: data.data.city, state: data.data.state, country: data.data.country, Pollution: data.data.current.pollution }) }) });
            const D_Air = { Result: ({ data: ({ city: data.data.city, state: data.data.state, country: data.data.country, Pollution: data.data.current.pollution }) }) }
            console.log(D_Air)
            var x = new Date().getTime();
            const today = (`${format(x, 'dd.MM.yyyy do  hh:mm:ss  a')}`);
            // Create a documentAir
            const DocAir = new documentAir({
                Result: {
                    data: {
                        city: data.data.city,
                        state: data.data.state
                    },
                    Pollution: {
                        ts: data.data.current.pollution.ts,
                        aqius: data.data.current.pollution.aqius,
                        mainus: data.data.current.pollution.mainus,
                        aqicn: data.data.current.pollution.aqicn,
                        maincn: data.data.current.pollution.maincn,
                        Date_Created: today,
                    }
                }
            });
            try {
                DocAir
                    .save(D_Air)
                    .then(data => {
                        res.send(data);
                    })
            } catch (error) {
                return res.status(500).send("Something went wrong");

            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Not found."
            });
        });
};
// get datetime where the paris zone is the most polluted
exports.maxzone = (req, res) => {
    documentAir.aggregate([
        {
            $group:
            {
                
                _id: {Zone:"$Result.data.city",Date_Created:"$Result.Pollution.Date_Created", Air_Quality: { $max: "$Result.Pollution.aqius" }},
            }
        },
        {
            '$limit': 1
        }
    ]).then(data => {
        res.send(data);
         console.log(data);

    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Not found."
            });
        });
};