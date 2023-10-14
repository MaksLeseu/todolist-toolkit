import React, {FC} from "react";
import {CustomIconButton} from "../../../../common/components/CustomIconButton/CustomIconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
    todolistId?: string | undefined
    removeTodo: (todolistId: string | undefined) => void
}

export const ButtonRemoveTodo: FC<Props> = (props) => {
    const {todolistId, removeTodo} = props

    return (
        <CustomIconButton
            size={'small'}
            color={'inherit'}
            disableRipple={false}
            onClick={() => removeTodo(todolistId)}
        >
            <DeleteForeverIcon/>
        </CustomIconButton>
    )
}