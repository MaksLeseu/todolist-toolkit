import React, {ChangeEvent, FC, MouseEventHandler} from "react";
import s from './FormAddTask.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {GroupSettingsTaskEditor} from "../TaskEditor/GroupSettingsTaskEditor/GroupSettingsTaskEditor";
import {Nullable} from "../../../common/utils/types/optional.types";
import {Dayjs} from "dayjs";

type Props = {
    taskName: string
    description: string
    closeFormAddTask: MouseEventHandler | undefined
    changeTaskName: (e: ChangeEvent<HTMLInputElement>) => void
    changeDescription: (e: ChangeEvent<HTMLInputElement>) => void
    addTask: MouseEventHandler | undefined
    genericSettingFunction: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

export const FormAddTask: FC<Props> = (props) => {
    const {
        taskName,
        description,
        closeFormAddTask,
        changeTaskName,
        changeDescription,
        addTask,
        genericSettingFunction
    } = props

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
                <GroupSettingsTaskEditor
                    sx={{marginRight: '10px', width: '130px'}}
                    genericSettingFunction={genericSettingFunction}
                />
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
                    onClick={addTask}
                />
            </div>
        </div>
    )
}