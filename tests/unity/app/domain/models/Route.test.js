const Route = require('../../../../../src/app/domain/models/Route');

describe('Validation of the instance of a Route object.', () => {
  it('Should be able to instance a valid Route object.', () => {
    const routeObj = new Route(['TestRouteJest1','TestRouteJest2'],99999)

    expect(routeObj).toBeInstanceOf(Route);
    expect(Object.keys(routeObj)).toHaveLength(2);
    expect(routeObj).toHaveProperty('Destinations', ['TestRouteJest1','TestRouteJest2']);
    expect(routeObj).toHaveProperty('Price', 99999);
  });
});

describe('Validation of the conversions methods in a Route object.', () => {
  it('Should be able to convert a valid Route object in a CSV file record.', () => {
    const routeObj = new Route(['TestRouteJest1','TestRouteJest2'],99999)
    const csvRecord = routeObj.ToScvString();

    expect(csvRecord).toBe('TestRouteJest1,TestRouteJest2,99999');
  });
  it('Should be able to convert a valid Route object in a string with the format of "the best route".', () => {
    const routeObj = new Route(['TestRouteJest1','TestRouteJest2','TestRouteJest3'],10)
    const bestRouteString = routeObj.getBestRouteString();

    expect(bestRouteString).toBe('TestRouteJest1 - TestRouteJest2 - TestRouteJest3 > $10');
  });
});
