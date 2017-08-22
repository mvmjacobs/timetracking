export default class Task {
    name: string;
    description: string;
    status: string;
    timings: any;
    log: any[];
    constructor(name: string, values: any);
    setStatus(status: string): void;
    setDescription(description: string): void;
    addLog(operation: string): void;
    start(description: string): boolean;
    pause(): boolean;
}
