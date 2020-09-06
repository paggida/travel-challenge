const request = require('supertest');
const app = require('../../../../../src/server');
const Route = require('../../../../../src/app/domain/models/Route');
const AdjacencyList = require('../../../../../src/app/domain/models/AdjacencyList');
const routeDBServices = require('../../../../../src/database/services/routeDBServices');
const routeFunctional = require('../../../../../src/app/infrastructure/functional/routeFunctional');

describe('Validation of the route create flow.', () => {
  afterAll(async () => {
    const routeObj = new Route(['TestRouteJest','TestRouteJest'],999.99)
    await routeDBServices.delete(routeObj);
  });

  it('Should be able to save a valid route.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: ['TestRouteJest','TestRouteJest'],
        Price: 999.99
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();
    const newRoutes = newRoutesData[newRoutesData.length-1];

    expect(status).toBe(200);
    expect(body).toHaveProperty('message', 'Successful route creation.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBeGreaterThan(oldRoutesData.Data.length);
    expect(newRoutes).toHaveLength(3);
    expect(newRoutes[0]).toBe('TestRouteJest');
    expect(newRoutes[1]).toBe('TestRouteJest');
    expect(newRoutes[2]).toBe('999.99');
  });
  it('Should not be able to save route with only one destination.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: ['TestRouteJest'],
        Price: 999.99
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid route object.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBe(oldRoutesData.Data.length);
  });
  it('Should not be able to save route without destination.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: [],
        Price: 999.99
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid route object.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBe(oldRoutesData.Data.length);
  });
  it('Should not be able to save route with negative price.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: ['TestRouteJest','TestRouteJest'],
        Price: -999.99
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid route object.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBe(oldRoutesData.Data.length);
  });
  it('Should not be able to save route without all required fields.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: ['TestRouteJest','TestRouteJest']
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid route object.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBe(oldRoutesData.Data.length);
  });
  it('Should not be able to save a route already exists.', async () => {
    const oldRoutesData = await routeDBServices.getAll();

    const { status, body } = await request(app)
      .post('/travel-api/route')
      .send({
        Destinations: ['TestRouteJest','TestRouteJest'],
        Price: 999.99
      });

    const {Data:newRoutesData} = await routeDBServices.getAll();

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Route already existing.')
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(newRoutesData.length).toBe(oldRoutesData.Data.length);
  });
});

describe('Validation of the flow to find the cheapest route between two destinations.', () => {
  it('Should be able to get the cheapest route between different destinations.', async () => {
    const originDestination = 'GRU';
    const targetDestination = 'CDG';
    const routesDataArray = await routeDBServices.getAll();
    const routesDataAdjacencyList = routeFunctional.getConvertRoutesArrayToAdjacencyList(routesDataArray.Data);
    const cheapestRoute = routeFunctional.getCheapestRoute(originDestination,targetDestination,routesDataAdjacencyList);

    const { status, body } = await request(app)
      .get(`/travel-api/routes/${originDestination}/${targetDestination}`);

    expect(status).toBe(200);
    expect(routesDataArray.Code).toBe(200);
    expect(body).toHaveProperty('Destinations', cheapestRoute.Destinations);
    expect(body).toHaveProperty('Price',cheapestRoute.Price);
    expect(body.Destinations[0]).toBe(originDestination);
    expect(body.Destinations[body.Destinations.length-1]).toBe(targetDestination);
    expect(1).toBe(1);
  })
  it('Should not be able to get the cheapest route between equals destinations.', async () => {
    const originDestination = 'GRU';
    const targetDestination = 'GRU';

    const { status, body } = await request(app)
      .get(`/travel-api/routes/${originDestination}/${targetDestination}`);

    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Destinations are the same value.');
    expect(1).toBe(1);
  })
})
