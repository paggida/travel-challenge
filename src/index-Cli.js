#!/usr/bin/env node
const program = require('commander');
const package = require('../package.json');

program.version(package.version);

program
    .command('start')
    .description('Receives the CSV file with the routes.')
    .action(() => {
        console.log('start');
    });

program.parse(process.argv);
