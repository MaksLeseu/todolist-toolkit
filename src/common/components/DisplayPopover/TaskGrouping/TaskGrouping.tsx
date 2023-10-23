import React, {FC} from "react";
import {AnchorElType, CustomPopover} from "../../CustomPopover/CustomPopover";
import {MSG_BTN} from "../../../utils/constans/app-messages.const";
import {GeneralIconButton} from "../../GeneralIconButton/GeneralIconButton";
import {TodolistFilterType} from "../../../../features/Todolists/todolists.types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
    anchorEl: AnchorElType
    valueTodoFilter: TodolistFilterType
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

export const TaskGrouping: FC<Props> = (props) => {
    const {anchorEl, valueTodoFilter, handleClosePopover, changeTodolistsFilterHandler} = props

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
                childrenIconSecondPosition={valueTodoFilter === 'completed' && <ExpandMoreIcon color={'primary'}/>}
                onClick={() => changeTodolistsFilterHandler('completed')}
            />
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                sx={{width: '100%'}}
                primary={MSG_BTN.ONLY_ACTIVE_TASKS}
                childrenIconSecondPosition={valueTodoFilter === 'active' && <ExpandMoreIcon color={'primary'}/>}
                onClick={() => changeTodolistsFilterHandler('active')}
            />
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                sx={{width: '100%'}}
                primary={MSG_BTN.ALL_TASKS}
                childrenIconSecondPosition={valueTodoFilter === 'all' && <ExpandMoreIcon color={'primary'}/>}
                onClick={() => changeTodolistsFilterHandler('all')}
            />
        </CustomPopover>
    )
}