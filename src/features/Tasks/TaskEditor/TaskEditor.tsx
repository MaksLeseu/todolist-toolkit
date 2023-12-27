import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
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
import {UpdateTaskParamsType} from "../Task";
import {Nullable} from "../../../common/utils/types/optional.types";
import {ConfirmationModalWindow} from "../../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";
import {TaskRedactor} from "../../../common/components/TaskRedactor/TaskRedactor";
import {CustomButtonGroup} from "../../../common/components/CustomButtonGroup/CustomButtonGroup";
import {SettingsTaskEditor} from "./SettingsTaskEditor/SettingsTaskEditor";

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

    useEffect(() => {
        setNewTitle(taskName)
        setNewDescription(description)
    }, [description || taskName])

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

    const wrapperUpdateTaskForButtonTaskEditor = () =>
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
    const wrapperUpdateTaskForGroupSettingsTaskEditor = (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => {
        return updateTask({
            taskId,
            todolistId,
            title: newTitle,
            description: newDescription,
            deadline, startDate, priority, closeTaskRedactor
        })
    }

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
                                title={!taskRedactor ? '' : 'You can double click on the text to open the task editor.'}
                                bigTextWidth={false}
                                notActiveBox={false}
                            >
                                <>
                                    {
                                        !taskRedactor &&
                                        <div className={s.containerText}>
                                            <p className={s.taskName}
                                               onDoubleClick={openTaskRedactor}
                                            >
                                                {newTitle}
                                            </p>
                                            <p className={s.description}
                                               onDoubleClick={openTaskRedactor}
                                            >
                                                {newDescription}
                                            </p>
                                        </div>
                                    }
                                </>
                            </CustomTooltip>

                            <TaskRedactor
                                taskRedactor={taskRedactor}
                                valueTask={newTitle}
                                valueDescription={newDescription}
                                changeTitle={changeTitle}
                                changeSpecification={changeSpecification}
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
                            updateTask={wrapperUpdateTaskForGroupSettingsTaskEditor}
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
