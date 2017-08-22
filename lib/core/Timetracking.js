"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Task_1 = require("./Task");
var Timetracking = (function () {
    function Timetracking(configStore) {
        this.configStore = configStore;
        this.tasks = (configStore.all.tasks) ? configStore.all.tasks : {};
        this.config = (configStore.all.config) ? configStore.all.config : {};
    }
    Timetracking.prototype.getTask = function (key) {
        var task = _.find(this.tasks, ['name', key]);
        return new Task_1.default(key, task);
    };
    Timetracking.prototype.start = function (taskName, description, pauseOthers) {
        var _this = this;
        if (pauseOthers) {
            if (this.tasks && this.tasks.length) {
                this.tasks.forEach(function (t) {
                    if (t.name != taskName && t.status == 'IN_PROGRESS') {
                        _this.getTask(t.name).pause();
                        t.status = 'PAUSED';
                    }
                });
            }
        }
        var task = this.getTask(taskName);
        if (task.start(description) && this.storeTask(task))
            console.log('Task %s started.', task.name);
    };
    Timetracking.prototype.storeTask = function (task) {
        var id = _.findIndex(this.tasks, ['name', task.name]);
        if (id >= 0)
            this.tasks[id] = Object.assign({}, task);
        else
            this.tasks.push(task);
        this.configStore.set('tasks', this.tasks);
        return true;
    };
    return Timetracking;
}());
exports.default = Timetracking;
