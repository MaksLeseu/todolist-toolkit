import React, {ChangeEvent, FC} from "react";
import s from './FormAddTask.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {Dayjs} from "dayjs";

type Props = {
    taskName: string
    description: string
    deadline: any
    closeFormAddTask: () => void
    changeTaskName: (e: ChangeEvent<HTMLInputElement>) => void
    changeDescription: (e: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string, description: string, deadline: any) => void
    settingDateDeadline: (deadline: Dayjs | null) => void
}

export const FormAddTask: FC<Props> = (props) => {
    const {
        taskName,
        description,
        deadline,
        closeFormAddTask,
        changeTaskName,
        changeDescription,
        addTask,
        settingDateDeadline
    } = props

    const addTaskHandle = () => addTask(taskName, description, deadline)

    return (
        <div className={s.modalWindow}>
            <CustomTextField
                label={'Task name'}
                size={'medium'}
                multiline={false}
                value={taskName}
                onChange={changeTaskName}
            />
            <CustomTextField
                label={'Description'}
                size={'small'}
                value={description}
                multiline={true}
                sx={{marginBottom: '10px', width: '100%'}}
                onChange={changeDescription}
            />
            <div className={s.settings}>
                {/*<SettingsTaskEditor
                    title={'StartDate'}
                    variant={'startDate'}
                    sx={{marginRight: '10px', width: '130px'}}
                    settingDateDeadline={settingDateDeadline}
                />
                <SettingsTaskEditor
                    title={'Deadline'}
                    variant={'deadline'}
                    sx={{marginRight: '10px', width: '130px'}}
                    settingDateDeadline={settingDateDeadline}
                />
                <SettingsTaskEditor
                    title={'Priority'}
                    label={'P4'}
                    sx={{width: '130px'}}
                />*/}
            </div>
            <div className={s.buttonGroup}>
                <CustomButton
                    color={'inherit'}
                    label={MSG_BTN.CANCEL}
                    variant={'contained'}
                    sx={{marginRight: '10px'}}
                    onClick={closeFormAddTask}
                />
                <CustomButton
                    color={'primary'}
                    label={MSG_BTN.ADD_A_TASK}
                    variant={'contained'}
                    onClick={addTaskHandle}
                />
            </div>
        </div>
    )
}