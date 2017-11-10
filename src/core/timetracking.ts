// import 3th party packages
import * as colors from 'colors';
import * as Configstore from 'configstore';
import * as _ from 'lodash';
import * as moment from 'moment';

// import models
import { Task } from './task';
import { TaskStatus } from './task-status';

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
			let idx = _.findIndex(this.tasks, ['name', task.name]);
			if (idx === -1) {
				this.tasks.push(task);
			} else {
				this.tasks[idx] = task;
			}
			if (this.updateTasks()) {
				console.log('Task %s started.', task.name);
			}
		}
	}

	public stop(taskName: string, status: TaskStatus, timestamp?: string): void {
		if (!this.tasks || this.tasks.length === 0) {
			console.log('There are no tasks added yet.');
			return;
		}
		if (!taskName) {
			this.tasks.forEach((t, idx = 0) => {
				if (t.status === TaskStatus.IN_PROGRESS) {
					let task = this.getTask(t.name);
					if (task.stop(status)) {
						this.tasks[idx] = task;
					}
				}
				idx++;
			});
		} else {
			let idx = _.findIndex(this.tasks, ['name', taskName]);
			if (idx === -1) {
				console.log('Task %s not found.', taskName);
				return;
			}
			let task = this.getTask(taskName);
			let dateFormat = this.getConfigDateFormat();
			let fullDate = moment();
			timestamp = timestamp || fullDate.format(dateFormat);
			let isFullDate = timestamp.includes('/');
			if (isFullDate) {
				if (!moment(timestamp, dateFormat).isValid()) {
					console.log('Time it is not in a valid format.');
					return;
				}
			} else {
				if (!this.timeIsValid(timestamp, ['([0-9]{1,3})\:+([0-5]{1}[0-9]{1})'])) {
					console.log('Time it is not in a valid format.');
					return;
				}
				fullDate.hour(+timestamp.split(':')[0]);
				fullDate.minute(+timestamp.split(':')[1]);
			}
			let lastTime = _.last(task.log);
			if (moment(lastTime.start) > fullDate) {
				console.log('The time entered must be greater than the start time of the task.');
				return;
			}
			if (task.stop(status, fullDate)) {
				this.tasks[idx] = task;
			} else {
				// If the task could not be stopped, quit the command
				return;
			}
		}
		if (this.updateTasks()) {
			let msg = status === TaskStatus.FINISHED ? 'completed' : 'paused';
			if (taskName) {
				console.log('Task %s has been %s.', taskName, msg);
			} else {
				console.log('All tasks in progress have been %s.', msg);
			}
		}
	}

	public list(date: string): void {
		if (!this.tasks || this.tasks.length === 0) {
			console.log('There are no tasks added yet.');
			return;
		}
		let dateFormat = this.config && this.config.date_format ? this.config.date_format.toUpperCase() : 'MM/DD/YYYY';
		if (date === undefined) {
			date = moment().format(dateFormat);
		} else {
			if (!moment(date, dateFormat).isValid()) {
				console.log('Date it is not in a valid format.');
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
				return moment(l.start).format(dateFormat) === moment(date, dateFormat).format(dateFormat);
			});
			if (times && times.length > 0) {
				let beginTask = moment();
				let diffTask = moment();
				times.forEach((time) => {
					diffTask.add(moment(time.stop).diff(moment(time.start), 'ms'));
					diffTotal.add(moment(time.stop).diff(moment(time.start), 'ms'));
				});
				hours = diffTask.diff(beginTask, 'hours');
				min = moment.utc(moment(diffTask, 'HH:mm:ss').diff(moment(beginTask, 'HH:mm:ss'))).format('mm');
				timings.push({ name: t.name, time: ((hours < 10 ? '0' : '') + hours) + ':' + min, status: this.formatStatus(t.status) });
			}
		});
		hours = diffTotal.diff(beginTotal, 'hours');
		min = moment.utc(moment(diffTotal, 'HH:mm:ss').diff(moment(beginTotal, 'HH:mm:ss'))).format('mm');
		console.log('');
		console.log('  %s %s ', colors.bgGreen(' ' + ((hours < 10 ? '0' : '') + hours) + ':' + min + ' '), colors.inverse(' DATE: ' + date + '   '));
		console.log(colors.white('   %s  | %s      | %s'), 'TIME', 'STATUS', 'TASK');
		if (!timings || timings.length === 0) {
			console.log(colors.grey('   ---   | ---         | ---'));
		} else {
			timings.forEach((time) => {
				console.log(colors.grey('   %s | %s | %s'), time.time, time.status + (' '.repeat(11 - time.status.length)), time.name);
			});
		}
	}

	public add(taskName: string, timeSpent: string, date: string) {
		let dateFormat = this.config && this.config.date_format ? this.config.date_format.toUpperCase() + ' h:mm' : 'MM/DD/YYYY h:mm';
		if (date === undefined) {
			date = moment().format(dateFormat);
		} else {
			if (!moment(date, dateFormat).isValid()) {
				console.log('Date it is not in a valid format.');
				return;
			}
		}
		if (!this.timeIsValid(timeSpent)) {
			console.log('Time spent it is not in a valid format.');
			return;
		}
		let isFullHour = timeSpent.indexOf(':') > 0;
		let hour: number;
		let min: number;
		if (isFullHour) {
			let split = timeSpent.split(':');
			hour = +split[0];
			min = +split[1];
		} else {
			let valueOfSubstr: number = +timeSpent.substring(0, timeSpent.length - 1);
			hour = timeSpent.indexOf('h') > -1 ? valueOfSubstr : 0;
			min = timeSpent.indexOf('m') > -1 ? valueOfSubstr : 0;
		}
		let idx = _.findIndex(this.tasks, ['name', taskName]);
		let task = this.getTaskByIndex(taskName, idx);
		if (!task.add(date, dateFormat, hour, min)) {
			return;
		}
		if (idx === -1) {
			task.setStatus(TaskStatus.FINISHED);
			this.tasks.push(task);
		} else {
			this.tasks[idx] = task;
		}
		if (this.updateTasks()) {
			if (idx === -1) {
				console.log('Task %s added.', task.name);
			} else {
				console.log('The entered time was added in the task %s.', task.name);
			}
		}
	}

	private getTask(key: string): Task {
		return new Task(key, _.find(this.tasks, ['name', key]));
	}

	private getTaskByIndex(key: string, idx: number) {
		if (idx === -1) {
			return new Task(key, undefined);
		}
		return new Task(key, this.tasks[idx]);
	}

	private updateTasks(): boolean {
		try {
			this.configStore.set('tasks', this.tasks);
			return true;
		} catch (error) {
			console.log('An error occurred.');
			return false;
		}
	}

	private timeIsValid(time: string, regList?: string[]): boolean {
		if (!time || time.length > 5) {
			return false;
		}
		regList = regList || ['([0-9]{1,3})\:+([0-5]{1}[0-9]{1})', '([0-9]{1,3}\m)', '([0-9]{1,3}\h)'];
		let i = 0;
		let value: any;
		for (i; i < regList.length; i++) {
			if (new RegExp(regList[i]).test(time)) {
				value = new RegExp(regList[i]).exec(time);
				break;
			}
		}
		if (i >= regList.length || (value == null || value[0] !== time)) {
			return false;
		}
		return true;
	}

	private formatStatus(status: TaskStatus): string {
		switch (status) {
			case TaskStatus.IN_PROGRESS:
				return 'In Progress';
			case TaskStatus.PAUSED:
				return 'Paused';
			case TaskStatus.FINISHED:
				return 'Finished';
			default:
				return '';
		}
	}

	private getConfigDateFormat(): string {
		return this.config && this.config.date_format ? this.config.date_format.toUpperCase() + ' h:mm' : 'MM/DD/YYYY h:mm';
	}
}
