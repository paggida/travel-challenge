import fs from 'fs';
import path from 'path';
import es from 'event-stream';
import csvParse from 'csv-parse';
import Route from '../../../../src/app/domain/models/Route';
import ResponseObj from '../../../../src/app/domain/models/ResponseObj';
import routeDBServices from '../../../../src/database/services/routeDBServices';
const csvDataFilePath =  path.resolve(__dirname, '..', '..', '..', '..', 'src', 'database', 'data','input-file-test.csv');

describe('Validation of the search for all routes in the CSV file.', () => {
  it('Should be able to get all routes in CSV file.', async () => {
    const output:Array<string[]> = [];

    const csvReader = fs.createReadStream(csvDataFilePath)
    .pipe(csvParse())
    .pipe(
      es.mapSync((line:string[]) => {
        csvReader.pause();
        output.push(line);
        csvReader.resume();
      })
    );

    await new Promise(function(resolve, reject) {
      csvReader.on('end', () => {
        resolve(output);
      });
    });

    const response = await routeDBServices.GetAll('input-file-test.csv');

    expect(response).toBeInstanceOf(ResponseObj);
    expect(response).toHaveProperty('Code', 200);
    expect(response).toHaveProperty('Data');
    expect(response.Data).toHaveLength(output.length);
  });
});

describe('Validation of the route creation flow in the CSV file.', () => {
  it('Should be able to save a new route in the CSV file.', async () => {
    const oldRoutesData = await routeDBServices.GetAll('input-file-test.csv');

    const createResponse = await routeDBServices.SetNew('TestRouteJest,TestRouteJest,99999', 'input-file-test.csv');

    const {Data:newRoutesData} = await routeDBServices.GetAll('input-file-test.csv');

    const newRoutes = newRoutesData[newRoutesData.length-1];


    expect(createResponse).toBeInstanceOf(ResponseObj);
    expect(createResponse).toHaveProperty('Code', 200);
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(createResponse).toHaveProperty('Data');
    expect(createResponse.Data).toHaveProperty('message', 'Successful route creation.');
    expect(newRoutesData.length).toBeGreaterThan(oldRoutesData.Data.length);
    expect(newRoutes).toHaveLength(3);
    expect(newRoutes[0]).toBe('TestRouteJest');
    expect(newRoutes[1]).toBe('TestRouteJest');
    expect(newRoutes[2]).toBe('99999');
  });
});

describe('Validation of the search of a specific route in the CSV file.', () => {
  it('Should be able to find an existing route in the CSV file.', async () => {
    const route = await routeDBServices.Search(['TestRouteJest','TestRouteJest'], 'input-file-test.csv');

    expect(route).toHaveProperty('Code', 200);
    expect(route).toHaveProperty('Data');
    expect(route.Data[0]).toBe('TestRouteJest');
    expect(route.Data[1]).toBe('TestRouteJest');
    expect(route.Data[2]).toBe('99999');
  });
  it('Should not be able to find a not exits route in the CSV file.', async () => {
    const route = await routeDBServices.Search(['TestRouteJest02','TestRouteJest02'], 'input-file-test.csv');

    expect(route).toHaveProperty('Code', 404);
    expect(route).toHaveProperty('Data');
    expect(route.Data).toHaveProperty('message','Route not found.');
  });
});

describe('Validation of the route delete flow in the CSV file.', () => {
  it('Should be able to delete an existing route in the CSV file.', async () => {
    const oldRoutesData = await routeDBServices.GetAll('input-file-test.csv');

    const routeObj = new Route(['TestRouteJest','TestRouteJest'],99999);
    const deleteResponse = await routeDBServices.Delete(routeObj, 'input-file-test.csv');

    const newRoutesData = await routeDBServices.GetAll('input-file-test.csv');

    expect(deleteResponse).toBeInstanceOf(ResponseObj);
    expect(deleteResponse).toHaveProperty('Code', 200);
    expect(newRoutesData).toHaveProperty('Code', 200);
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(deleteResponse).toHaveProperty('Data');
    expect(deleteResponse.Data).toHaveProperty('message', 'Successful delete route.');
    expect(newRoutesData.Data.length).toBeLessThan(oldRoutesData.Data.length);
  });
  it('Should not be able to delete a route that does not exist in the CSV file.', async () => {
    const oldRoutesData = await routeDBServices.GetAll('input-file-test.csv');

    const routeObj = new Route(['TestRouteJest2','TestRouteJest2'],99999);
    const deleteResponse = await routeDBServices.Delete(routeObj, 'input-file-test.csv');

    const newRoutesData = await routeDBServices.GetAll('input-file-test.csv');

    expect(deleteResponse).toBeInstanceOf(ResponseObj);
    expect(deleteResponse).toHaveProperty('Code', 404);
    expect(newRoutesData).toHaveProperty('Code', 200);
    expect(oldRoutesData).toHaveProperty('Code', 200);
    expect(deleteResponse).toHaveProperty('Data');
    expect(deleteResponse.Data).toHaveProperty('message', 'Route not found.');
    expect(newRoutesData.Data.length).toBe(oldRoutesData.Data.length);
  });
});
