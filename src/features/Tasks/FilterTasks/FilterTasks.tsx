import React, {FC} from "react";
import TuneIcon from '@mui/icons-material/Tune';
import {AnchorElType} from "../../../common/components/CustomPopover/CustomPopover";
import {DisplayPopover} from "../../../common/components/DisplayPopover/DisplayPopover";
import {GeneralIconButton} from "../../../common/components/GeneralIconButton/GeneralIconButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";

type Props = {}

export const FilterTasks: FC<Props> = (props) => {
    const {} = props

    const [anchorEl, setAnchorEl] = React.useState<AnchorElType>(null);

    const handleClosePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <GeneralIconButton
                primary={MSG_BTN.DISPLAY}
                disableRipple={true}
                textStyles={{marginLeft: '5px'}}
                childrenIconFirstPosition={<TuneIcon/>}
                onClick={handleClick}
            />
            <DisplayPopover
                anchorEl={anchorEl}
                handleClosePopover={handleClosePopover}
            />
        </>
    )
}