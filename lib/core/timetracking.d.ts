export declare class Timetracking {
    config: any;
    private configStore;
    private tasks;
    constructor(configStore: any);
    start(taskName: string, description: string, pauseOthers: boolean): void;
    private getTask(key);
    private storeTask(task);
}
