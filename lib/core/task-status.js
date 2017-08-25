"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    TaskStatus[TaskStatus["PAUSED"] = 1] = "PAUSED";
    TaskStatus[TaskStatus["FINISHED"] = 2] = "FINISHED";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
