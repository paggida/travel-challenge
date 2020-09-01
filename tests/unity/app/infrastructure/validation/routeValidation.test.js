const routeValidation = require('../../../../../src/app/infrastructure/validation/routeValidation');

describe('Validation of the route.', () => {
  it('Should be able to validate a valid route.', () => {
    const isValid = routeValidation.isValidRoute('GRU-CGD');

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a route without two destinations.', () => {
    const isValid = routeValidation.isValidRoute('-CGD');

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a route without the separator.', () => {
    const isValid = routeValidation.isValidRoute('GRUCGD');

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a route with more than one separator.', () => {
    const isValid = routeValidation.isValidRoute('GRU-CGD-BRC');

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
