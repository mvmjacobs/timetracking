"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const task_1 = require("./task");
const task_status_1 = require("./task-status");
class Timetracking {
    constructor(configStore) {
        this.configStore = configStore;
        this.tasks = configStore.all.tasks ? configStore.all.tasks : [];
        this.config = configStore.all.config ? configStore.all.config : {};
    }
    getTask(key) {
        return new task_1.Task(key, _.find(this.tasks, ["name", key]));
    }
    start(taskName, description, pauseOthers) {
        if (pauseOthers) {
            if (this.tasks && this.tasks.length) {
                this.tasks.forEach((t) => {
                    if (t.name !== taskName && t.status === task_status_1.TaskStatus.IN_PROGRESS) {
                        let tsk = this.getTask(t.name);
                        tsk.pause();
                    }
                });
            }
        }
        let task = this.getTask(taskName);
        if (task.start(description) && this.storeTask(task)) {
            console.log("Task %s started.", task.name);
        }
    }
    storeTask(task) {
        let id = _.findIndex(this.tasks, ["name", task.name]);
        if (id >= 0) {
            this.tasks[id] = Object.assign({}, task);
        }
        else {
            this.tasks.push(task);
        }
        this.configStore.set("tasks", this.tasks);
        return true;
    }
}
exports.Timetracking = Timetracking;
