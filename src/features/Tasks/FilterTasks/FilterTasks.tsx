import React, {FC} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import TuneIcon from '@mui/icons-material/Tune';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {AnchorElType} from "../../../common/components/CustomPopover/CustomPopover";
import {DisplayPopover} from "../../../common/components/DisplayPopover/DisplayPopover";

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
            <CustomIconButton
                disableRipple={true}
                onClick={handleClick}
            >
                <ListItemButton
                    sx={{height: '35px', borderRadius: '3px'}}
                >
                    <ListItemIcon
                        sx={{display: 'flex', alignItems: 'center'}}
                    >
                        <TuneIcon/>
                        <ListItemText
                            sx={{color: 'black', marginLeft: '5px'}}
                            primary={'Display'}
                        />
                    </ListItemIcon>
                </ListItemButton>
            </CustomIconButton>
            <DisplayPopover
                anchorEl={anchorEl}
                handleClosePopover={handleClosePopover}
            />
        </>
    )
}