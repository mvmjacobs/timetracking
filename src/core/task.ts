// import 3th party packages
import * as _ from "lodash/array";
import * as moment from "moment";

// import models
import { TaskStatus } from "./task-status";

export class Task {
	public name: string;
	public description: string;
	public status: TaskStatus;
	public timings: any;
	public log: any[];

	constructor(name: string, values: any) {
		this.name = name;
		this.description = values ? values.description : "";
		this.status = values ? this.getStatusByName(values.status) : TaskStatus.IN_PROGRESS;
		this.timings = values ? values.timings : [];
		this.log = values ? values.log : [];
	}

	public setDescription(description: string): void {
		this.description = description ? description : this.description ? this.description : "";
	}

	public setStatus(status: TaskStatus): void {
		this.status = status;
	}

	public addLog(operation: string): void {
		if (!this.log) {
			this.log = [];
		}
		this.log.push(operation + "#" + moment().toISOString());
	}

	public start(description: string): boolean {
		let lastTime = _.last(this.timings);
		if (lastTime && lastTime.start && !lastTime.stop) {
			console.log("This tasks already started.");
			return false;
		}
		this.timings.push({
			start: moment().toDate(),
		});
		this.setDescription(description);
		this.setStatus(TaskStatus.IN_PROGRESS);
		this.addLog("start");
		return true;
	}

	public pause(): boolean {
		this.timings[this.timings.length - 1].stop = moment().toDate();
		this.setStatus(TaskStatus.PAUSED);
		this.addLog("pause");
		return true;
	}

	private getStatusByName(status: string): TaskStatus {
		if (!status) {
			return TaskStatus.IN_PROGRESS;
		}
		switch (status) {
			case "IN_PROGRESS":
				return TaskStatus.IN_PROGRESS;
			case "PAUSED":
				return TaskStatus.PAUSED;
			case "FINISHED":
				return TaskStatus.FINISHED;
			default:
				return TaskStatus.IN_PROGRESS;
		}
	}
}
