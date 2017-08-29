"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const Configstore = require("configstore");
const pkg = require("../package.json");
const task_status_1 = require("./core/task-status");
const timetracking_1 = require("./core/timetracking");
const config = new Configstore(pkg.name, {
    config: {
        date_format: "dd/MM/yyyy",
        pause_others_on_start: true
    },
    tasks: []
});
const timetracking = new timetracking_1.Timetracking(config);
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
    .command("finish <task>")
    .description("Finish a task.")
    .alias("f")
    .action((task) => {
    timetracking.stop(task, task_status_1.TaskStatus.FINISHED);
});
program
    .command("pause <task>")
    .description("Pause a task.")
    .alias("p")
    .action((task) => {
    timetracking.stop(task, task_status_1.TaskStatus.PAUSED);
});
program
    .command("list [date]")
    .description("Resume time of the taks. You can pass the date on format configured (dd/MM/yyyy).")
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
