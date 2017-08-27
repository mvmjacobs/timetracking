import { TaskStatus } from "./task-status";
export declare class Timetracking {
    config: any;
    private configStore;
    private tasks;
    constructor(configStore: any);
    start(taskName: string, description: string, pauseOthers: boolean): void;
    stop(taskName: string, status: TaskStatus): void;
    list(date: string): void;
    private getTask(key);
    private updateTasks();
}
