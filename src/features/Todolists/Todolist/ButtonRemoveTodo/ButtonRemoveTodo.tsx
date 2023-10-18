import React, {FC} from "react";
import {CustomIconButton} from "../../../../common/components/CustomIconButton/CustomIconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import s from './ButtonRemoveTodo.module.css'

type Props = {
    openConfirmation: () => void
}

export const ButtonRemoveTodo: FC<Props> = (props) => {
    const {openConfirmation} = props

    return (
        <div className={s.container}>
            <CustomIconButton
                size={'small'}
                color={'inherit'}
                disableRipple={false}
                onClick={openConfirmation}
            >
                <DeleteForeverIcon/>
            </CustomIconButton>
        </div>
    )
}