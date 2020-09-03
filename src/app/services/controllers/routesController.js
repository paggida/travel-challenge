const Route = require('../../domain/models/Route');
const RouteBLL = require('../../infrastructure/BLL/routeBLL');
const routeValidation = require('../../infrastructure/validation/routeValidation');

module.exports = {
  async setNew(req, res) {
    const { Destinations, Price } = req.body;

    if(Array.isArray(Destinations) && routeValidation.isValidPrice(Price)){
      const newRouteObj = new Route(Destinations,Price);

      if(routeValidation.isValidRouteObject(newRouteObj)){
        const { Code, Data } = await RouteBLL.setNew(newRouteObj);

        return res.status(Code).json(Data);
      }
    }

    return res.status(401).json({ message: 'Invalid route object.'});
  },
  async getCheapest(req, res) {
    const { originDestination, targetDestination } = req.params;

    return res.status(200).json({ message: `${originDestination} - ${targetDestination}`});
  }
};
