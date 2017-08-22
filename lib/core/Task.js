"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var _ = require("lodash/array");
var Task = (function () {
    function Task(name, values) {
        this.name = name;
        this.description = values ? values.description : '';
        this.status = values ? values.status : '';
        this.timings = values ? values.timings : [];
        this.log = values ? values.log : [];
    }
    Task.prototype.setStatus = function (status) {
        this.status = status;
    };
    Task.prototype.setDescription = function (description) {
        this.description = (description) ? description : (this.description) ? this.description : '';
    };
    Task.prototype.addLog = function (operation) {
        if (!this.log)
            this.log = [];
        this.log.push(operation + '#' + moment().toISOString());
    };
    Task.prototype.start = function (description) {
        var lastTime = _.last(this.timings);
        if (lastTime && lastTime.start && !lastTime.stop) {
            console.log('This tasks already started.');
            return false;
        }
        this.timings.push({
            start: moment().toDate()
        });
        this.setDescription(description);
        this.setStatus('IN_PROGRESS');
        this.addLog('start');
        return true;
    };
    Task.prototype.pause = function () {
        this.timings[this.timings.length - 1].stop = moment().toDate();
        this.addLog('pause');
        return true;
    };
    return Task;
}());
exports.default = Task;
