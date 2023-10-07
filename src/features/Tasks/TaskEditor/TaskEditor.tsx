import React, {FC, useState} from "react";
import {Box} from "@mui/material";
import s from './TaskEditor.module.css'
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import DescriptionIcon from "@mui/icons-material/Description";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {SettingsTaskEditor} from "./SettingsTaskEditor/SettingsTaskEditor";
import {ValueTask} from "./ValueTask/ValueTask";
import {CustomTooltip} from "../../../common/components/CustomTooltip/CustomTooltip";

type Props = {
    taskName: string
    todolistTitle: string
    description: string
    taskEditor: boolean
    closeTaskEditor: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

export const TaskEditor: FC<Props> = (props) => {
    const {taskName, description, todolistTitle, taskEditor, closeTaskEditor} = props

    const [taskRedactor, setTaskRedactor] = useState<boolean>(false)

    const openTaskRedactor = () => setTaskRedactor(true)
    const closeTaskRedactor = () => setTaskRedactor(false)

    return (
        <>
            <CustomModalWindow
                open={taskEditor}
            >
                <Box sx={style}>

                    <div className={s.header}>
                        <div className={s.todoTitle}>
                            <DescriptionIcon color={'info'}/>
                            <p>{todolistTitle}</p>
                        </div>

                        <CustomIconButton
                            disableRipple={false}
                            onClick={closeTaskEditor}
                        >
                            <CloseIcon/>
                        </CustomIconButton>
                    </div>
                    <Divider/>

                    <Box sx={{padding: '10px 20px 20px 20px', display: 'flex'}}>
                        <div className={s.taskBody}>
                            <div className={s.taskBodyContainer}>
                                <div><Checkbox/></div>

                                <CustomTooltip
                                    title={taskRedactor ? '' : 'You can click on the text to open the task editor.'}
                                    placement={'bottom'}
                                >
                                    <div className={taskRedactor ? s.taskRedactor : ''}>
                                        <ValueTask
                                            value={taskName}
                                            label={'task name'}
                                            taskRedactor={taskRedactor}
                                            placement={'top-start'}
                                            className={'taskName'}
                                            sx={{width: '100%', marginBottom: '10px'}}
                                            multiline={false}
                                            onClick={openTaskRedactor}
                                        />

                                        <ValueTask
                                            value={description}
                                            label={'description'}
                                            taskRedactor={taskRedactor}
                                            placement={'bottom-start'}
                                            className={'description'}
                                            sx={{width: '100%'}}
                                            multiline={true}
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
                </Box>
            </CustomModalWindow>
        </>
    )
}