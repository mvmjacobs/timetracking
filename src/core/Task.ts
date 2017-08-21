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
}
