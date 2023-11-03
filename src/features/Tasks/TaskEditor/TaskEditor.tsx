import React, {ChangeEvent, FC, useState} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {ValueTask} from "./ValueTask/ValueTask";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {CustomTooltip} from "../../../common/components/CustomTooltip/CustomTooltip";
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import {Box} from "@mui/material";
import s from './TaskEditor.module.css'
import DrawIcon from '@mui/icons-material/Draw';
import DescriptionIcon from '@mui/icons-material/Description';
import {CustomCheckbox} from "../../../common/components/CustomCheckbox/CustomCheckbox";
import {TaskStatuses} from "../../../common/utils/enums";
import {Dayjs} from "dayjs";
import {GroupSettingsTaskEditor} from "./GroupSettingsTaskEditor/GroupSettingsTaskEditor";
import {UpdateTaskParamsType} from "../Task";
import {Nullable} from "../../../common/utils/types/optional.types";
import {ConfirmationModalWindow} from "../../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";

type Props = {
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
    taskEditor: boolean
    closeTaskEditor: () => void
    updateCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
    updateTask: (params: UpdateTaskParamsType) => void
}

const style = {
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
};

export const TaskEditor: FC<Props> = (props) => {
    const {
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
        taskEditor,
        closeTaskEditor,
        updateCheckbox,
        updateTask
    } = props

    const [taskRedactor, setTaskRedactor] = useState<boolean>(false)
    const [taskConfirmation, setTaskConfirmation] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(taskName)
    const [newDescription, setNewDescription] = useState<string>(description)

    const openTaskRedactor = () => setTaskRedactor(true)
    const closeTaskRedactor = () => setTaskRedactor(false)

    const closeConfirmation = () => setTaskConfirmation(false)
    const actionConfirmation = () => {
        setNewTitle(taskName)
        setNewDescription(description)
        closeConfirmation()
        closeTaskRedactor()
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const changeSpecification = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.currentTarget.value)

    const wrapperUpdateTaskForButton = () =>
        updateTask({
            taskId,
            todolistId,
            title: newTitle,
            description: newDescription,
            deadline: taskDeadline,
            startDate: taskStartDate,
            priority: taskPriority,
            closeTaskRedactor
        })
    const wrapperUpdateTaskForGroupSettings = (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) =>
        updateTask({
            taskId,
            todolistId,
            title: newTitle,
            description: newDescription,
            deadline, startDate, priority, closeTaskRedactor
        })

    const handleCloseTaskEditor = () => {
        if (taskRedactor && taskName !== newTitle || description !== newDescription) {
            return setTaskConfirmation(true)
        }

        closeTaskEditor()
        closeTaskRedactor()
    }

    return (
        <>
            <CustomModalWindow
                open={taskEditor}
                title={todolistTitle}
                styleObject={style}
                childrenIcon={<DescriptionIcon color={'info'}/>}
                childrenRedactor={(
                    <CustomIconButton
                        disableRipple={false}
                        onClick={openTaskRedactor}
                        color={'primary'}
                    >
                        <DrawIcon/>
                    </CustomIconButton>
                )}
                onClose={handleCloseTaskEditor}
            >
                <Box sx={{padding: '10px 20px 20px 20px', display: 'flex'}}>
                    <div className={s.taskBody}>
                        <div className={s.taskBodyContainer}>
                            <div>
                                <CustomCheckbox
                                    checked={taskStatus === TaskStatuses.Completed}
                                    onChange={updateCheckbox}
                                />
                            </div>

                            <CustomTooltip
                                title={taskRedactor ? '' : 'You can double click on the text to open the task editor.'}
                                placement={'bottom'}
                            >
                                <div className={taskRedactor ? s.taskRedactor : ''}>
                                    <ValueTask
                                        value={newTitle}
                                        label={'task name'}
                                        taskRedactor={taskRedactor}
                                        placement={'top-start'}
                                        className={'taskName'}
                                        sx={{width: '100%', marginBottom: '10px'}}
                                        multiline={false}
                                        onChange={changeTitle}
                                        onClick={openTaskRedactor}
                                    />

                                    <ValueTask
                                        value={newDescription}
                                        label={'description'}
                                        taskRedactor={taskRedactor}
                                        placement={'bottom-start'}
                                        className={'description'}
                                        sx={{width: '100%'}}
                                        multiline={true}
                                        onChange={changeSpecification}
                                        onClick={openTaskRedactor}
                                    />
                                </div>
                            </CustomTooltip>

                        </div>
                        <div className={s.buttons}>
                            {
                                taskRedactor &&
                                <CustomButton
                                    color={'inherit'}
                                    label={MSG_BTN.CANCEL}
                                    variant={'contained'}
                                    size={'small'}
                                    onClick={closeTaskRedactor}
                                />
                            }
                            {
                                taskRedactor &&
                                <CustomButton
                                    color={'primary'}
                                    label={MSG_BTN.SAVE}
                                    variant={'contained'}
                                    size={'small'}
                                    sx={{marginLeft: '10px'}}
                                    onClick={wrapperUpdateTaskForButton}
                                />
                            }
                        </div>
                    </div>
                    <div className={s.settingsTaskEditor}>
                        <GroupSettingsTaskEditor
                            taskPriority={taskPriority}
                            taskDeadline={taskDeadline}
                            taskStartDate={taskStartDate}
                            updateTask={wrapperUpdateTaskForGroupSettings}
                        />
                        <p className={s.dateAdded}>{`Date added: ${taskAddedDate.slice(0, 10)}`}</p>
                    </div>
                    <ConfirmationModalWindow
                        isOpen={taskConfirmation}
                        title={'changes'}
                        description={'Changes will not be saved'}
                        actionConfirmation={actionConfirmation}
                        closeConfirmation={closeConfirmation}
                    />
                </Box>
            </CustomModalWindow>
        </>
    )
}
