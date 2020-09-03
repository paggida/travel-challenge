const IRouteMethods = require('../../domain/contracts/IRouteMethods');
const RouteServices = require('../../../database/services/routeDBServices');
const ResponseObj = require('../../domain/models/ResponseObj');

const RouteDAL = Object.assign({}, IRouteMethods);

RouteDAL.setNew = async routeObj =>{
  //TBD
}

RouteDAL.getCheapest = async (originDestination, targetDestination) =>{
  //TBD
}

module.exports = RouteDAL;

  const testeFnc = async () => {
    //const teste = await RouteServices.setNew('ABC,CBA,999');
    const search = await RouteServices.getAll();
    console.log(search);
    console.log(await RouteServices.delete(['SCL','ORL'],20));
    const search2 = await RouteServices.getAll();
    console.log(search2);
  }

  testeFnc();
