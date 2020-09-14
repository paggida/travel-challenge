import { Request, Response } from 'express';
import Route from '../../domain/models/Route';
import RouteBLL from '../../infrastructure/BLL/routeBLL';
import { IsPositiveNumber, isValidRouteObject, isValidDestination } from '../../infrastructure/validation/routeValidation';


export const setNew = async (req:Request, res:Response) => {
  const { Destinations, Price } = req.body;

  if(Array.isArray(Destinations) && IsPositiveNumber(Price)){
    const newRouteObj = new Route(Destinations,Price);

    if(isValidRouteObject(newRouteObj)){
      const { Code, Data } = await RouteBLL.SetNew(newRouteObj);

      return res.status(Code).json(Data);
    }
  }

  return res.status(401).json({ message: 'Invalid route object.'});
};

export const getCheapest= async (req:Request, res:Response)  => {
  const { originDestination, targetDestination } = req.params;

  if(isValidDestination(originDestination) && isValidDestination(targetDestination)){
    const { Code, Data } = await RouteBLL.GetCheapest(originDestination, targetDestination);

    return res.status(Code).json(Data);
  }else{
    return res.status(401).json({ message: 'Invalid destinations.'});
  }
};
