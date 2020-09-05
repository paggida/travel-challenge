const IRouteBLLMethods = require('../../domain/contracts/IRouteBLLMethods');
const ResponseObj = require('../../domain/models/ResponseObj');
const RouteDAL = require('../DAL/routeDAL');
const resObjValidation = require('../validation/responseObjValidation');

const RouteBLL = Object.assign({}, IRouteBLLMethods);

RouteBLL.setNew = async routeObj =>{
  const existingRoute = await RouteDAL.search(routeObj.Destinations);

  if(resObjValidation.isSuccessResponse(existingRoute)){
    return new ResponseObj(401, 'Route already existing.');
  }

  return await RouteDAL.setNew(routeObj);
}

RouteBLL.getCheapest = async (originDestination, targetDestination, dataFile = 'input-file.csv') =>{
  //TBD
  return new ResponseObj(501,'Not implemented.');
}

module.exports = RouteBLL;
