import RouteServices from '../../../database/services/routeDBServices';
import ResponseObj from '../../domain/models/ResponseObj';
import Route from '../../domain/models/Route';
import IRoute from '../../domain/contracts/IRoute';
import IResponseObj from '../../domain/contracts/IResponseObj';
import IRouteDALMethods from '../../domain/contracts/IRouteDALMethods';

class RouteDAL implements IRouteDALMethods {

  async SetNew (routeObj:Route):Promise<IResponseObj> {
    return await RouteServices.SetNew(routeObj.ToScvString());
  }

  async Search (destinations:string[]):Promise<IResponseObj> {
    return await RouteServices.Search(destinations);
  }

  async Delete (routeObj:IRoute, dataFile:string=''):Promise<IResponseObj> {
    return new ResponseObj(501,'Not implemented.');
  }

  async GetAll (dataFile:string=''):Promise<IResponseObj> {
    if(_isEmptyDataFileValue(dataFile)){
      return await RouteServices.GetAll();
    }else{
      return await RouteServices.GetAll(dataFile);
    }
  }
}

const _isEmptyDataFileValue = (dataFile:string):boolean => dataFile? false: true;


export default new RouteDAL();
