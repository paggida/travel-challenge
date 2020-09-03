const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const { promisify } = require('util')
const csvParse = require('csv-parse');
const ResponseObj = require('../../app/domain/models/ResponseObj');

const _getErrorMessage = error => error.message?error.message:`${error}`;

const _initializeDataFile = () =>{
  if(_isDataFileNonexistent()){
    _createDataFile();
  }
}
const _createDataFile = () => {
  fs.closeSync(fs.openSync(_csvDataFilePath, 'a'));
};

const _csvDataFilePath = path.resolve(__dirname, '..', 'data', 'input-file.csv');

const _isDataFileNonexistent = () => !fs.existsSync(_csvDataFilePath);

_initializeDataFile();

module.exports = {
  async setNewRoute(newRouteString) {
    const error = await promisify(fs.appendFile)(_csvDataFilePath, `${newRouteString}\n`);

    if (error) {
      return new ResponseObj(500, _getErrorMessage(error));
    }
    else {
      return new ResponseObj(200, 'Successful route creation.');
    }
  },

  async deleteRoute(destinations=[],price) {
    const { Data:dataFileRecordsArray} = await this.getAllRoutes();
    const filterDataFileRecords = dataFileRecordsArray.filter(route => route[0]!==destinations[0] || route[1]!==destinations[1] || route[2]!== price.toString());
    const recordsCsvString = filterDataFileRecords.reduce((total, route)=>`${total}${route[0]},${route[1]},${route[2]}\n`, '\n').slice(1);

    if(dataFileRecordsArray.length === filterDataFileRecords.length){
      return new ResponseObj(404, 'Route not found.');
    }

    const error = await promisify(fs.writeFile)(_csvDataFilePath, recordsCsvString, { flag: "w" });

    if (error) {
      return new ResponseObj(500, _getErrorMessage(error));
    }
    else {
      return new ResponseObj(200, 'Successful delete route.');
    }
  },

  async getAllRoutes() {
    const output = [];

    const csvReader = fs.createReadStream(_csvDataFilePath)
    .pipe(csvParse())
    .pipe(
      es.mapSync(line => {
        csvReader.pause();
        output.push(line);
        csvReader.resume();
      })
    );

    return new Promise(function(resolve, reject) {
      csvReader.on('error', error =>{
        const message = _getErrorMessage(error);
        reject(new ResponseObj(500, message));
      });
      csvReader.on('end', () => {
        resolve(new ResponseObj(200, output));
      });
    });
  },
};
