const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     description: A simple test endpoint.
 *     responses:
 *       200:
 *         description: Success.
 */
router.get('/test', (req, res) => {
  res.status(200).send('Test endpoint works!');
});

module.exports = router;