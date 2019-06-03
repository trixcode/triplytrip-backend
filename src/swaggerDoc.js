const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');


const options = {
  swaggerDefinition: {
    info: {
      title: "Triplytrip Project",
      version: "1.0.0",
      description: "Swagger from Triplytrip"
    },
    tags: {
      name: 'employees',
      description: 'Все о модели пользователей'
    },
    basePath: '/'
  },
  apis: ['endpoints.js']
};

const specs = swaggerDoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
};