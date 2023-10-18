import React, {FC} from "react";
import {CustomModalWindow} from "../CustomModalWindow/CustomModalWindow";
import {CustomButton} from "../CustomButton/CustomButton";
import s from './ConfirmationModalWindow.module.css'

type Props = {}

const style = {
    width: 400,
    height: 200,
    bgcolor: 'white',
    borderRadius: 5,
}

export const ConfirmationModalWindow: FC<Props> = (props) => {
    const {} = props

    return (
        <CustomModalWindow
            open={true}
            title={'Delete to-do list?'}
            styleObject={style}
            onClose={() => {
            }}
        >
            <div className={s.confirmation}>
                <p>This will delete</p>
                <div className={s.containerButton}>
                    <CustomButton
                        color={'inherit'}
                        label={'Cancel'}
                        variant={'contained'}
                        sx={{marginRight: '10px'}}
                    />
                    <CustomButton
                        color={'error'}
                        label={'Delete'}
                        variant={'contained'}
                    />
                </div>
            </div>
        </CustomModalWindow>
    )
}