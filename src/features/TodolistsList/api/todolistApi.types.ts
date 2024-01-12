
// Types
import {TaskPriorities, TaskStatuses} from "../../../common/enums";

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};


export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};



export type UpdateTodolistTitleArgType = {
    id: string;
    title: string;
};