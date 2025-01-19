const express = require('express');
const routeController = require('../RouteController');
const router = express.Router();

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     description: Retrieves a list of all routes.
 *     responses:
 *       200:
 *         description: A list of routes.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', routeController.getAllRoutes);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get a route by ID
 *     description: Retrieves a route by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The route ID
 *     responses:
 *       200:
 *         description: A route object.
 *       404:
 *         description: Route not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/:id', routeController.getRouteById);

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Create routes with a transactional operation
 *     description: Adds new routes to the system using a MongoDB transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeName:
 *                 type: string
 *                 example: "City Center Loop"
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["stop1", "stop2"]
 *     responses:
 *       201:
 *         description: Successfully created routes.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/', routeController.createRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route
 *     description: Updates a route's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeName:
 *                 type: string
 *                 example: "Updated Loop"
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["stop1", "stop2", "stop3"]
 *     responses:
 *       200:
 *         description: Successfully updated route.
 *       404:
 *         description: Route not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/:id', routeController.updateRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete a route
 *     description: Deletes a route from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The route ID
 *     responses:
 *       200:
 *         description: Successfully deleted route.
 *       404:
 *         description: Route not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/:id', routeController.deleteRoute);

module.exports = router;