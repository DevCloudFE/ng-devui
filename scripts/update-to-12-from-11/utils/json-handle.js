const path = require('path');
const fs = require('fs').promises;
const chalk = require('chalk');
const glob = require('glob');
const log = console.log;

module.exports = class JsonHandle {
    constructor(filename, func){
        this._filename = filename;
        this._func = func;
    }
    
    async processContent() {
        const file = path.resolve(this._filename)
        const content = await fs.readFile(file, 'utf8');
        const result = JSON.stringify(this._func(JSON.parse(content)),null, 2);
        return fs.writeFile(file, result, 'utf8').then(
            content !== result
            && log(chalk.blue.bgGreenBright('PROCESSED'), file)
        );
    }
}
