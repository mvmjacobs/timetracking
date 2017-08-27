"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const _ = require("lodash");
const moment = require("moment");
const task_1 = require("./task");
const task_status_1 = require("./task-status");
class Timetracking {
    constructor(configStore) {
        this.configStore = configStore;
        this.tasks = configStore.all.tasks ? configStore.all.tasks : [];
        this.config = configStore.all.config ? configStore.all.config : {};
    }
    start(taskName, description, pauseOthers) {
        if (pauseOthers) {
            if (this.tasks && this.tasks.length > 0) {
                this.tasks.forEach((t, i = 0) => {
                    if (t.name !== taskName && t.status === task_status_1.TaskStatus.IN_PROGRESS) {
                        let tsk = this.getTask(t.name);
                        if (tsk.stop(task_status_1.TaskStatus.PAUSED)) {
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
            }
            else {
                this.tasks[idx] = task;
            }
            if (this.updateTasks()) {
                console.log("Task %s started.", task.name);
            }
        }
    }
    stop(taskName, status) {
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
                let msg = status === task_status_1.TaskStatus.FINISHED ? "completed" : "paused";
                console.log("Task %s has been %s.", taskName, msg);
            }
        }
    }
    list(date) {
        if (!this.tasks || this.tasks.length === 0) {
            console.log("There are no tasks added yet.");
            return;
        }
        if (date === undefined) {
            date = moment().format("DD/MM/YYYY");
        }
        else {
            if (!moment(date, "DD/MM/YYYY").isValid()) {
                console.log("Date it is not in a valid format.");
                return;
            }
        }
        let timings = [];
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
                timings.push({ name: t.name, time: hours + ":" + min });
            }
        });
        hours = diffTotal.diff(beginTotal, "hours");
        min = moment.utc(moment(diffTotal, "HH:mm:ss").diff(moment(beginTotal, "HH:mm:ss"))).format("mm");
        console.log("");
        console.log("  %s %s ", colors.bgGreen(" " + hours + ":" + min + " "), colors.inverse(" DATE: " + date + " "));
        console.log(colors.white("   TIME | TASK"));
        if (!timings || timings.length === 0) {
            console.log(colors.grey("   --"));
        }
        else {
            timings.forEach((time) => {
                console.log(colors.grey("   " + time.time + " | " + time.name));
            });
        }
    }
    getTask(key) {
        return new task_1.Task(key, _.find(this.tasks, ["name", key]));
    }
    updateTasks() {
        try {
            this.configStore.set("tasks", this.tasks);
            return true;
        }
        catch (error) {
            console.log("An error occurred.");
            return false;
        }
    }
}
exports.Timetracking = Timetracking;
