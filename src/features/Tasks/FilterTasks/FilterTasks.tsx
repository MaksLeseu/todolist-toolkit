import React, {FC} from "react";
import {AnchorElType} from "../../../common/components/CustomPopover/CustomPopover";
import {TodolistFilterType} from "../../Todolists/todolists.types";
import Box from "@mui/material/Box";
import {DisplayPopover} from "../../../common/components/DisplayPopover/DisplayPopover";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {FilterIcon} from "../../../common/components/Icons/FilterIcon";
import {useMediaQuery} from "@mui/material";

type Props = {
    valueTodoFilter: TodolistFilterType
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

export const FilterTasks: FC<Props> = (props) => {
    const {
        valueTodoFilter,
        changeTodolistsFilterHandler,
    } = props

    const [openDisplay, setOpenDisplay] = React.useState<AnchorElType>(null);

    const handleCloseDisplay = () => setOpenDisplay(null);
    const handleOpenDisplay = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenDisplay(event.currentTarget);
    };

    const matches1130 = useMediaQuery('(max-width:1130px)');

    return (
        <Box sx={{marginBottom: '24px'}}>
            <CustomIconButton
                disableRipple={false}
                sx={{}}
                onClick={handleOpenDisplay}
            >
                <FilterIcon styles={openDisplay ? {backgroundColor: '#EFE3FF', borderRadius: '2px',} : {}}/>
            </CustomIconButton>
            <DisplayPopover
                openDisplay={openDisplay}
                valueTodoFilter={valueTodoFilter}
                transformMoreHoriz={matches1130 ? 'translate(0%, 80%)' : 'translate(87%, 28%)'}
                transformPopover={matches1130 ? 'translate(-20%, -30%)' : 'translate(-80%, -25%)'}
                handleCloseDisplay={handleCloseDisplay}
                changeTodolistsFilterHandler={changeTodolistsFilterHandler}
            />
        </Box>
    )
}