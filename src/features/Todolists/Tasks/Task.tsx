import React, {FC, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {TasksType} from "../../../common/api/api";
import s from './Task.module.css'
import {MoreHoriz} from "./MoreHoriz";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import {ButtonAddTask} from "./ButtonAddTask/ButtonAddTask";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

type TaskPropsType = {
    todolistId: string
}

export const Task: FC<TaskPropsType> = (props) => {
    const task  = useSelector<AppRootStateType, any>(state => state.tasks[props.todolistId])
    const dispatch = useAppDispatch()

    const [ description, setDescription ] = useState<boolean>(false)

    const removeTask = (taskId: string) => {
        dispatch(tasksThunk.removeTask({todolistId: props.todolistId, taskId}))
    }

    const openDescription = () => {
        setDescription(true)
    }
    const closeDescription = () => {
        setDescription(false)
    }


    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id} className={s.task}>
                <div className={s.container}>
                    <div className={s.text}>{ts.title}</div>
                    <MoreHoriz
                        taskId={ts.id}
                        removeTask={removeTask}
                    />
                </div>
                {
                    description
                        ?
                        <div>
                            <TextField
                                label="Enter text"
                                variant="outlined"
                                sx={{marginBottom: '10px'}}
                            />
                            <Button
                                variant="contained"
                                size={'small'}
                                sx={{marginRight: '5px'}}
                            >
                                Add a description
                            </Button>
                            <IconButton
                                color={"default"}
                                size={'small'}
                                onClick={closeDescription}
                                disableRipple={false}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        :
                        <ButtonAddTask
                            label={'Add a description'}
                            className={'add Description'}
                            onClick={openDescription}
                        />
                }
            </div>
        ))
        :
        <div className={s.empty}>Todolist is empty!</div>
}