import Route from '../../domain/models/Route';
import IAdjacencyList from '../../domain/contracts/IAdjacencyList';

export const isValidRouteObject=(routeObj:Route):boolean => {
  if(_isValidDestinationArraySize(routeObj.Destinations)){
    return (isValidDestination(routeObj.Destinations[0]) &&
            isValidDestination(routeObj.Destinations[1]) &&
            IsPositiveNumber(routeObj.Price));
  }

  return false;
};

export const isValidRouteString=(routeString:string):boolean => {
  const destinations:string[] =  routeString.split('-');

  if(_isValidDestinationArraySize(destinations)){
    return isValidDestination(destinations[0]) && isValidDestination(destinations[1])
  }
  return false;
};

export const isValidDestination=(destination:string):boolean => !_isEmpty(destination);

export const IsPositiveNumber=(number:number):boolean => number>=0;

export const isDifferentDestinations=(originDestination:string, targetDestination:string):boolean => originDestination!==targetDestination;

export const isDestinationKnowInAdjacencyList=(destination:string, adjacencyList:IAdjacencyList):boolean => adjacencyList.GetNodeIndex(destination)>=0;

const _isValidDestinationArraySize = (destinationArray:string[]):boolean => destinationArray.length === 2;

const _isEmpty = (string:string):boolean => string.trim().length===0;
