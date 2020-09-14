import fs from 'fs';
import path from 'path';
import es from 'event-stream';
import { promisify } from 'util';
import csvParse from 'csv-parse';
import IRoute from '../../app/domain/contracts/IRoute';
import IResponseObj from '../../app/domain/contracts/IResponseObj';
import IRouteDALMethods from '../../app/domain/contracts/IRouteDALMethods';
import ResponseObj from '../../app/domain/models/ResponseObj';

class routeDBServices implements IRouteDALMethods {

  async SetNew (newRouteString:string, csvDataFile:string = 'input-file.csv'):Promise<IResponseObj>{
    _initializeDataFile(csvDataFile);

    await promisify(fs.appendFile)(_csvDataFilePath(csvDataFile), `${newRouteString}`)
      .catch((error:Error) =>{
        return new ResponseObj(500, _getErrorMessage(error));
      });

    return new ResponseObj(200, { message: 'Successful route creation.'});

  }

  async Search (destinations:string[], csvDataFile:string = 'input-file.csv'):Promise<IResponseObj> {
    _initializeDataFile(csvDataFile);

    const { Data:dataFileRecordsArray} = await this.GetAll(csvDataFile);
    const route = dataFileRecordsArray.find((route:string[]) => {
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
  }

  async Delete (routeObj:IRoute, csvDataFile:string = 'input-file.csv'):Promise<IResponseObj> {
    const { Destinations, Price } = routeObj;
    const { Data:dataFileRecordsArray} = await this.GetAll(csvDataFile);
    const filterDataFileRecords = dataFileRecordsArray.filter((route:string[])=> route[0]!==Destinations[0] || route[1]!==Destinations[1] || route[2]!== Price.toString());
    const recordsCsvString = filterDataFileRecords.reduce((total:string, route:string[])=>`${total}${route[0]},${route[1]},${route[2]}\n`, '\n').slice(1);

    if(dataFileRecordsArray.length === filterDataFileRecords.length){
      return new ResponseObj(404, 'Route not found.');
    }

    await promisify(fs.writeFile)(_csvDataFilePath(csvDataFile), recordsCsvString, { flag: "w" })
      .catch((error:Error) =>{
        return new ResponseObj(500, _getErrorMessage(error));
      });

    return new ResponseObj(200, { message: 'Successful delete route.' });
  }

  async GetAll (csvDataFile:string = 'input-file.csv'):Promise<IResponseObj> {
    const output:Array<string[]> = [];

    const csvReader = fs.createReadStream(_csvDataFilePath(csvDataFile))
    .pipe(csvParse())
    .pipe(
      es.mapSync((line:string[]) => {
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
  }
}

export default new routeDBServices()

const _initializeDataFile = (csvDataFile:string = 'input-file.csv') =>{
  if(_isDataFileNonexistent(csvDataFile)){
    _createDataFile(csvDataFile);
  }
};

const _csvDataFilePath = (csvDataFile:string = 'input-file.csv') => path.resolve(__dirname, '..', 'data', csvDataFile);
const _isDataFileNonexistent = (csvDataFile:string) => !fs.existsSync(_csvDataFilePath(csvDataFile));
const _createDataFile = (csvDataFile:string) => fs.closeSync(fs.openSync(_csvDataFilePath(csvDataFile), 'a'));

const _getErrorMessage = (error:Error)=> error.message?error.message:`${error}`;
