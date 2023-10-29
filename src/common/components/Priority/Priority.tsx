import React, {FC} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {GeneralIconButton} from "../GeneralIconButton/GeneralIconButton";
import {MSG_BTN} from "../../utils/constans/app-messages.const";

type Props = {
    openPriority: AnchorElType
    closePriority: () => void
    settingPriority: (priority: number) => void
}

export const Priority: FC<Props> = (props) => {
    const {openPriority, closePriority, settingPriority} = props

    return (
        <CustomPopover
            anchorEl={openPriority}
            listItemStyles={{p: '0'}}
            handleClosePopover={closePriority}
        >
            <GeneralIconButton
                disableRipple={true}
                primary={MSG_BTN.LOW}
                color={'primary'}
                onClick={() => settingPriority(0)}
            />
            <GeneralIconButton
                disableRipple={true}
                primary={MSG_BTN.MIDDLE}
                color={'primary'}
                onClick={() => settingPriority(1)}
            />
            <GeneralIconButton
                disableRipple={true}
                primary={MSG_BTN.HIGH}
                color={'primary'}
                onClick={() => settingPriority(2)}
            />
            <GeneralIconButton
                disableRipple={true}
                primary={MSG_BTN.URGENTLY}
                color={'primary'}
                onClick={() => settingPriority(3)}
            />
            <GeneralIconButton
                disableRipple={true}
                primary={MSG_BTN.LATER}
                color={'primary'}
                onClick={() => settingPriority(4)}
            />
        </CustomPopover>
    )
}