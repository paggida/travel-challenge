const Route = require('../../../../../src/app/domain/models/Route');

describe('Validation of the conversions methods in a Route object.', () => {
  it('Should be able to convert a valid Route object in a CSV file record.', () => {
    const routeObj = new Route(['TestRouteJest1','TestRouteJest2'],99999)
    const csvRecord = routeObj.ToScvString();

    expect(csvRecord).toBe('TestRouteJest1,TestRouteJest2,99999');
  });
});
