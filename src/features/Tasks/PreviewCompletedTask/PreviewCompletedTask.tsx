import React, {ChangeEvent, FC} from "react";
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import DescriptionIcon from "@mui/icons-material/Description";
import Box from "@mui/material/Box";
import {CustomCheckbox} from "../../../common/components/CustomCheckbox/CustomCheckbox";
import {TaskStatuses} from "../../../common/utils/enums";
import s from './PreviewCompletedTask.module.css'

type Props = {
    todolistTitle: string
    taskName: string
    taskStatus: number
    description: string
    previewCompletedTask: boolean
    updateCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
    closePreviewCompletedTask: () => void
}

const style = {
    width: 600,
    height: 200,
    bgcolor: 'background.paper',
    borderRadius: 2,
};

export const PreviewCompletedTask: FC<Props> = (props) => {
    const {
        todolistTitle,
        taskName,
        taskStatus,
        description,
        previewCompletedTask,
        updateCheckbox,
        closePreviewCompletedTask
    } = props

    return (
        <CustomModalWindow
            open={previewCompletedTask}
            title={todolistTitle}
            styleObject={style}
            childrenIcon={<DescriptionIcon color={'info'}/>}
            onClose={closePreviewCompletedTask}
        >
            <Box sx={{padding: '10px 10px 10px 10px', display: 'flex'}}>
                <div>
                    <CustomCheckbox
                        checked={taskStatus === TaskStatuses.Completed}
                        onChange={updateCheckbox}
                    />
                </div>
                <div>
                    <p className={s.title}>{taskName}</p>
                    <p className={s.description}>{description}</p>
                </div>
            </Box>
        </CustomModalWindow>
    )
}