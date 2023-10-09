import React, {FC} from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {CustomIconButton} from "../../../../common/components/CustomIconButton/CustomIconButton";

type Props = {
    onClick: () => void
}

export const ButtonRemoveTodo: FC<Props> = (props) => {
    const {onClick} = props

    return (
        <CustomIconButton
            size={'small'}
            color={'default'}
            disableRipple={false}
            onClick={onClick}
        >
            <BackspaceIcon/>
        </CustomIconButton>
    )
}