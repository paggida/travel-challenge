#!/usr/bin/env node
import program from 'commander';
import inquirer from 'inquirer';
import packageJson from '../package.json';
import RouteBLL from '../src/app/infrastructure/BLL/routeBLL';
import IResponseObj from '../src/app/domain/contracts/IResponseObj';
import Route from '../src/app/domain/models/Route';
import { isValidCSVFileName } from '../src/app/infrastructure/validation/fileNameValidation';
import { isSuccessResponse } from '../src/app/infrastructure/validation/responseObjValidation';
import { isValidRouteString } from '../src/app/infrastructure/validation/routeValidation';
import { getConvertRouteStringToArray } from '../src/app/infrastructure/functional/routeFunctional';

program.version(packageJson.version);

program
  .arguments('[csvFile]')
  .action(async (csvFile) => {
    let inputData:any;
    let routeArray:string[];
    let bestRoute:IResponseObj;
    const responseBestRoute = new Route();

    if(isValidCSVFileName(csvFile)){
      console.log('\nPress "Ctrl+C" to close.');

      do{
        inputData = await inquirer.prompt([{
          type: 'input',
          name: 'route',
          message: 'Please enter the route:'
        }]);

        if(isValidRouteString(inputData.route)){
          routeArray = getConvertRouteStringToArray(inputData.route);

          bestRoute = await RouteBLL.GetCheapest(routeArray[0], routeArray[1], csvFile);

          if(isSuccessResponse(bestRoute)){
            responseBestRoute.Destinations = bestRoute.Data.Destinations;
            responseBestRoute.Price = bestRoute.Data.Price;
            console.log(`Best route: ${responseBestRoute.GetBestRouteString()}`);
          }
          else{
            console.log(`Error(${bestRoute.Code}):`,bestRoute.Data.message);
          }

        }else{
          console.log('Error(401):','Invalid route.');
        }
      }while(true);
    }else{
      console.log('Error(401):','Invalid csv file.');
    }
  });

program.parse(process.argv);
