"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const Configstore = require("configstore");
const pkg = require("../package.json");
const Timetracking_1 = require("./core/Timetracking");
const config = new Configstore(pkg.name, {
    config: {
        date_format: "dd/MM/yyyy",
        pause_others_on_start: true
    },
    tasks: []
});
const timetracking = new Timetracking_1.default(config);
program
    .version(pkg.version)
    .command("start <task> [description]")
    .description("Start a task with a description.")
    .alias("s")
    .option("-y", "Pause others taks in progress")
    .option("-n", "Do not pause others taks in progress")
    .action((task, description, options) => {
    timetracking.start(task, description, !options.N && (options.Y || timetracking.config.pause_others_on_start));
})
    .parse(process.argv);
