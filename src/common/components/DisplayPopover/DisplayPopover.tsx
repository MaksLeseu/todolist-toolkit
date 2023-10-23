import React, {FC} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

type Props = {
    anchorEl: AnchorElType
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DisplayPopover: FC<Props> = (props) => {
    const {anchorEl, handleClosePopover} = props

    return (
        <CustomPopover
            anchorEl={anchorEl}
            handleClosePopover={handleClosePopover}
        >
            <CustomIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                onClick={() => {
                }}
            >
                <ListItemButton
                    sx={{height: '30px', borderRadius: '3px'}}
                >
                    <ListItemIcon
                        sx={{display: 'flex', alignItems: 'center'}}
                    >
                        <AutoAwesomeMotionIcon/>
                        <ListItemText
                            sx={{color: 'black', marginLeft: '10px'}}
                            primary={'task grouping'}
                        />
                    </ListItemIcon>
                </ListItemButton>
            </CustomIconButton>
        </CustomPopover>
    )
}