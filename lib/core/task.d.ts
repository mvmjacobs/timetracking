import { TaskStatus } from "./task-status";
export declare class Task {
    name: string;
    description: string;
    status: TaskStatus;
    timings: any;
    log: any[];
    constructor(name: string, values: any);
    setDescription(description: string): void;
    setStatus(status: TaskStatus): void;
    addLog(operation: string): void;
    start(description: string): boolean;
    pause(): boolean;
    private getStatusByName(status);
}
