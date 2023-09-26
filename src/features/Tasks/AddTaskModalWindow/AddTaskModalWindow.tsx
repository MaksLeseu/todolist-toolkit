import React, {ChangeEvent, FC} from "react";
import s from './AddTaskModalWindow.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";

type Props = {
    taskName: string
    handleClose: () => void
    changeTaskName: (e: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string) => void
}

export const AddTaskModalWindow: FC<Props> = (props) => {
    const {taskName, handleClose, changeTaskName, addTask} = props

    const addTaskHandle = () => addTask(taskName)

    return (
        <div className={s.modalWindow}>
            <CustomTextField
                label={'Task name'}
                size={'medium'}
                multiline={false}
                taskName={taskName}
                changeTaskName={changeTaskName}
            />
            <CustomTextField
                label={'Description'}
                size={'small'}
                multiline={true}
            />
            <div className={s.buttonGroup}>
                <CustomButton
                    color={'inherit'}
                    label={'Cancel'}
                    sx={{marginRight: '10px'}}
                    handleClose={handleClose}
                />
                <CustomButton
                    color={'primary'}
                    label={'Add a task'}
                    sx={null}
                    addTask={addTaskHandle}
                />
            </div>
        </div>
    )
}