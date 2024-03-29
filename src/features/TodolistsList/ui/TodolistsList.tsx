import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsActions, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import {useActions, useAppDispatch} from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists.selectors";


export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const {fetchTodolists, addTodolist: addTodolistTC} = useActions(todolistsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
  // dispatch(todolistsThunks.fetchTodolists());
    fetchTodolists();
  }, []);

  // const removeTask = useCallback(function (taskId: string, todolistId: string) {
  //   dispatch(tasksThunks.removeTask({ taskId, todolistId }));
  // }, []);

  // const addTask = useCallback(function (title: string, todolistId: string) {
  //   dispatch(tasksThunks.addTask({ title, todolistId }));
  // }, []);

  // const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
  //   dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }));
  // }, []);
  //
  // const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
  //   dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }));
  // }, []);

  // const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
  //   changeTodolistFilter({ id, filter });
  // }, []);
  //
  // const removeTodolist = useCallback(function (id: string) {
  //   //dispatch(todolistsThunks.removeTodolist(id));
  //   removeTodolistTC(id);
  // }, []);
  //
  // const changeTodolistTitle = useCallback(function (id: string, title: string) {
  //   changeTodolistTitleTC({ id, title });
  // }, []);

  const addTodolist = useCallback(
    (title: string) => {
      addTodolistTC(title);
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {/* TODO: Fix inline style*/}
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
