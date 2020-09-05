module.exports = {
  getConvertRouteStringToArray(routeString){
    const destinations =  routeString.split('-');
    return destinations;
  }
}



