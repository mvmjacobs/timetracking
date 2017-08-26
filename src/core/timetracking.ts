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
						if (tsk.stop(TaskStatus.PAUSED)) {
							this.tasks[i] = tsk;
						}
					}
					i++;
				});
			}
		}
		let task = this.getTask(taskName);
		if (task.start(description)) {
			let idx = _.findIndex(this.tasks, ["name", task.name]);
			if (idx === -1) {
				this.tasks.push(task);
			} else {
				this.tasks[idx] = task;
			}
			if (this.updateTasks()) {
				console.log("Task %s started.", task.name);
			}
		}
	}

	public finish(taskName: string): void {
		if (!this.tasks || this.tasks.length === 0) {
			console.log("There are no tasks added yet.");
			return;
		}
		let idx = _.findIndex(this.tasks, ["name", taskName]);
		if (idx === -1) {
			console.log("Task %s not found.", taskName);
			return;
		}
		let task = this.getTask(taskName);
		if (task.stop(TaskStatus.FINISHED)) {
			this.tasks[idx] = task;
			if (this.updateTasks()) {
				console.log("Task %s has been completed.", taskName);
			}
		}
	}

	private getTask(key: string): Task {
		return new Task(key, _.find(this.tasks, ["name", key]));
	}

	private updateTasks(): boolean {
		try {
			this.configStore.set("tasks", this.tasks);
			return true;
		} catch (error) {
			console.log("An error occurred.");
			return false;
		}
	}
}
