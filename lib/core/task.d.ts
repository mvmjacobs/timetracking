import { TaskStatus } from "./task-status";
export declare class Task {
    name: string;
    description: string;
    status: TaskStatus;
    log: any[];
    constructor(name: string, values: any);
    setDescription(description: string): void;
    setStatus(status: TaskStatus): void;
    start(description: string): boolean;
    pause(): void;
    private getStatusByName(status);
}
