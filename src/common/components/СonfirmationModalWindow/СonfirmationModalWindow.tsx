import React, {FC, MouseEventHandler} from "react";
import {CustomButton} from "../CustomButton/CustomButton";
import {CustomModalWindow} from "../CustomModalWindow/CustomModalWindow";
import s from './ConfirmationModalWindow.module.css'

type Props = {
    isOpen: boolean
    title: string
    actionConfirmation: MouseEventHandler | undefined
    closeConfirmation: MouseEventHandler | undefined
}

const style = {
    width: 400,
    height: 200,
    bgcolor: 'white',
    borderRadius: 3,
}

export const ConfirmationModalWindow: FC<Props> = (props) => {
    const {isOpen, title, actionConfirmation, closeConfirmation} = props

    return (
        <>
            <CustomModalWindow
                open={isOpen}
                title={'Delete to-do list?'}
                styleObject={style}
                onClose={closeConfirmation}
            >
                <div className={s.confirmation}>
                    <p>This will delete <span>{title}</span></p>
                    <div className={s.containerButton}>
                        <CustomButton
                            color={'inherit'}
                            label={'Cancel'}
                            variant={'contained'}
                            sx={{marginRight: '10px'}}
                            onClick={closeConfirmation}
                        />
                        <CustomButton
                            color={'error'}
                            label={'Delete'}
                            variant={'contained'}
                            onClick={actionConfirmation}
                        />
                    </div>
                </div>
            </CustomModalWindow>
        </>
    )
}