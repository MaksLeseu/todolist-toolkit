import React, {FC} from "react";
import TuneIcon from '@mui/icons-material/Tune';
import {AnchorElType} from "../../../common/components/CustomPopover/CustomPopover";
import {DisplayPopover} from "../../../common/components/DisplayPopover/DisplayPopover";
import {GeneralIconButton} from "../../../common/components/GeneralIconButton/GeneralIconButton";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {TodolistFilterType} from "../../Todolists/todolists.types";

type Props = {
    valueTodoFilter: TodolistFilterType
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

export const FilterTasks: FC<Props> = (props) => {
    const {valueTodoFilter, changeTodolistsFilterHandler} = props

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
                valueTodoFilter={valueTodoFilter}
                handleClosePopover={handleClosePopover}
                changeTodolistsFilterHandler={changeTodolistsFilterHandler}
            />
        </>
    )
}