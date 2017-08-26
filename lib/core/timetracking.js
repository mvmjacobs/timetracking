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
    start(taskName, description, pauseOthers) {
        if (pauseOthers) {
            if (this.tasks && this.tasks.length > 0) {
                this.tasks.forEach((t, i = 0) => {
                    if (t.name !== taskName && t.status === task_status_1.TaskStatus.IN_PROGRESS) {
                        let tsk = this.getTask(t.name);
                        tsk.pause();
                        this.tasks[i] = tsk;
                    }
                    i++;
                });
            }
        }
        let task = this.getTask(taskName);
        if (task.start(description) && this.storeTask(task)) {
            console.log("Task %s started.", task.name);
        }
    }
    finish(taskName) {
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
        if (task.stop(task_status_1.TaskStatus.FINISHED)) {
            this.tasks[idx] = task;
            if (this.updateTasks()) {
                console.log("Task %s has been completed.", taskName);
            }
        }
    }
    getTask(key) {
        return new task_1.Task(key, _.find(this.tasks, ["name", key]));
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
