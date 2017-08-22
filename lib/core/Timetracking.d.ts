import * as Configstore from 'configstore';
import Task from './Task';
export default class Timetracking {
    configStore: Configstore;
    tasks: Task[];
    config: any;
    constructor(configStore: any);
    getTask(key: string): Task;
    start(taskName: string, description: string, pauseOthers: boolean): void;
    storeTask(task: Task): boolean;
}
