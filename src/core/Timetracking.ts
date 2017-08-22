import * as Configstore from 'configstore';
import * as _ from 'lodash';
import Task from './Task';

export default class Timetracking {
	configStore: Configstore;
	tasks: Task[];
	config: any;

	constructor(configStore) {
		this.configStore = configStore;
		this.tasks = (configStore.all.tasks) ? configStore.all.tasks : {};
		this.config = (configStore.all.config) ? configStore.all.config : {};
	}

	getTask(key: string): Task {
		let task = _.find(this.tasks, ['name', key]);
		return new Task(key, task);
	}

	start(taskName: string, description: string, pauseOthers: boolean) {
		if (pauseOthers) {
			if (this.tasks && this.tasks.length) {
				this.tasks.forEach(t => {
					if (t.name != taskName && t.status == 'IN_PROGRESS') {
						this.getTask(t.name).pause();
						// Method setStatus() on pause() doesn't working and I don't know why
						// So I do this. srry :/
						t.status = 'PAUSED';
					}
				});
			}
		}
		let task = this.getTask(taskName);
		if (task.start(description) && this.storeTask(task))
			console.log('Task %s started.', task.name);
	}

	storeTask(task: Task): boolean {
		let id = _.findIndex(this.tasks, ['name', task.name]);
		if (id >= 0)
			this.tasks[id] = (<any>Object).assign({}, task);
		else
			this.tasks.push(task);

		this.configStore.set('tasks', this.tasks)
		return true;
	}
}