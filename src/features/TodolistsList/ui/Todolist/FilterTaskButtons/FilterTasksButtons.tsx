import {Button} from "@mui/material";
import React, {useCallback} from "react";
import {useActions} from "../../../../../common/hooks";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolists/todolists.reducer";


type Props = {
    todolist: TodolistDomainType
}


export const FilterTasksButtons=({todolist}:Props)=>{

    const {id, filter} = todolist

    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeTodolistFilterHandler = (filter: FilterValuesType) => {

        changeTodolistFilter({id, filter});

    }

    // const onAllClickHandler = () => changeTodolistFilter({id, filter: "all"});
    //
    // const onActiveClickHandler = () => changeTodolistFilter({filter: "active", id});
    //
    // const onCompletedClickHandler = () => changeTodolistFilter({filter: "completed", id});

    return (
        <>
            <Button
                variant={filter === "all" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler("all")}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={filter === "active" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler("active")}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outlined" : "text"}
                    onClick={()=>changeTodolistFilterHandler("completed")}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
            )
}