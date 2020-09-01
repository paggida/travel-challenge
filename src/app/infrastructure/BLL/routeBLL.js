const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteDAL = require('../DAL/routeDAL');
const routeValidation = require('../validation/routeValidation');

const RouteBLL = Object.assign({}, IRouteMethods);

RouteBLL.setNewRoute = async routeObj =>{
  //TBD
  return await RouteDAL.setNewRoute(routeObj);
}

RouteBLL.getCheapestRoute = async (originDestination, targetDestination) =>{
  //TBD
  return await RouteDAL.getCheapestRoute(originDestination, targetDestination);
}

module.exports = RouteBLL;
