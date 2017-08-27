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
