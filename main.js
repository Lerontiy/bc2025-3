import { Command } from 'commander';
//import * as fs from 'fs';
import {readFileSync, writeFileSync} from 'fs';
//const fs = require('node:fs')

const program = new Command();
/*
program
  .version('1.0.1')
  .description('Простий парсер опцій');
*/
program.option('-i, --input <filename>', 'Вхідний файл');
program.option('-o, --output <filename>', 'Вихідний файл');
program.option('-d, --display', 'Відобразити');
program.option('-s, --survived', 'Лише пасажири, які вижили');
program.option('-a, --age', 'Чи відображати вік');
program.parse(process.argv);

const options = program.opts();
const input = options.input;
const output = options.output;
const display = options.display;

if (!input) {
    console.log('Please, specify input file');
} else {
    let jsonStr;
    let obj;

    try {
        jsonStr = readFileSync(input, {
            'encoding': 'utf8',
            'flag': 'r'
        });
        obj = JSON.parse(jsonStr);
    } catch (ENOENT){
        console.log("Cannot find input file");
        process.exit();
    }

    let keys = Object.keys(obj[0]);
    if (!options.age) {
        keys = keys.filter(key => key !== 'Age');
        //console.log(keys);
    }
    //console.log(+options.survived || 0);
    if (options.survived){
        obj = obj.filter(passenger => {
            return passenger.Survived === '1';
        });
    }
    
    jsonStr = JSON.stringify(obj, keys, 4);

    if (output) {
        writeFileSync(output, jsonStr, {
            'encoding': 'utf8',
            'flag': 'w',
            'flush': true
        });
    }

    if (display) {
        console.log(jsonStr)
        //console.log(obj.length)
    }
}
