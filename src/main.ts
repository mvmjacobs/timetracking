// import 3th party packages
import * as program from "commander";
const Configstore = require("configstore");
const pkg = require("../package.json");

// import models
import { TaskStatus } from "./core/task-status";
import { Timetracking } from "./core/timetracking";

const config = new Configstore(pkg.name, {
	config: {
		date_format: "dd/MM/yyyy",
		pause_others_on_start: true
	},
	tasks: []
});
const timetracking = new Timetracking(config);

program
	.command("start <task> [description]")
	.description("Start a task with a description.")
	.alias("s")
	.option("-y", "Pause others taks in progress")
	.option("-n", "Do not pause others taks in progress")
	.action((task, description, options) => {
		timetracking.start(task, description, !options.N && (options.Y || timetracking.config.pause_others_on_start));
	});

program
	.command("finish [task]")
	.description("Finish a task. If you do not inform the [task] all tasks in progress will be completed.")
	.alias("f")
	.action((task) => {
		timetracking.stop(task, TaskStatus.FINISHED);
	});

program
	.command("pause [task]")
	.description("Pause a task. If you do not inform the [task] all tasks in progress will be paused.")
	.alias("p")
	.action((task) => {
		timetracking.stop(task, TaskStatus.PAUSED);
	});

program
	.command("list [date]")
	.description("Resume time of the taks. You can pass the date on format configured (" + (config && config.all.config ? config.all.config.date_format : "dd/MM/yyyy") + ")")
	.alias("l")
	.action((date) => {
		timetracking.list(date);
	});

program
	.version(pkg.version)
	.parse(process.argv);

if (!program.args.length) {
	program.help();
}
