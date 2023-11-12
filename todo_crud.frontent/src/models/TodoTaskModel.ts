import { Priorities } from "./TodoPriorityEnum";

export interface TodoTask {
    id: number,
    title : string,
    description?: string,
    priority: Priorities | 0,
    isCompleted: boolean | false
}