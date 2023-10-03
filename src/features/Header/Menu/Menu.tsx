import React, {FC} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";

type Props = {
    sx: Object
    handleDrawerOpen: () => void
}

export const Menu: FC<Props> = (props) => {
    const {sx, handleDrawerOpen} = props

    return (
        <CustomIconButton
            size={'medium'}
            color={'inherit'}
            disableRipple={false}
            edge="start"
            onClick={handleDrawerOpen}
            sx={sx}
        >
            <MenuIcon/>
        </CustomIconButton>
    )
}