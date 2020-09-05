module.exports = {
  convertRouteStringToArray(routeString){
    const destinations =  routeString.split('-');
    return destinations;
  }
}



