import React, {useState} from "react";
import {AnchorElType} from "../../components/CustomPopover/CustomPopover";

export const useOpenClosePriority = () => {
    const [isOpenPriority, setIsOpenPriority] = useState<AnchorElType>(null)

    const openClosePriority = (action: 'close' | 'open', event?: React.MouseEvent<HTMLButtonElement>) =>
        action === 'open' && event ? setIsOpenPriority(event.currentTarget) : setIsOpenPriority(null)

    return (
        {isOpenPriority, openClosePriority}
    )
}