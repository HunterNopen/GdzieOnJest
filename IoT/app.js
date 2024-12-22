const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let lastGpsData = { latitude: 52.2297, longitude: 21.0122 }; //default location

// Providing HTML
app.use(express.static(path.join(__dirname, 'public')));

app.post("/gpsdata", (req, res) => {
    console.log("Dane GPS odebrane:");
    lastGpsData = {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        speed: parseFloat(req.body.speed),
        altitude: parseFloat(req.body.altitude)
    };
    res.send("Dane odebrane");
});

app.get("/gps", (req, res) => {
    res.json(lastGpsData); // Return last location
});

app.listen(PORT, () => {
    console.log(Serwer działa na porcie ${PORT});
});