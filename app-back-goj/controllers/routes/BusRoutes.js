const express = require('express');
const busController = require('../BusController');
const { createBusTransaction } = require('../BusController');

const router = express.Router();
/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create buses with a transactional operation
 *     description: Adds new buses to the system using a MongoDB transaction.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              busNumber:
 *                type: string
 *                example: "1234"
 *              route:
 *                type: string
 *                example: "Route 66"
 *              currentLocation:
 *                type: object
 *                properties:
 *                  latitude:
 *                    type: number
 *                    example: 40.7128
 *                  longitude:
 *                    type: number
 *                    example: -74.0060
 *     responses:
 *       201:
 *         description: Successfully created buses.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/', (req, res) => {
    try{
        busController.createBus(req, res);
        res.status(200).send({ message: 'Bus information received.', data: req.body });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

// router.get('/', busController.getAllBuses);
// router.get('/:id', busController.getBusById);
// router.put('/:id', busController.updateBus);
// router.delete('/:id', busController.deleteBus);

//router.post('/create-transaction', createBusTransaction);

module.exports = router;