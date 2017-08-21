import * as Configstore from 'configstore';
import Task from './Task';

export default class Timetracking {
	configStore: Configstore;
	tasks: any[];
	config: any;

	constructor(configStore) {
		this.configStore = configStore;
		this.tasks = (configStore.all.tasks) ? configStore.all.tasks : [];
		this.config = (configStore.all.config) ? configStore.all.config : {};
	}

	getTask(key: string): Task {
		let task = (this.tasks[key]) ? this.tasks[key] : null;
		return new Task(key, task);
	}

	getTaskByStatus(status: string): Task[] {
		return this.tasks && this.tasks.length ? this.tasks.filter(t => t.status === status) : [];
	}

	start(taskName: string, description: string) {
		// TODO: Implement method to start a task
		console.log('Start is working!');
	}
}