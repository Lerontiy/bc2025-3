import { Command } from 'commander';
//import * as fs from 'fs';
//import {copyFile} from 'fs';
const fs = require('node:fs')

const program = new Command();
/*
program
  .version('1.0.1')
  .description('Простий парсер опцій');
*/
program.option('-i, --input', 'Вхідний файл');
program.option('-o, --output', 'Вихідний файл');
program.option('-d, --display', 'Відобразити');

program.parse(process.argv);

const options = program.opts();
const input = options.input
const output = options.output
const display = options.display

if (NOT(input)) {
  console.log('Please, specify input file');
} 
if (output) {

}
if (display) {

}