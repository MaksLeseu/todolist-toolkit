import React, {ChangeEvent, FC, MouseEventHandler} from "react";
import s from './FormAddTask.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {Nullable} from "../../../common/utils/types/optional.types";
import {Dayjs} from "dayjs";
import {SettingsFormAddTask} from "./SettingsFormAddTask";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {isOpenMenuSelector, modeSelector} from "../../../app/app.selector";
import Box from "@mui/material/Box";

type Props = {
    taskName: string
    description: string
    closeFormAddTask: MouseEventHandler | undefined
    changeTaskName: (e: ChangeEvent<HTMLInputElement>) => void
    changeDescription: (e: ChangeEvent<HTMLInputElement>) => void
    addTask: MouseEventHandler | undefined
    prioritySettingFunction: (priority: number) => void
    genericSettingFunction: (value: Nullable<Dayjs>, method: 'startDate' | 'deadline') => void
}

export const FormAddTask: FC<Props> = (props) => {
    const {
        taskName,
        description,
        closeFormAddTask,
        changeTaskName,
        changeDescription,
        addTask,
        genericSettingFunction,
        prioritySettingFunction
    } = props

    const isOpenMenu = useAppSelector(isOpenMenuSelector)
    const mode = useAppSelector(modeSelector)

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '190px',
                borderRadius: '5px',
                padding: '10px',
                backgroundColor: mode === 'dark' ? 'primary.dark' : 'primary.main',
                marginTop: '10px',
                marginBottom: '50px',
                boxShadow: '1px 1px 6px 0px rgba(112, 78, 204, 0.30), 1px 0px 6px 0px rgba(112, 78, 204, 0.30)',
                background: mode === 'dark' ?
                    'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : '',
            }}
        >
            <CustomTextField
                placeholder={'Task name'}
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
                placeholder={'Description'}
                size={'medium'}
                value={description}
                multiline={true}
                sx={{
                    marginBottom: '10px',
                    width: '100%',
                }}
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
                    prioritySettingFunction={prioritySettingFunction}
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
        </Box>
    )
}