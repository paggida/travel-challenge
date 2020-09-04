const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const { promisify } = require('util')
const csvParse = require('csv-parse');
const ResponseObj = require('../../app/domain/models/ResponseObj');

module.exports = {
  async setNew(newRouteString, csvDataFile = 'input-file.csv') {

    _initializeDataFile(csvDataFile);

    const error = await promisify(fs.appendFile)(_csvDataFilePath(csvDataFile), `${newRouteString}\n`);

    if (error) {
      return new ResponseObj(500, _getErrorMessage(error));
    }
    else {
      return new ResponseObj(200, { message: 'Successful route creation.'});
    }
  },

  async search(destinations=[], csvDataFile = 'input-file.csv') {

    _initializeDataFile(csvDataFile);

    const { Data:dataFileRecordsArray} = await this.getAll(csvDataFile);
    const route = dataFileRecordsArray.find(route => {
      return (route[0]===destinations[0] && route[1]===destinations[1])
              ||
              (route[0]===destinations[1] && route[1]===destinations[0]);
    });

    if(route){
      return new ResponseObj(200, route);
    }
    else{
      return new ResponseObj(404, 'Route not found.');
    }
  },

  async delete(destinations=[],price, csvDataFile = 'input-file.csv') {
    const { Data:dataFileRecordsArray} = await this.getAll(csvDataFile);
    const filterDataFileRecords = dataFileRecordsArray.filter(route => route[0]!==destinations[0] || route[1]!==destinations[1] || route[2]!== price.toString());
    const recordsCsvString = filterDataFileRecords.reduce((total, route)=>`${total}${route[0]},${route[1]},${route[2]}\n`, '\n').slice(1);

    if(dataFileRecordsArray.length === filterDataFileRecords.length){
      return new ResponseObj(404, 'Route not found.');
    }

    const error = await promisify(fs.writeFile)(_csvDataFilePath(csvDataFile), recordsCsvString, { flag: "w" });

    if (error) {
      return new ResponseObj(500, _getErrorMessage(error));
    }
    else {
      return new ResponseObj(200, { message: 'Successful delete route.' });
    }
  },

  async getAll(csvDataFile = 'input-file.csv') {
    const output = [];

    const csvReader = fs.createReadStream(_csvDataFilePath(csvDataFile))
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

const _initializeDataFile = (csvDataFile = 'input-file.csv') =>{
  if(_isDataFileNonexistent(csvDataFile)){
    _createDataFile(csvDataFile);
  }
};

const _csvDataFilePath = (csvDataFile = 'input-file.csv') => path.resolve(__dirname, '..', 'data', csvDataFile);
const _isDataFileNonexistent = (csvDataFile) => !fs.existsSync(_csvDataFilePath(csvDataFile));
const _createDataFile = (csvDataFile) => fs.closeSync(fs.openSync(_csvDataFilePath(csvDataFile), 'a'));

const _getErrorMessage = error => error.message?error.message:`${error}`;
