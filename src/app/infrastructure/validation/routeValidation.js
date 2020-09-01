module.exports = {
  isValidRoute(route){
    const destinations =  route.split('-');
    if(destinations.length !== 2){
      return false
    }
    return this.isValidDestination(destinations[0]) && this.isValidDestination(destinations[1])
  },
  isValidDestination (destination){
    return !isEmpty(destination);
  },
  isValidPrice(price){
    if(isNumber(price)){
      return price>=0;
    }
    return false;
  },
}

const isNumber = number => (!isNaN(parseFloat(number)) && !isNaN(number - 0));
const isEmpty = string => (string.trim().length===0);



