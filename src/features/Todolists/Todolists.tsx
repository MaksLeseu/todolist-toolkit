import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";

type Props = {

}

export const Todolists: FC<Props> = ({}) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return  (
        <div>
            {todos.map(td => td.title)}
        </div>
    )
}