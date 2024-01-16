import React, { useEffect } from "react";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import {useActions} from "common/hooks";
import { AddItemForm } from "common/components";
import {TaskType} from "../../api/taskApi.types";
import {FilterTasksButtons} from "./FilterTaskButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};
export const Todolist = React.memo(function ({tasks, todolist}: Props) {

    const {addTask, fetchTasks} = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallback = (title: string) => addTask({title, todolistId: todolist.id})

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});

