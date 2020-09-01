#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const package = require('../package.json');

program.version(package.version);

program
  .arguments('[csvFile]')
  .action(async (csvFile) => {
    let inputRoute={};

    console.log('\nPress "Ctrl+C" to close.');

    do{
      inputRoute = await inquirer.prompt([{
        type: 'input',
        name: 'route',
        message: 'Please enter the route:'
      }]);

      if(inputRoute.route!==''){
        console.log(`Best route: ${inputRoute.route}`);
      }
    }while(inputRoute.route.length);
  });

program.parse(process.argv);
