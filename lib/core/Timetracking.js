"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task_1 = require("./Task");
var Timetracking = (function () {
    function Timetracking(configStore) {
        this.configStore = configStore;
        this.tasks = (configStore.all.tasks) ? configStore.all.tasks : [];
        this.config = (configStore.all.config) ? configStore.all.config : {};
    }
    Timetracking.prototype.getTask = function (key) {
        var task = (this.tasks[key]) ? this.tasks[key] : null;
        return new Task_1.default(key, task);
    };
    Timetracking.prototype.start = function (taskName, description) {
        console.log('Start is working!');
    };
    return Timetracking;
}());
exports.default = Timetracking;
