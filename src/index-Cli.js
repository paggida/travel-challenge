const program = require('commander');
const inquirer = require('inquirer');
const package = require('../package.json');
const RouteBLL = require('../src/app/infrastructure/BLL/routeBLL');
const fileNameValidation = require('../src/app/infrastructure/validation/fileNameValidation');
const responseObjValidation = require('../src/app/infrastructure/validation/responseObjValidation');
const routeValidation = require('../src/app/infrastructure/validation/routeValidation');
const routeFunctional = require('../src/app/infrastructure/functional/routeFunctional');

program.version(package.version);

program
  .arguments('[csvFile]')
  .action(async (csvFile) => {
    let inputData={};
    let routeArray=[];
    let bestRoute='';

    if(fileNameValidation.isValidCSVFileName(csvFile)){
      console.log('\nPress "Ctrl+C" to close.');

      do{
        inputData = await inquirer.prompt([{
          type: 'input',
          name: 'route',
          message: 'Please enter the route:'
        }]);

        if(routeValidation.isValidRouteString(inputData.route)){
          routeArray = routeFunctional.getConvertRouteStringToArray(inputData.route);

          bestRoute = await RouteBLL.getCheapest(routeArray[0], routeArray[1], csvFile);

          if(responseObjValidation.isSuccessResponse(bestRoute)){
            console.log(`Best route: ${bestRoute.Data.getBestRouteString()}`);
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
