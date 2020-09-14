import IRoute from './IRoute'
import IResponseObj from './IResponseObj';

interface IRouteBLLMethods {
  SetNew(routeObj:IRoute):Promise<IResponseObj>;
  GetCheapest(originDestination:string, targetDestination:string, dataFile:string):Promise<IResponseObj>;
}

export default IRouteBLLMethods
