import React, {ChangeEvent, FC} from "react";
import s from './FormAddTask.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {MSG_BTN} from "../../../common/constans/app-messages.const";

type Props = {
    taskName: string
    description: string
    closeFormAddTask: () => void
    changeTaskName: (e: ChangeEvent<HTMLInputElement>) => void
    changeDescription: (e: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string, description: string) => void
}

export const FormAddTask: FC<Props> = (props) => {
    const {taskName, description, closeFormAddTask, changeTaskName, changeDescription, addTask} = props

    const addTaskHandle = () => addTask(taskName, description)

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
                description={description}
                multiline={true}
                changeDescription={changeDescription}
            />
            <div className={s.buttonGroup}>
                <CustomButton
                    color={'inherit'}
                    label={MSG_BTN.CANCEL}
                    sx={{marginRight: '10px'}}
                    closeFormAddTask={closeFormAddTask}
                />
                <CustomButton
                    color={'primary'}
                    label={MSG_BTN.ADD_A_TASK}
                    sx={null}
                    addTask={addTaskHandle}
                />
            </div>
        </div>
    )
}