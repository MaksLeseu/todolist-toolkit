import React, {FC} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";

type Props = {
    handlerLogout: () => void
}

export const LogOutButton: FC<Props> = ({ handlerLogout }) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    return (
        <>
            {
                isLoggedIn
                    ?
                    <Button
                        color={'inherit'}
                        onClick={handlerLogout}
                    >
                        Log out
                    </Button>
                    :
                    null
            }
        </>
    )
}