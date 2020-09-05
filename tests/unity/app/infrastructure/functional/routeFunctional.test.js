const routeFunctional = require('../../../../../src/app/infrastructure/functional/routeFunctional');

describe('Validation of the convertion of route string to array.', () => {
  it('Should be able to convert a route string to array.', () => {
    const routeStringArray = routeFunctional.convertRouteStringToArray('ABC-CBA');

    expect(routeStringArray).toHaveLength(2);
    expect(routeStringArray[0]).toBe('ABC');
    expect(routeStringArray[1]).toBe('CBA');
  });
  it('Should be able to convert a single string to array.', () => {
    const stringArray = routeFunctional.convertRouteStringToArray('ABC');

    expect(stringArray).toHaveLength(1);
    expect(stringArray[0]).toBe('ABC');
  });
});
