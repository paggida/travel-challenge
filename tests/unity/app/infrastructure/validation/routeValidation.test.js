const Route = require('../../../../../src/app/domain/models/Route');
const routeValidation = require('../../../../../src/app/infrastructure/validation/routeValidation');

describe('Validation of the route in class format.', () => {
  it('Should be able to validate a valid route object.', () => {
    const routeObj = new Route(['A', 'B'],10)
    const isValid = routeValidation.isValidRouteObject(routeObj);

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a invalid route object', () => {
    const isValid = routeValidation.isValidRouteObject({ Destinations: ['A', 'B'], Price: 10});

    expect(isValid).toBeFalsy();
  });
});

describe('Validation of the route in string format.', () => {
  it('Should be able to validate a valid route.', () => {
    const isValid = routeValidation.isValidRouteString('GRU-CGD');

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a route without two destinations.', () => {
    const isValid = routeValidation.isValidRouteString('-CGD');

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a route without the separator.', () => {
    const isValid = routeValidation.isValidRouteString('GRUCGD');

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a route with more than one separator.', () => {
    const isValid = routeValidation.isValidRouteString('GRU-CGD-BRC');

    expect(isValid).toBeFalsy();
  });
});

describe('Validation of the destination.', () => {
  it('Should be able to validate a valid destination.', () => {
    const isValid = routeValidation.isValidDestination('GRU');

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a invalid destination.', () => {
    const isValid = routeValidation.isValidDestination(' ');

    expect(isValid).toBeFalsy();
  });
});

describe("Validation of the route's price.", () => {
  it('Should be able to validate a valid price.', () => {
    const isValid = routeValidation.isValidPrice(25.38);

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a invalid format price.', () => {
    const isValid = routeValidation.isValidPrice('25.A');

    expect(isValid).toBeFalsy();
  });
});

describe("Validation of the different destinations.", () => {
  it('Should be able to validate different destinations.', () => {
    const isDifferent = routeValidation.isDifferentDestinations('A','B');

    expect(isDifferent).toBeTruthy();
  });
  it('Should not be able to validate equals destinations.', () => {
    const isDifferent = routeValidation.isDifferentDestinations('A','A');

    expect(isDifferent).toBeFalsy();
  });
});
