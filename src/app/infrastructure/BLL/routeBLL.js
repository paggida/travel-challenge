const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteDAL = require('../DAL/routeDAL');
const routeValidation = require('../validation/routeValidation');

const RouteBLL = Object.assign({}, IRouteMethods);

RouteBLL.setNew = async routeObj =>{
  //TBD
  return await RouteDAL.setNew(routeObj);
}

RouteBLL.getCheapest = async (originDestination, targetDestination) =>{
  //TBD
  return await RouteDAL.getCheapest(originDestination, targetDestination);
}

module.exports = RouteBLL;
