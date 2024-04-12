const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PWA API',
    version: '1.0.0',
    description: 'API documentation for your PWA application',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Development server
      description: 'Development server',
    },
    
    {
      url: 'https://pwa-backend-mzhz.onrender.com', // Production server
      description: 'Production server',
    },
    // Add more servers as needed
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
