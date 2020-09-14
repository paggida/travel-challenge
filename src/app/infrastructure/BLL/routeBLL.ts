import RouteDAL from '../DAL/routeDAL';
import ResponseObj from '../../domain/models/ResponseObj';
import Route from '../../domain/models/Route';
import IRouteBLLMethods from '../../domain/contracts/IRouteBLLMethods';
import IResponseObj from '../../domain/contracts/IResponseObj';
import { isSuccessResponse } from '../validation/responseObjValidation';
import { isDifferentDestinations, isDestinationKnowInAdjacencyList } from '../validation/routeValidation';
import { getCheapestRoute, getConvertRoutesArrayToAdjacencyList } from '../functional/routeFunctional';

class RouteBLL implements IRouteBLLMethods {
  async SetNew (routeObj:Route):Promise<IResponseObj> {
    const existingRoute = await RouteDAL.Search(routeObj.Destinations);

    if(isSuccessResponse(existingRoute)){
      return new ResponseObj(401, 'Route already existing.');
    }

    return await RouteDAL.SetNew(routeObj);
  }

  async GetCheapest (originDestination:string, targetDestination:string, dataFile:string = 'input-file.csv'):Promise<IResponseObj>  {

    if(isDifferentDestinations(originDestination, targetDestination)){
      const routesArrayobj = await RouteDAL.GetAll(dataFile);

      if(isSuccessResponse(routesArrayobj)){
        const routeAdjacencyList = getConvertRoutesArrayToAdjacencyList(routesArrayobj.Data);
        const isOriginDestinationInList:boolean = isDestinationKnowInAdjacencyList(originDestination, routeAdjacencyList);
        const isTargetDestinationInList:boolean = isDestinationKnowInAdjacencyList(targetDestination, routeAdjacencyList);

        if(isOriginDestinationInList && isTargetDestinationInList){
          const cheapestRoute = getCheapestRoute(originDestination,targetDestination, routeAdjacencyList)

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
}

export default new RouteBLL();
