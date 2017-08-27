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
	.version(pkg.version)
	.command("start <task> [description]")
	.description("Start a task with a description.")
	.alias("s")
	.option("-y", "Pause others taks in progress")
	.option("-n", "Do not pause others taks in progress")
	.action((task, description, options) => {
		timetracking.start(task, description, !options.N && (options.Y || timetracking.config.pause_others_on_start));
	});

program
	.version(pkg.version)
	.command("finish <task>")
	.description("Finish a task.")
	.alias("f")
	.action((task) => {
		timetracking.stop(task, TaskStatus.FINISHED);
	});

program
	.version(pkg.version)
	.command("pause <task>")
	.description("Pause a task.")
	.alias("p")
	.action((task) => {
		timetracking.stop(task, TaskStatus.PAUSED);
	});

program
	.parse(process.argv);
