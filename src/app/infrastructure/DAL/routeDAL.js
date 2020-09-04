const IRouteDALMethods = require('../../domain/contracts/IRouteDALMethods');
const RouteServices = require('../../../database/services/routeDBServices');
const ResponseObj = require('../../domain/models/ResponseObj');

const RouteDAL = Object.assign({}, IRouteDALMethods);

RouteDAL.setNew = async routeObj =>{
  return await RouteServices.setNew(routeObj.ToScvString());
}

RouteDAL.search = async (destinations=[]) =>{
  return await RouteServices.search(destinations);
}

RouteDAL.delete = async (routeObj, dataFile=undefined) =>{
  return new ResponseObj(501,'Not implemented.')
}

RouteDAL.getAll = async (dataFile=undefined) =>{
  if(_isEmptyDataFileValue(dataFile)){
    return await RouteServices.getAll();
  }else{
    return await RouteServices.getAll(dataFile);
  }
}

const _isEmptyDataFileValue = dataFile => dataFile? true: false;

module.exports = RouteDAL;
