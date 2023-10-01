import React, {FC} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {CustomIconButton} from "../../CustomIconButton/CustomIconButton";

type Props = {
    open: boolean
    handleDrawerOpen: () => void
}

export const Menu: FC<Props> = (props) => {
    const {open, handleDrawerOpen} = props

    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    return (
        <CustomIconButton
            size={'medium'}
            color={'inherit'}
            disableRipple={false}
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
                marginRight: 5,
                ...(open && {display: 'none'}),
            }}
        >
            {
                isLoggedIn
                    ?
                    <MenuIcon/>
                    :
                    null
            }
        </CustomIconButton>
    )
}