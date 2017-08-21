"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = (function () {
    function Task(name, values) {
        this.name = name;
        this.description = values ? values.description : '';
        this.status = values ? values.status : '';
        this.timings = values ? values.timings : [];
        this.log = values ? values.log : [];
    }
    return Task;
}());
exports.default = Task;
