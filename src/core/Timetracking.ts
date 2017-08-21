import * as Configstore from 'configstore';
import Task from './Task';

export default class Timetracking {
	private config: Configstore;
	private tasks: any[];
	private timetrackingConfig: any;

	constructor(config) {
		this.config = config;
		this.tasks = (config.all.tasks) ? config.all.tasks : [];
		this.timetrackingConfig = (config.all.config) ? config.all.config : {};
	}

	getTask(key: string): Task {
		let task = (this.tasks[key]) ? this.tasks[key] : null;
		return new Task(key, task);
	}

	start(taskName: string, description: string) {
		// TODO: Implement method to start a task
		console.log('Start is working!');
	}
}