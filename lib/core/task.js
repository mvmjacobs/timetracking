"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash/array");
const moment = require("moment");
const task_status_1 = require("./task-status");
class Task {
    constructor(name, values) {
        this.name = name;
        this.description = values ? values.description : "";
        this.status = values ? values.status : task_status_1.TaskStatus.IN_PROGRESS;
        this.log = values ? values.log : [];
    }
    setDescription(description) {
        this.description = description ? description : this.description ? this.description : "";
    }
    setStatus(status) {
        this.status = status;
    }
    start(description) {
        let lastTime = _.last(this.log);
        if (lastTime && lastTime.start && !lastTime.stop) {
            console.log("This task already has been started.");
            return false;
        }
        this.log.push({
            start: moment().format(),
        });
        this.setDescription(description);
        this.setStatus(task_status_1.TaskStatus.IN_PROGRESS);
        return true;
    }
    pause() {
        this.log[this.log.length - 1].stop = moment().format();
        this.setStatus(task_status_1.TaskStatus.PAUSED);
    }
    stop(status) {
        let lastTime = _.last(this.log);
        if (lastTime && lastTime.stop) {
            if (status === task_status_1.TaskStatus.FINISHED) {
                console.log("This task already has been completed.");
            }
            else if (status === task_status_1.TaskStatus.PAUSED) {
                console.log("This task already has been paused.");
            }
            return false;
        }
        this.log[this.log.length - 1].stop = moment().format();
        this.setStatus(status);
        return true;
    }
}
exports.Task = Task;
