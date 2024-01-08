import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import {Box} from "@mui/material";
import s from './TaskEditor.module.css'
import DrawIcon from '@mui/icons-material/Draw';
import DescriptionIcon from '@mui/icons-material/Description';
import {CustomCheckbox} from "../../../common/components/CustomCheckbox/CustomCheckbox";
import {TaskStatuses} from "../../../common/utils/enums";
import {Dayjs} from "dayjs";
import {UpdateTaskParamsType} from "../Task";
import {Nullable} from "../../../common/utils/types/optional.types";
import {TaskRedactor} from "../../../common/components/TaskRedactor/TaskRedactor";
import {CustomButtonGroup} from "../../../common/components/CustomButtonGroup/CustomButtonGroup";
import {SettingsTaskEditor} from "./SettingsTaskEditor/SettingsTaskEditor";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {modeSelector} from "../../../app/app.selector";

type Props = {
    open: boolean
    taskId: string
    todolistId: string
    taskName: string
    taskStatus: number
    taskAddedDate: string
    taskDeadline: Nullable<Dayjs>
    taskStartDate: Nullable<Dayjs>
    taskPriority: number
    todolistTitle: string
    description: string
    closeTaskEditor: () => void
    updateCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
    updateTask: (params: UpdateTaskParamsType) => void
}

const style = {
    width: 800,
    minHeight: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    '@media (max-width: 840px)': {
        width: 700,
    },
    '@media (max-width: 740px)': {
        width: 600,
        minHeight: 400,
    },
    '@media (max-width: 640px)': {
        width: 500,
        minHeight: 400,
    },
    '@media (max-width: 540px)': {
        width: 400,
        minHeight: 400,
    },
    '@media (max-width: 440px)': {
        width: 330,
        minHeight: 400,
    },
};

export const TaskEditor: FC<Props> = (props) => {
    const {
        open,
        taskId,
        todolistId,
        taskName,
        taskStatus,
        taskAddedDate,
        taskDeadline,
        taskStartDate,
        taskPriority,
        description,
        todolistTitle,
        closeTaskEditor,
        updateCheckbox,
        updateTask
    } = props

    const mode = useAppSelector(modeSelector)
    const addStyles = mode === 'dark' ? {border: '1px #704ECC solid',} : {}

    const [text, setText] = useState<{ newTitle: string, newDescription: string }>({
        newTitle: taskName,
        newDescription: description
    })

    useEffect(() => {
        setText({
            newTitle: taskName,
            newDescription: description
        })
    }, [description || taskName])

    const changeText = (params: 'title' | 'description', e: ChangeEvent<HTMLInputElement>) => {
        const methods = {
            'title': () => setText({
                ...text,
                newTitle: e.currentTarget.value
            }),
            'description': () => setText({
                ...text,
                newDescription: e.currentTarget.value
            }),
        }
        return methods[params]()
    }

    const [taskRedactor, setTaskRedactor] = useState<boolean>(false)
    const openTaskRedactor = () => setTaskRedactor(true)
    const closeTaskRedactor = () => {
        if (taskName !== text.newTitle || description !== text.newDescription) {
            setText({
                newTitle: taskName,
                newDescription: description
            })
        }
        setTaskRedactor(false)
    }

    const wrapperUpdateTaskForButtonTaskEditor = () => {
        if (text.newTitle.trim()) {
            updateTask({
                taskId,
                todolistId,
                title: text.newTitle,
                description: text.newDescription,
                deadline: taskDeadline,
                startDate: taskStartDate,
                priority: taskPriority,
                closeTaskRedactor
            })
        }
    }
    const wrapperUpdateTaskForGroupSettingsTaskEditor = (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => {
        return updateTask({
            taskId,
            todolistId,
            title: text.newTitle,
            description: text.newDescription,
            deadline, startDate, priority, closeTaskRedactor
        })
    }

    const handleCloseTaskEditor = () => {
        if (text.newTitle.trim() && !taskRedactor) {
            closeTaskEditor()
            closeTaskRedactor()
        }
    }

    return (
        <CustomModalWindow
            open={open}
            title={todolistTitle}
            styleObject={{...style, ...addStyles}}
            childrenIcon={<DescriptionIcon color={'info'}/>}
            childrenRedactor={(
                <CustomIconButton
                    disableRipple={false}
                    onClick={openTaskRedactor}
                    color={'secondary'}
                >
                    <DrawIcon/>
                </CustomIconButton>
            )}
            onClose={handleCloseTaskEditor}
        >
            <Box sx={{
                padding: '10px 20px 20px 20px',
                display: 'flex',
                '@media (max-width: 640px)': {
                    display: 'block',
                },
            }}>
                <div className={s.taskBody}>
                    <div className={s.taskBodyContainer}>
                        <div className={s.checkboxContainer}>
                            <CustomCheckbox
                                checked={taskStatus === TaskStatuses.Completed}
                                onChange={updateCheckbox}
                            />
                        </div>

                        <div>
                            {
                                !taskRedactor &&
                                <div className={s.containerText}>
                                    <p className={s.taskName}
                                       onDoubleClick={openTaskRedactor}
                                    >
                                        {text.newTitle}
                                    </p>
                                    <p className={s.description}
                                       onDoubleClick={openTaskRedactor}
                                    >
                                        {text.newDescription}
                                    </p>
                                </div>
                            }
                        </div>

                        <TaskRedactor
                            taskRedactor={taskRedactor}
                            valueTask={text.newTitle}
                            valueDescription={text.newDescription}
                            changeTitle={(e) => changeText('title', e)}
                            changeSpecification={(e) => changeText('description', e)}
                        />

                    </div>
                    <div className={s.buttons}>
                        {
                            taskRedactor &&
                            <CustomButtonGroup
                                firstButtonLabel={MSG_BTN.CANCEL}
                                secondButtonLabel={MSG_BTN.SAVE}
                                size={'small'}
                                firstButtonOnClick={closeTaskRedactor}
                                secondButtonOnClick={wrapperUpdateTaskForButtonTaskEditor}
                            />
                        }
                    </div>
                </div>
                <div className={s.settingsTaskEditor}>
                    <SettingsTaskEditor
                        taskStartDate={taskStartDate}
                        taskDeadline={taskDeadline}
                        taskPriority={taskPriority}
                        calenderStyles={{
                            '@media (max-width: 740px)': {
                                fontSize: '12px'
                            },
                            '@media (max-width: 640px)': {
                                fontSize: '14px'
                            }
                        }}
                        updateTask={wrapperUpdateTaskForGroupSettingsTaskEditor}
                    />
                    <p className={s.dateAdded}>{`Date added: ${taskAddedDate.slice(0, 10)}`}</p>
                </div>
            </Box>
        </CustomModalWindow>
    )
}
