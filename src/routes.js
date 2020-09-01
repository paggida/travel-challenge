const express = require('express');
const routesController = require('./app/services/controllers/routesController');

const routes = express.Router();

routes.post('/route', routesController.setNewRoute);
routes.get('/routes/:originDestination/:targetDestination', routesController.getCheapestRoute);

module.exports = routes;
