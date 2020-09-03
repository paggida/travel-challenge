const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const ResponseObj = require('../../domain/models/ResponseObj');
const RouteDAL = require('../DAL/routeDAL');
const resObjValidation = require('../validation/responseObjValidation');

const RouteBLL = Object.assign({}, IRouteMethods);

RouteBLL.setNew = async routeObj =>{
  const existingRoute = await RouteDAL.search(routeObj.Destinations);

  if(resObjValidation.isSuccessResponse(existingRoute)){
    return new ResponseObj(401, 'Route already existing.');
  }

  return await RouteDAL.setNew(routeObj);
}

RouteBLL.getCheapest = async (originDestination, targetDestination) =>{
  //TBD
  return await RouteDAL.getCheapest(originDestination, targetDestination);
}

module.exports = RouteBLL;
