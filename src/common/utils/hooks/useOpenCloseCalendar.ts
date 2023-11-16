import React, {useState} from "react";
import {AnchorElType} from "../../components/CustomPopover/CustomPopover";


export const useOpenCloseCalendar = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState({
        openStartDate: null as AnchorElType,
        openDeadline: null as AnchorElType,
    })

    const openCloseCalendar = (action: 'close' | 'open', params?: 'startDate' | 'deadline', event?: React.MouseEvent<HTMLButtonElement>) => {
        if (action === 'close') {
            setIsOpenCalendar({
                openStartDate: null,
                openDeadline: null,
            })
        } else if (event && params) {
            const methodForOpen = {
                'startDate': () => {
                    setIsOpenCalendar({
                        openStartDate: event.currentTarget,
                        openDeadline: null,
                    })
                },
                'deadline': () => {
                    setIsOpenCalendar({
                        openStartDate: null,
                        openDeadline: event.currentTarget,
                    })
                },
            }
            methodForOpen[params]()
        }
    }

    return (
        {
            isOpenCalendar,
            openCloseCalendar
        }
    )
}