import {EditableSpan} from "../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists/todolists.reducer";
import {useActions} from "../../../../../common/hooks";

type Props = {
    todolist: TodolistDomainType;
};

export const TodolistTitle = ({todolist}: Props) => {

    const {removeTodolist: removeTodolistTC, changeTodolistTitle: changeTodolistTitleTC} = useActions(todolistsThunks)


    const {title, id, entityStatus} = todolist

    const changeTodolistTitleHandler = useCallback(function (title: string) {
        changeTodolistTitleTC({id, title});
    }, [id]);

    const removeTodolistHandler = () => {
        removeTodolistTC(id);
    };

    return (

        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>


    )


}