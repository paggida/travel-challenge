const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteServices = require('../../../database/services/routeServices');
const ResponseObj = require('../../domain/models/ResponseObj');

const RouteDAL = Object.assign({}, IRouteMethods);

RouteDAL.setNewRoute = async routeObj =>{
  //TBD
}

RouteDAL.getCheapestRoute = async (originDestination, targetDestination) =>{
  //TBD
}

module.exports = RouteDAL;
