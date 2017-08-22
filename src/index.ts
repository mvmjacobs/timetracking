import * as program from 'commander';
import Timetracking from './core/Timetracking';

const Configstore = require('configstore');
const pkg = require('../package.json');

const config = new Configstore(pkg.name, {
	config: {
		'date_format': 'dd/MM/yyyy',
		'pause_others_on_start': true
	},
	tasks: []
});
const timetracking = new Timetracking(config);

program
	.version(pkg.version)
	.command('start <task> [description]')
	.description('Start a task with a description.')
	.alias('s')
	.option('-y', 'Pause others taks in progress')
	.option('-n', 'Do not pause others taks in progress')
	.action(function (task, description, options) {
		let pauseOthers = !options.N && (options.Y || timetracking.config.pause_others_on_start);
		timetracking.start(task, description, pauseOthers);
	})

program
	.parse(process.argv);
