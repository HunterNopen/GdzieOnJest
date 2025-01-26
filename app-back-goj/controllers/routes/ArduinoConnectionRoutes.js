const express = require('express');
const router = express.Router();

let lastGpsData = { latitude: 52.2297, longitude: 21.0122 }; //default location

/**
 * @swagger
 * /api/arduino/gps:
 *   get:
 *     summary: Returns last GPS location
 *     description: Returns the last known GPS data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON containing last GPS data
 *         schema:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             speed:
 *               type: number
 *             altitude:
 *               type: number
 */
router.get('/gps', (req, res) => {
    res.json(lastGpsData); // Return last location
});

/**
 * @swagger
 * /api/arduino/gpsdata:
 *   post:
 *     summary: Receives GPS data
 *     description: Accepts GPS data from an Arduino device
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: gpsData
 *         description: GPS data payload
 *         schema:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             speed:
 *               type: number
 *             altitude:
 *               type: number
 *     responses:
 *       200:
 *         description: Dane odebrane
 */
router.post('/gpsdata', (req, res) => {
    console.log("Dane GPS odebrane:");
    lastGpsData = {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        speed: parseFloat(req.body.speed),
        altitude: parseFloat(req.body.altitude)
    };
    res.send("Dane odebrane");
});

module.exports = router;