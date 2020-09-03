const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteServices = require('../../../database/services/routeDBServices');
const ResponseObj = require('../../domain/models/ResponseObj');

const RouteDAL = Object.assign({}, IRouteMethods);

RouteDAL.setNew = async routeObj =>{
  return await RouteServices.setNew(routeObj.ToScvString());
}

RouteDAL.search = async (destinations=[]) =>{
  return await RouteServices.search(destinations);
}

RouteDAL.getCheapest = async (originDestination, targetDestination) =>{
  //TBD
}

module.exports = RouteDAL;
