import React, {FC} from "react";
import {AnchorElType, CustomPopover} from "../../CustomPopover/CustomPopover";
import {MSG_BTN} from "../../../utils/constans/app-messages.const";
import {GeneralIconButton} from "../../GeneralIconButton/GeneralIconButton";

type Props = {
    anchorEl: AnchorElType
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const TaskGrouping: FC<Props> = (props) => {
    const {anchorEl, handleClosePopover} = props

    return (
        <CustomPopover
            anchorEl={anchorEl}
            listItemStyles={{p: '0'}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            handleClosePopover={handleClosePopover}
        >
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                primary={MSG_BTN.ONLY_COMPLETED_TASKS}
                onClick={() => {
                }}
            />
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                primary={MSG_BTN.ONLY_UNFINISHED_TASKS}
                onClick={() => {
                }}
            />
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                sx={{width: '100%'}}
                primary={MSG_BTN.ALL_TASKS}
                onClick={() => {
                }}
            />
        </CustomPopover>
    )
}