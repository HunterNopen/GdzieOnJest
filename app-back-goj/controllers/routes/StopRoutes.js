const express = require('express');
const stopController = require('../StopController');
const router = express.Router();

/**
 * @swagger
 * /api/stops:
 *   get:
 *     summary: Get all stops
 *     description: Retrieves a list of all stops.
 *     responses:
 *       200:
 *         description: A list of stops.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', stopController.getAllStops);
/**
 * @swagger
 * /api/stops/{id}:
 *   get:
 *     summary: Get a stop by ID
 *     description: Retrieves a stop by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stop ID
 *     responses:
 *       200:
 *         description: A stop object.
 *       404:
 *         description: Stop not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/:id', stopController.getStopById);

/**
 * @swagger
 * /api/stops:
 *   post:
 *     summary: Create stops with a transactional operation
 *     description: Adds new stops to the system using a MongoDB transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stopName:
 *                 type: string
 *                 example: "Main Station"
 *               latitude:
 *                 type: number
 *                 example: 41.883
 *               longitude:
 *                 type: number
 *                 example: -87.632
 *     responses:
 *       201:
 *         description: Successfully created stops.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/', stopController.createStop);

/**
 * @swagger
 * /api/stops/{id}:
 *   put:
 *     summary: Update a stop
 *     description: Updates a stop's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stopName:
 *                 type: string
 *                 example: "Updated Station"
 *               latitude:
 *                 type: number
 *                 example: 41.885
 *               longitude:
 *                 type: number
 *                 example: -87.6298
 *     responses:
 *       200:
 *         description: Successfully updated stop.
 *       404:
 *         description: Stop not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', stopController.updateStop);

/**
 * @swagger
 * /api/stops/{id}:
 *   delete:
 *     summary: Delete a stop
 *     description: Deletes a stop from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stop ID
 *     responses:
 *       200:
 *         description: Successfully deleted stop.
 *       404:
 *         description: Stop not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/:id', stopController.deleteStop);

module.exports = router;