// import 3th party packages
import * as colors from "colors";
import * as Configstore from "configstore";
import * as _ from "lodash";
import * as moment from "moment";

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

	public stop(taskName: string, status: TaskStatus): void {
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
		if (task.stop(status)) {
			this.tasks[idx] = task;
			if (this.updateTasks()) {
				let msg = status === TaskStatus.FINISHED ? "completed" : "paused";
				console.log("Task %s has been %s.", taskName, msg);
			}
		}
	}

	public list(date: string): void {
		if (!this.tasks || this.tasks.length === 0) {
			console.log("There are no tasks added yet.");
			return;
		}
		if (date === undefined) {
			date = moment().format("DD/MM/YYYY");
		} else {
			if (!moment(date, "DD/MM/YYYY").isValid()) {
				console.log("Date it is not in a valid format.");
				return;
			}
		}
		let timings: any[] = [];
		let beginTotal = moment();
		let diffTotal = moment();
		let hours;
		let min;
		this.tasks.forEach((t) => {
			let times = _.filter(t.log, (l) => {
				return moment(l.start).format("DD/MM/YYYY") === moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");
			});
			if (times && times.length > 0) {
				let beginTask = moment();
				let diffTask = moment();
				times.forEach((time) => {
					diffTask.add(moment(time.stop).diff(moment(time.start), "ms"));
					diffTotal.add(moment(time.stop).diff(moment(time.start), "ms"));
				});
				hours = diffTask.diff(beginTask, "hours");
				min = moment.utc(moment(diffTask, "HH:mm:ss").diff(moment(beginTask, "HH:mm:ss"))).format("mm");
				timings.push({ name: t.name, time: ((hours < 10 ? "0" : "") + hours) + ":" + min });
			}
		});
		hours = diffTotal.diff(beginTotal, "hours");
		min = moment.utc(moment(diffTotal, "HH:mm:ss").diff(moment(beginTotal, "HH:mm:ss"))).format("mm");
		console.log("");
		console.log("  %s %s ", colors.bgGreen(" " + ((hours < 10 ? "0" : "") + hours) + ":" + min + " "), colors.inverse(" DATE: " + date + " "));
		console.log(colors.white("   TIME  | TASK"));
		if (!timings || timings.length === 0) {
			console.log(colors.grey("   --"));
		} else {
			timings.forEach((time) => {
				console.log(colors.grey("   " + time.time + " | " + time.name));
			});
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
