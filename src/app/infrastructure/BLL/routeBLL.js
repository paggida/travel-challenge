const IRouteBLLMethods = require('../../domain/contracts/IRouteBLLMethods');
const ResponseObj = require('../../domain/models/ResponseObj');
const RouteDAL = require('../DAL/routeDAL');
const resObjValidation = require('../validation/responseObjValidation');
const routeValidation = require('../validation/routeValidation');
const routeFunctional = require('../functional/routeFunctional');

const RouteBLL = Object.assign({}, IRouteBLLMethods);

RouteBLL.setNew = async routeObj =>{
  const existingRoute = await RouteDAL.search(routeObj.Destinations);

  if(resObjValidation.isSuccessResponse(existingRoute)){
    return new ResponseObj(401, 'Route already existing.');
  }

  return await RouteDAL.setNew(routeObj);
}

RouteBLL.getCheapest = async (originDestination, targetDestination, dataFile = 'input-file.csv') =>{

  if(routeValidation.isDifferentDestinations(originDestination, targetDestination)){
    const routesArrayobj = await RouteDAL.getAll(dataFile);

    if(resObjValidation.isSuccessResponse(routesArrayobj)){
      const routeAdjacencyList = routeFunctional.getConvertRoutesArrayToAdjacencyList(routesArrayobj.Data);
      const isOriginDestinationInList = routeValidation.isDestinationKnowInAdjacencyList(originDestination, routeAdjacencyList);
      const isTargetDestinationInList = routeValidation.isDestinationKnowInAdjacencyList(targetDestination, routeAdjacencyList);

      if(isOriginDestinationInList && isTargetDestinationInList){
        const cheapestRoute = routeFunctional.getCheapestRoute(originDestination,targetDestination, routeAdjacencyList)

        return new ResponseObj(200, cheapestRoute);
      }else{
        return new ResponseObj(404, 'Destination not found.');
      }
    }else{
      return routesArrayobj;
    }
  }else{
    return new ResponseObj(401, 'Destinations are the same value.');
  }

}

module.exports = RouteBLL;
