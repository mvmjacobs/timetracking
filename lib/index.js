"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var Timetracking_1 = require("./core/Timetracking");
var Configstore = require('configstore');
var pkg = require('../package.json');
var config = new Configstore(pkg.name, {
    config: {
        'date_format': 'dd/MM/yyyy',
        'pause_others_on_start': true
    },
    tasks: []
});
var timetracking = new Timetracking_1.default(config);
program
    .version(pkg.version)
    .command('start <task> [description]')
    .description('Start a task with a description.')
    .alias('s')
    .option('-y', 'Pause others taks in progress')
    .option('-n', 'Do not pause others taks in progress')
    .action(function (task, description, options) {
    var pauseOthers = !options.N && (options.Y || timetracking.config.pause_others_on_start);
    timetracking.start(task, description, pauseOthers);
});
program
    .parse(process.argv);
