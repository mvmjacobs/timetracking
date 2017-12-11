// import 3th party packages
import * as program from 'commander';
const Configstore = require('configstore');
const pkg = require('../package.json');

// import models
import { TaskStatus } from './core/task-status';
import { Timetracking } from './core/timetracking';

const config = new Configstore(pkg.name, {
	config: {
		date_format: 'MM/dd/yyyy',
		pause_others_on_start: true
	},
	tasks: []
});
const timetracking = new Timetracking(config);

program
	.command('start <task>')
	.description('Start a task.')
	.alias('s')
	.option('-d, --description <task_description>', 'Set task description.')
	.option('-y', 'Pause others taks in progress.')
	.option('-n', 'Do not pause others taks in progress.')
	.action((task, options) => {
		let description = '';
		if (options.description && typeof options.description !== 'function') {
			description = options.description;
		}
		timetracking.start(task, description, !options.N && (options.Y || timetracking.config.pause_others_on_start));
	});

program
	.command('finish [task]')
	.description('Finish a task. If you do not inform the [task] all tasks in progress will be completed.')
	.alias('f')
	.option('-t <timestamp>', 'Set date|hour of finish.')
	.action((task, options) => {
		let date = '';
		if (options.T && typeof options.T !== 'function') {
			if (!task) {
				console.log('To use this option you must enter a task.');
				return;
			}
			date = options.T;
		}
		timetracking.stop(task, TaskStatus.FINISHED, date);
	});

program
	.command('pause [task]')
	.description('Pause a task. If you do not inform the [task] all tasks in progress will be paused.')
	.alias('p')
	.option('-t <timestamp>', 'Set date|hour of pause.')
	.action((task, options) => {
		let date = '';
		if (options.T && typeof options.T !== 'function') {
			if (!task) {
				console.log('To use this option you must enter a task.');
				return;
			}
			date = options.T;
		}
		timetracking.stop(task, TaskStatus.PAUSED, date);
	});

program
	.command('list [date]')
	.description('Resume time of the taks. You can pass the date on format configured (' + (config && config.all.config ? config.all.config.date_format : 'MM/dd/yyyy') + ').')
	.alias('l')
	.action((date) => {
		timetracking.list(date);
	});

program
	.command('add <task> <time_spent> [date]')
	.description('Add a task with a specific time spent and on a specific date. You can pass the date on format configured (' + (config && config.all.config ? config.all.config.date_format : 'MM/dd/yyyy') + ').')
	.alias('a')
	.action((task, timeSpent, date) => {
		timetracking.add(task, timeSpent, date);
	});

program
	.version(pkg.version)
	.parse(process.argv);

if (!program.args.length) {
	program.help();
}
