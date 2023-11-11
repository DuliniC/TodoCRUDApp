import { priorities } from "./TodoPriorityEnum";

export interface TodoTask {
    id: number,
    title : string,
    description?: string,
    priority: priorities,
    isCompleted: boolean
}