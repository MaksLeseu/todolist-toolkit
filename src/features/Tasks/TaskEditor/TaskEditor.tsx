import React, {ChangeEvent, FC, useState} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {ValueTask} from "./ValueTask/ValueTask";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {CustomTooltip} from "../../../common/components/CustomTooltip/CustomTooltip";
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import {SettingsTaskEditor} from "./SettingsTaskEditor/SettingsTaskEditor";
import {Box} from "@mui/material";
import s from './TaskEditor.module.css'
import DrawIcon from '@mui/icons-material/Draw';
import DescriptionIcon from '@mui/icons-material/Description';
import {CustomCheckbox} from "../../../common/components/CustomCheckbox/CustomCheckbox";
import {TaskStatuses} from "../../../common/utils/enums";
import {Dayjs} from "dayjs";

type Props = {
    taskId: string
    todolistId: string
    taskName: string
    taskStatus: number
    taskAddedDate: string
    taskDeadline: Dayjs | null
    taskStartDate: Dayjs | null
    todolistTitle: string
    description: string
    taskEditor: boolean
    closeTaskEditor: () => void
    updateCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
    updateTask: (taskId: string, todolistId: string, title: string, description: string, deadline: any, startDate: any, closeTaskRedactor: () => void) => void
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
        description,
        todolistTitle,
        taskEditor,
        closeTaskEditor,
        updateCheckbox,
        updateTask
    } = props

    const [taskRedactor, setTaskRedactor] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(taskName)
    const [newDescription, setNewDescription] = useState<string>(description)
    const [deadlineDate, setDeadline] = useState<Dayjs | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)

    const settingDateDeadline = (deadline: Dayjs | null) => setDeadline(deadline)
    const settingStartDate = (startDate: Dayjs | null) => setStartDate(startDate)

    const openTaskRedactor = () => setTaskRedactor(true)
    const closeTaskRedactor = () => setTaskRedactor(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const changeSpecification = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.currentTarget.value)

    const wrapperUpdateTaskForButton = () => updateTask(taskId, todolistId, newTitle, newDescription, deadlineDate, startDate, closeTaskRedactor)
    const wrapperUpdateTaskForSettings = (taskId: string, todolistId: string, title: string, description: string, deadline: Dayjs | null, startDate: Dayjs | null) =>
        updateTask(taskId, todolistId, title, description, deadline, startDate, closeTaskRedactor)


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
                        onClick={closeTaskRedactor}
                        color={'primary'}
                    >
                        <DrawIcon/>
                    </CustomIconButton>
                )}
                onClose={closeTaskEditor}
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
                        <SettingsTaskEditor
                            title={'StartDate'}
                            variant={'startDate'}
                            taskId={taskId}
                            todolistId={todolistId}
                            taskName={newTitle}
                            taskStartDate={taskStartDate}
                            taskDescription={newDescription}
                            updateTask={wrapperUpdateTaskForSettings}
                            handleSettingStartDate={settingStartDate}
                        />
                        <SettingsTaskEditor
                            title={'Deadline'}
                            variant={'deadline'}
                            taskId={taskId}
                            todolistId={todolistId}
                            taskName={newTitle}
                            taskDeadline={taskDeadline}
                            taskDescription={newDescription}
                            updateTask={wrapperUpdateTaskForSettings}
                            settingDateDeadline={settingDateDeadline}
                        />
                        <SettingsTaskEditor
                            title={'Priority'}
                            label={'P4'}
                            taskId={taskId}
                            todolistId={todolistId}
                            taskName={newTitle}
                            taskDescription={newDescription}
                            updateTask={wrapperUpdateTaskForSettings}
                        />
                        <p className={s.dateAdded}>{`Date added: ${taskAddedDate.slice(0, 10)}`}</p>
                    </div>
                </Box>
            </CustomModalWindow>
        </>
    )
}