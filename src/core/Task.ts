import * as moment from 'moment';
import * as _ from 'lodash/array';

export default class Task {
	name: string;
	description: string;
	status: string;
	timings: any;
	log: any[];

	constructor(name: string, values: any) {
		this.name = name;
		this.description = values ? values.description : '';
		this.status = values ? values.status : '';
		this.timings = values ? values.timings : [];
		this.log = values ? values.log : [];
	}

	setStatus(status: string): void {
		this.status = status;
	}

	setDescription(description: string): void {
		this.description = (description) ? description : (this.description) ? this.description : '';
	}

	addLog(operation: string): void {
		if (!this.log)
			this.log = [];
		this.log.push(operation + '#' + moment().toISOString());
	}

	start(description: string): boolean {
		let lastTime = _.last(this.timings);
		if (lastTime && lastTime.start && !lastTime.stop) {
			console.log('This tasks already started.');
			return false;
		}
		this.timings.push({
			start: moment().toDate()
		});
		this.setDescription(description);
		this.setStatus('IN_PROGRESS');
		this.addLog('start');
		return true;
	}

	pause(): boolean {
		this.timings[this.timings.length - 1].stop = moment().toDate();
		// Doesn't working. I don't know why
		// this.setStatus('PAUSED');
		this.addLog('pause');
		return true;
	}
}
