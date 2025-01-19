const express = require('express');
const busController = require('../BusController');
const router = express.Router();

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     description: Retrieves a list of all buses in the system.
 *     responses:
 *       200:
 *         description: A list of buses.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', busController.getAllBuses);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     description: Retrieves a bus by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: A bus object.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/:id', busController.getBusById);

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create buses with a transactional operation
 *     description: Adds new buses to the system using a MongoDB transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 example: "1234"
 *               route:
 *                 type: string
 *                 example: "Route 66"
 *               currentLocation:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 40.7128
 *                   longitude:
 *                     type: number
 *                     example: -74.0060
 *     responses:
 *       201:
 *         description: Successfully created buses.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/', busController.createBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus
 *     description: Updates a bus's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 example: "1234"
 *               route:
 *                 type: string
 *                 example: "Route 66"
 *               currentLocation:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 40.7128
 *                   longitude:
 *                     type: number
 *                     example: -74.0060
 *     responses:
 *       200:
 *         description: Successfully updated bus.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', busController.updateBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus
 *     description: Deletes a bus from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Successfully deleted bus.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/:id', busController.deleteBus);

module.exports = router;