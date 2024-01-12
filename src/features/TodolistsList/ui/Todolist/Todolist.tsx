import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import {
  FilterValuesType,
  TodolistDomainType, todolistsActions,
  todolistsThunks
} from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";

import { TaskStatuses } from "common/enums";
import {useActions, useAppDispatch} from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import {TaskType} from "../../api/taskaApi.types";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function ({tasks,todolist, ...props}: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  // const addTask = useCallback(
  //   (title: string) => {
  //     props.addTask(title, props.todolist.id);
  //   },
  //   [props.addTask, props.todolist.id],
  // );
  //
  //

  const {addTask: addTaskTC} = useActions(tasksThunks)

  const addTask = (title: string) => addTaskTC({title, todolistId: todolist.id})

  const {removeTodolist: removeTodolistTC, changeTodolistTitle: changeTodolistTitleTC } = useActions(todolistsThunks)

  const {changeTodolistFilter} = useActions(todolistsActions)

  const removeTodolist = () => {
    removeTodolistTC(todolist.id);
  };



  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    changeTodolistFilter({ id, filter });
  }, []);



  const changeTodolistTitle = useCallback(function (title: string) {
    changeTodolistTitleTC({ id: todolist.id, title });
  }, []);


  const onAllClickHandler = useCallback(
    () => changeFilter("all", todolist.id),
    [todolist.id, changeFilter],
  );
  const onActiveClickHandler = useCallback(
    () => changeFilter("active", todolist.id),
    [todolist.id, changeFilter],
  );
  const onCompletedClickHandler = useCallback(
    () => changeFilter("completed", todolist.id),
    [todolist.id, changeFilter],
  );

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
