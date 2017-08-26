import { Task } from "./task";
export declare class Timetracking {
    config: any;
    private configStore;
    private tasks;
    constructor(configStore: any);
    getTask(key: string): Task;
    start(taskName: string, description: string, pauseOthers: boolean): void;
    storeTask(task: Task): boolean;
}
