"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash/array");
const moment = require("moment");
const task_status_1 = require("./task-status");
class Task {
    constructor(name, values) {
        this.name = name;
        this.description = values ? values.description : "";
        this.status = values ? this.getStatusByName(values.status) : task_status_1.TaskStatus.IN_PROGRESS;
        this.timings = values ? values.timings : [];
        this.log = values ? values.log : [];
    }
    setDescription(description) {
        this.description = description ? description : this.description ? this.description : "";
    }
    setStatus(status) {
        this.status = status;
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
    getStatusByName(status) {
        if (!status) {
            return task_status_1.TaskStatus.IN_PROGRESS;
        }
        switch (status) {
            case "IN_PROGRESS":
                return task_status_1.TaskStatus.IN_PROGRESS;
            case "PAUSED":
                return task_status_1.TaskStatus.PAUSED;
            case "FINISHED":
                return task_status_1.TaskStatus.FINISHED;
            default:
                return task_status_1.TaskStatus.IN_PROGRESS;
        }
    }
}
exports.Task = Task;
