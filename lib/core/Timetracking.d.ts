import * as Configstore from 'configstore';
import Task from './Task';
export default class Timetracking {
    configStore: Configstore;
    tasks: any[];
    config: any;
    constructor(configStore: any);
    getTask(key: string): Task;
    start(taskName: string, description: string): void;
}
