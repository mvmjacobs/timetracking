// import 3th party packages
import * as _ from "lodash/array";
import * as moment from "moment";

// import models
import { TaskStatus } from "./task-status";

export default class Task {
	private name: string;
	private description: string;
	private status: TaskStatus;
	private timings: any;
	private log: any[];

	constructor(name: string, values: any) {
		this.name = name;
		this.description = values ? values.description : "";
		// TODO: this.status must be values.status
		this.status = TaskStatus.IN_PROGRESS;
		this.timings = values ? values.timings : [];
		this.log = values ? values.log : [];
	}

	public getName(): string {
		return this.name;
	}

	public setDescription(description: string): void {
		this.description = description ? description : this.description ? this.description : "";
	}

	public getDescription(): string {
		return this.description;
	}

	public setStatus(status: TaskStatus): void {
		this.status = status;
	}

	public getStatus(): TaskStatus {
		return this.status;
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
}
