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

    /*
    let keys = Object.keys(obj[0]);
    if (!options.age) {
        keys = keys.filter(key => key !== 'Age');
        //console.log(keys);
    }
    */
    //console.log(+options.survived || 0);

    if (options.survived){
        obj = obj.filter(passenger => {
            return passenger.Survived === '1';
        });
    }

    /*
    keys = [
        "Name",
        "Ticket"
    ]

    if (program.age) {
        keys.append("Age");
    }
    */

    //jsonStr = JSON.stringify(obj, keys, 4);

    let all_zapys = []
    for (let passanger of obj) { 
        let zapys = [];
        zapys.push(passanger.Name);
        if (options.age) {
            zapys.push(passanger.Age);
        }
        zapys.push(passanger.Ticket);
        //console.log(passanger.Name);
        all_zapys.push(zapys.join(" "));
    }

    //console.log(all_zapys.length);
    all_zapys = all_zapys.join("\n");
        
    if (output) {
        writeFileSync(output, all_zapys, {
            'encoding': 'utf8',
            'flag': 'w',
            'flush': true
        });
    }

    if (display) {
        console.log(all_zapys)
        //console.log(obj.length)
    }
}
