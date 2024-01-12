import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import {TaskType} from "../../../api/taskaApi.types";
import {tasksThunks} from "../../../model/tasks/tasks.reducer";
import {useActions} from "../../../../../common/hooks";
import s from "./Task.module.css"


type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({task, todolistId}: TaskPropsType ) => {

    console.log(task.status=== TaskStatuses.Completed)


    const {removeTask, updateTask} = useActions(tasksThunks)

    const removeTaskHandler = () => {
        removeTask({ taskId: task.id, todolistId });
    }


    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({ taskId: task.id, domainModel: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New }, todolistId });
    }


  //
  // const onChangeHandler = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     let newIsDoneValue = e.currentTarget.checked;
  //     props.changeTaskStatus(
  //       props.task.id,
  //       newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
  //       props.todolistId,
  //     );
  //   },
  //   [props.task.id, props.todolistId],
  // );

  // const onTitleChangeHandler = useCallback(
  //   (newValue: string) => {
  //     props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  //   },
  //   [props.task.id, props.todolistId],
  // );

  const onTitleChangeHandler = (newValue: string) => {
      updateTask({taskId: task.id, domainModel: { title:newValue}, todolistId});
    }


  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />
           <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
