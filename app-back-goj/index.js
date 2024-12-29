require('dotenv').config();

/* dependencies */
const express = require('express');
const connectDB = require('./configs/db');
const seedData = require('./services/UpdaterService');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swagger');
const UnitOfWork = require('./services/UnitOfWork');

/* models */
const Bus = require('./models/Bus');

/* routes */
const busRoutes = require('./controllers/routes/BusRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const unitOfWork = new UnitOfWork();

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

/**
 * Middleware to serve API documentation.
 * @function
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* Middlewares to handle routes */
app.use('/api/buses', busRoutes);

app.use('/api', require('./controllers/routes/TestRoutes'));

app.listen(PORT, () => {
  console.log(`GdzieOnJest Welcomes Urbanowicz on port ${PORT}`);
  console.log(`SWAGGER at http://localhost:${PORT}/api-docs`);
});