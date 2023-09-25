import React, {FC} from "react";
import s from './AddTaskModalWindow.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";

type Props = {}

export const AddTaskModalWindow: FC<Props> = (props) => {
    const {} = props

    return (
        <div className={s.modalWindow}>
            <CustomTextField
                label={'Task name'}
                size={'medium'}
                multiline={false}
            />
            <CustomTextField
                label={'Description'}
                size={'small'}
                multiline={true}
            />
            <div className={s.buttonGroup}>
                <CustomButton
                    color={'inherit'}
                    label={'Cancel'}
                    sx={{marginRight: '10px'}}
                />
                <CustomButton
                    color={'primary'}
                    label={'Add a task'}
                    sx={null}
                />
            </div>
        </div>
    )
}