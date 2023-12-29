import React, {ChangeEvent, FC, MouseEventHandler} from "react";
import s from './FormAddTask.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {Nullable} from "../../../common/utils/types/optional.types";
import {Dayjs} from "dayjs";
import {SettingsFormAddTask} from "./SettingsFormAddTask";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {isOpenMenuSelector} from "../../../app/app.selector";

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

    const isOpenMenu = useAppSelector(isOpenMenuSelector)

    return (
        <div className={s.modalWindow}>
            <CustomTextField
                label={'Task name'}
                size={'medium'}
                multiline={false}
                value={taskName}
                sx={{
                    width: '100%',
                }}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        color: 'secondary.main',
                        borderBottom: '1px #704ECC solid',
                    }
                }}
                onChange={changeTaskName}
            />
            <CustomTextField
                label={'Description'}
                size={'small'}
                value={description}
                multiline={true}
                sx={{marginBottom: '10px', width: '100%'}}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        color: 'secondary.main',
                        borderBottom: '1px #704ECC solid',
                    }
                }}
                onChange={changeDescription}
            />
            <div className={isOpenMenu ? `${s.settings} ${s.settingsWhenOpenMenu}` : s.settings}>
                <SettingsFormAddTask
                    calenderStyles={{marginRight: '10px', width: '140px',}}
                    genericSettingFunction={genericSettingFunction}
                />
            </div>
            <div className={s.buttonGroup}>
                <CustomButton
                    color={'inherit'}
                    label={MSG_BTN.CANCEL}
                    variant={'contained'}
                    sx={{
                        marginRight: '10px',
                        backgroundColor: 'common.white',
                        color: 'secondary.main',
                        borderRadius: '8px',
                        border: '1px solid var(--primary, #704ECC)',
                        boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                    }}
                    onClick={closeFormAddTask}
                />
                <CustomButton
                    color={'secondary'}
                    label={MSG_BTN.ADD_A_TASK}
                    sx={{

                        color: 'common.white',
                        borderRadius: '8px',
                        '&:hover': {}
                    }}
                    variant={'contained'}
                    onClick={addTask}
                />
            </div>
        </div>
    )
}