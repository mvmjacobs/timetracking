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
		this.tasks = configStore.all.tasks ? configStore.all.tasks : [];
		this.config = configStore.all.config ? configStore.all.config : {};
	}

	public start(taskName: string, description: string, pauseOthers: boolean): void {
		if (pauseOthers) {
			if (this.tasks && this.tasks.length > 0) {
				this.tasks.forEach((t, i = 0) => {
					if (t.name !== taskName && t.status === TaskStatus.IN_PROGRESS) {
						let tsk = this.getTask(t.name);
						tsk.pause();
						this.tasks[i] = tsk;
					}
					i++;
				});
			}
		}
		let task = this.getTask(taskName);
		if (task.start(description) && this.storeTask(task)) {
			console.log("Task %s started.", task.name);
		}
	}

	private getTask(key: string): Task {
		return new Task(key, _.find(this.tasks, ["name", key]));
	}

	private storeTask(task: Task): boolean {
		let id = _.findIndex(this.tasks, ["name", task.name]);
		if (id >= 0) {
			this.tasks[id] = Object.assign({}, task);
		} else {
			this.tasks.push(task);
		}

		this.configStore.set("tasks", this.tasks);
		return true;
	}
}
