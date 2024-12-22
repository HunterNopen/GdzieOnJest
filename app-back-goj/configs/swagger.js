const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GOJ API',
      version: '1.0.0',
      description: 'API GOJ',
    },
    servers: [
      {
        url: 'http://localhost:4040',
        description: 'Local server',
      },
    ],
  },
  apis: ['./controllers/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
