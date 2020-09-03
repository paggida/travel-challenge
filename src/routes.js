const express = require('express');
const routesController = require('./app/services/controllers/routesController');

const routes = express.Router();

routes.post('/route', routesController.setNew);
routes.get('/routes/:originDestination/:targetDestination', routesController.getCheapest);

module.exports = routes;
