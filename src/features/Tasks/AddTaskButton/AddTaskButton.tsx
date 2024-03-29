import React, {FC, MouseEventHandler} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {PlusIcon} from "../../../common/components/Icons/PlusIcon";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";

type Props = {
    label: string
    openFormAddTask: MouseEventHandler | undefined
}

export const AddTaskButton: FC<Props> = ({openFormAddTask}) => {
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
                    backgroundColor: '#FF8811',
                    transition: 'all 0.6s',
                    transform: 'scale(1.05)',
                }
            }}
            onClick={openFormAddTask}
        >
            {MSG_BTN.ADD_A_TASK}
            <PlusIcon/>
        </CustomIconButton>
    )
}

