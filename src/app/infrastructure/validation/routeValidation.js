const Route = require('../../domain/models/Route');

module.exports = {
  isValidRouteObject(routeObj){
    if(routeObj instanceof Route){
      if(isValidDestinationArraySize(routeObj.Destinations)){
        return (this.isValidDestination(routeObj.Destinations[0]) &&
                this.isValidDestination(routeObj.Destinations[1]) &&
                this.isValidPrice(routeObj.Price));
      }
    }
    return false;
  },
  isValidRouteString(routeString){
    const destinations =  routeString.split('-');
    if(isValidDestinationArraySize(destinations)){
      return this.isValidDestination(destinations[0]) && this.isValidDestination(destinations[1])
    }
    return false;
  },
  isValidDestination (destination){
    return !isEmpty(destination);
  },
  isValidPrice(price){
    if(isNumber(price)){
      return price>=0;
    }
    return false;
  }
}

const isValidDestinationArraySize = destinationArray => (destinationArray.length === 2);
const isNumber = number => (!isNaN(parseFloat(number)) && !isNaN(number - 0));
const isEmpty = string => (string.trim().length===0);



