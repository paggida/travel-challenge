import IRoute from './IRoute';
import IResponseObj from './IResponseObj';

interface IRouteDALMethods {
  SetNew(newRoute:IRoute | string, csvDataFile:string): Promise<IResponseObj>;
  Search(destinations:string[], csvDataFile:string): Promise<IResponseObj>;
  Delete(routeObj:IRoute, csvDataFile:string): Promise<IResponseObj>;
  GetAll(csvDataFile:string): Promise<IResponseObj>;
}

export default IRouteDALMethods
