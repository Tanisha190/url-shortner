const express = require('express');
const app = express();
const userRoute = require('./src/routes/userRoute');
const urlRoute = require('./src/routes/urlRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


app.use(express.json());
app.use('/user', userRoute);
app.use('/url', urlRoute  );

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('Service Healthy');
});

module.exports = app;