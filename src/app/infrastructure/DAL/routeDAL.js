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

RouteDAL.delete = async (DataFile) =>{
  //TBD
}

RouteDAL.getAll = async (DataFile) =>{
  //TBD
}

module.exports = RouteDAL;
