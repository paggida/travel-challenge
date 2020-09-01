const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteServices = require('../../../database/services/routeServices');

const RouteDAL = Object.assign({}, IRouteMethods);

RouteDAL.setNewRoute = async routeObj =>{
  //TBD
}

RouteDAL.getCheapestRoute = async (originDestination, targetDestination) =>{
  //TBD
}

module.exports = RouteDAL;
