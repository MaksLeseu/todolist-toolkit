import React, {FC, MouseEventHandler} from "react";
import AddIcon from '@mui/icons-material/Add';
import {GeneralIconButton} from "../../../common/components/GeneralIconButton/GeneralIconButton";

type Props = {
    label: string
    openFormAddTask: MouseEventHandler | undefined
}

export const AddTaskButton: FC<Props> = ({label, openFormAddTask}) => {
    return (
        <GeneralIconButton
            size={'small'}
            color={"default"}
            disableRipple={true}
            primary={label}
            textStyles={{marginLeft: '5px'}}
            sx={{marginTop: '10px'}}
            childrenIconFirstPosition={<AddIcon/>}
            onClick={openFormAddTask}
        />
    )
}

