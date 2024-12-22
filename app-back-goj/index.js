require('dotenv').config();

/* dependencies */
const express = require('express');
const connectDB = require('./configs/db');
const seedData = require('./services/UpdaterService');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger');

/* routes */
const busRoutes = require('./controllers/routes/BusRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
if (process.env.UPDATE_DB_WITH_TEST_DATA === 'TRUE') seedData();

app.use(express.json());


/**
 * Test check of conectivity.
 * @name get/
 * @function
 * @memberof module:express.Router
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/', (req, res) => {
  res.send('GdzieOnJest Welcomes Urbanowicz!');
});

app.listen(PORT, () => {
  console.log(`GdzieOnJest Welcomes Urbanowicz on port ${PORT}`);
  console.log(`SWAGGER at http://localhost:${PORT}/api-docs`);
});