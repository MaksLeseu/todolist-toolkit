import React, {FC} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";

type Props = {
    open: boolean
    handleDrawerOpen: () => void
}

export const Menu: FC<Props> = ({ open, handleDrawerOpen }) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                }}
            >
                {
                    isLoggedIn
                        ?
                        <MenuIcon/>
                        :
                        null
                }
            </IconButton>
        </>
    )
}