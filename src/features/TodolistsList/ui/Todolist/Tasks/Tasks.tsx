import {Task} from "./Task/Task";
import React from "react";
import {TaskStatuses} from "../../../../../common/enums";
import {TodolistDomainType} from "../../../model/todolists/todolists.reducer";
import {TaskType} from "../../../api/taskApi.types";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Tasks = ({tasks, todolist}:Props) => {


    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (

        <div>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}
                />
            ))}
        </div>

    )

}