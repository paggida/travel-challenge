const fs = require('fs');
const path = require('path');
const es = require('event-stream');
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
  async setNewRoute(partnerObj) {
    //TBD
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
        resolve(output)
      });
    });
  },
};
