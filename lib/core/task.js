"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash/array");
const moment = require("moment");
const task_status_1 = require("./task-status");
class Task {
    constructor(name, values) {
        this.name = name;
        this.description = values ? values.description : "";
        this.status = task_status_1.TaskStatus.IN_PROGRESS;
        this.timings = values ? values.timings : [];
        this.log = values ? values.log : [];
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = description ? description : this.description ? this.description : "";
    }
    getDescription() {
        return this.description;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    addLog(operation) {
        if (!this.log) {
            this.log = [];
        }
        this.log.push(operation + "#" + moment().toISOString());
    }
    start(description) {
        let lastTime = _.last(this.timings);
        if (lastTime && lastTime.start && !lastTime.stop) {
            console.log("This tasks already started.");
            return false;
        }
        this.timings.push({
            start: moment().toDate(),
        });
        this.setDescription(description);
        this.setStatus(task_status_1.TaskStatus.IN_PROGRESS);
        this.addLog("start");
        return true;
    }
    pause() {
        this.timings[this.timings.length - 1].stop = moment().toDate();
        this.setStatus(task_status_1.TaskStatus.PAUSED);
        this.addLog("pause");
        return true;
    }
}
exports.default = Task;
