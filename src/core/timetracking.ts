// import 3th party packages
import * as Configstore from "configstore";
import * as _ from "lodash";

// import models
import { Task } from "./task";
import { TaskStatus } from "./task-status";

export class Timetracking {
	public config: any;
	private configStore: Configstore;
	private tasks: Task[];

	constructor(configStore) {
		this.configStore = configStore;
		this.tasks = (configStore.all.tasks) ? configStore.all.tasks : {};
		this.config = (configStore.all.config) ? configStore.all.config : {};
	}

	public getTask(key: string): Task {
		return new Task(key, _.find(this.tasks, ["name", key]));
	}

	public start(taskName: string, description: string, pauseOthers: boolean) {
		if (pauseOthers) {
			if (this.tasks && this.tasks.length) {
				this.tasks.forEach((t) => {
					if (t.getName() !== taskName && t.getStatus() === TaskStatus.IN_PROGRESS) {
						t.pause();
					}
				});
			}
		}
		let task = this.getTask(taskName);
		if (task.start(description) && this.storeTask(task)) {
			console.log("Task %s started.", task.getName());
		}
	}

	public storeTask(task: Task): boolean {
		let id = _.findIndex(this.tasks, ["name", task.getName()]);
		if (id >= 0) {
			this.tasks[id] = Object.assign({}, task);
		} else {
			this.tasks.push(task);
		}

		this.configStore.set("tasks", this.tasks);
		return true;
	}
}
