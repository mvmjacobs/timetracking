import { TaskStatus } from "./task-status";
export default class Task {
    private name;
    private description;
    private status;
    private timings;
    private log;
    constructor(name: string, values: any);
    getName(): string;
    setDescription(description: string): void;
    getDescription(): string;
    setStatus(status: TaskStatus): void;
    getStatus(): TaskStatus;
    addLog(operation: string): void;
    start(description: string): boolean;
    pause(): boolean;
}
