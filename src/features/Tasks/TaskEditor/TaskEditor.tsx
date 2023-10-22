import React, {ChangeEvent, FC, useState} from "react";
import {tasksThunk} from "../tasks.slice";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import {TasksType} from "../tasks.types";
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

type Props = {
    taskId: string
    todolistId: string
    task: TasksType
    taskName: string
    taskStatus: number
    todolistTitle: string
    description: string
    taskEditor: boolean
    closeTaskEditor: () => void
    changeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
    stopPropagation: (e: any) => void
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
        task,
        taskName,
        taskStatus,
        description,
        todolistTitle,
        taskEditor,
        closeTaskEditor,
        changeCheckbox,
        stopPropagation
    } = props

    const dispatch = useAppDispatch()

    const [taskRedactor, setTaskRedactor] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(taskName)
    const [newDescription, setNewDescription] = useState<string>(description)

    const openTaskRedactor = () => setTaskRedactor(true)
    const closeTaskRedactor = () => setTaskRedactor(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const changeSpecification = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.currentTarget.value)

    const updateTask = () => {
        dispatch(tasksThunk.updateTask({
            todolistId, taskId, domainModel: {title: newTitle, description: newDescription}
        }))
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
                onClose={closeTaskEditor}
            >
                <Box sx={{padding: '10px 20px 20px 20px', display: 'flex'}}>
                    <div className={s.taskBody}>
                        <div className={s.taskBodyContainer}>
                            <div>
                                <CustomCheckbox
                                    checked={taskStatus === TaskStatuses.Completed}
                                    onChange={changeCheckbox}
                                />
                            </div>

                            <CustomTooltip
                                title={taskRedactor ? '' : 'You can click on the text to open the task editor.'}
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
                                    onClick={updateTask}
                                />
                            }
                        </div>
                    </div>
                    <div className={s.settingsTaskEditor}>
                        <SettingsTaskEditor
                            title={'Deadline'}
                            label={'5 october'}
                        />
                        <SettingsTaskEditor
                            title={'Priority'}
                            label={'P4'}
                        />
                    </div>
                </Box>
            </CustomModalWindow>
        </>
    )
}