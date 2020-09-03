const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const csvParse = require('csv-parse');
const routerDBServices = require('../../../../src/database/services/routerDBServices');
const csvDataFilePath =  path.resolve(__dirname, '..', '..', '..', '..', 'src', 'database', 'data','input-file.csv');

describe('Validation of the search for all routes in the CSV file.', () => {
  it('Should be able to get all routes in CSV file.', async () => {
    const output = [];

    const csvReader = fs.createReadStream(csvDataFilePath)
    .pipe(csvParse())
    .pipe(
      es.mapSync(line => {
        csvReader.pause();
        output.push(line);
        csvReader.resume();
      })
    );

    const expectResponse =  await new Promise(function(resolve, reject) {
      csvReader.on('end', () => {
        resolve(output)
      });
    });

    const response = await routerDBServices.getAllRoutes();

    expect(response).toHaveLength(expectResponse.length);
  });
});
