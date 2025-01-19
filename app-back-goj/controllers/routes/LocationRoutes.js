const express = require('express');
const locationController = require('../LocationController');
const router = express.Router();

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     description: Retrieves a list of all locations.
 *     responses:
 *       200:
 *         description: A list of locations.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', locationController.getAllLocations);

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     description: Retrieves a location by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: A location object.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/:id', locationController.getLocationById);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create locations with a transactional operation
 *     description: Adds new locations to the system using a MongoDB transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Central Park"
 *               latitude:
 *                 type: number
 *                 example: 40.7829
 *               longitude:
 *                 type: number
 *                 example: -73.9654
 *     responses:
 *       201:
 *         description: Successfully created locations.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/', locationController.createLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location
 *     description: Updates a location's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Park"
 *               latitude:
 *                 type: number
 *                 example: 40.7893
 *               longitude:
 *                 type: number
 *                 example: -73.9740
 *     responses:
 *       200:
 *         description: Successfully updated location.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', locationController.updateLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     description: Deletes a location from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: Successfully deleted location.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/:id', locationController.deleteLocation);

module.exports = router;