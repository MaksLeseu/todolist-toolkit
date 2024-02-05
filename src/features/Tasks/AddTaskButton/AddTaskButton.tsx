import React, {FC, MouseEventHandler} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {PlusIcon} from "../../../common/components/Icons/PlusIcon";

type Props = {
    label: string
    openFormAddTask: MouseEventHandler | undefined
}

export const AddTaskButton: FC<Props> = ({label, openFormAddTask}) => {
    return (
        <CustomIconButton
            disableRipple={false}
            sx={{
                width: '190px',
                height: '50px',
                borderRadius: '8px',
                backgroundColor: '#FF8811',
                color: 'text.secondary',
                textAlign: 'center',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '24px',
                marginBottom: '50px',
                transition: 'all 0.6s',
                '&:hover': {
                    backgroundColor: 'secondary.main',
                    transition: 'all 0.6s',
                }
            }}
            onClick={openFormAddTask}
        >
            Add a task
            <PlusIcon/>
        </CustomIconButton>
    )
}

