import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import {CustomButton} from "../CustomButton/CustomButton";
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import Divider from "@mui/material/Divider";

type Props = {
    openPriority: AnchorElType
    closePriority: () => void
    settingPriority: (priority: number) => void
}

const buttonsStyles = {
    borderRadius: '2px',
    width: '82px',
    height: '21px',
    padding: '4px 8px',
    marginBottom: '2px',
    color: 'secondary.main',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '16px',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: 'secondary.main',
        color: '#EFE3FF',
        boxShadow: 'none',
    },
}


export const Priority: FC<Props> = (props) => {
    const {openPriority, closePriority, settingPriority} = props

    const [priority, setPriority] = useState<number>(1)

    const setStyles = (priority: number) => {
        settingPriority(priority)
        setPriority(priority)
    }

    return (
        <CustomPopover
            anchorEl={openPriority}
            listItemStyles={{
                transform: 'translate(0%, -10%)'
            }}
            handleClosePopover={closePriority}
        >
            <Box sx={{
                transform: 'translate(5%, 27%)',
            }}>
                <TriangleIcon/>
            </Box>
            <Box
                sx={{
                    width: '90px',
                    height: '138px',
                    borderRadius: '4px',
                    backgroundColor: '#EFE3FF',
                    padding: '4px',
                }}
            >
                <CustomButton
                    label={MSG_BTN.LOW}
                    variant={'contained'}
                    sx={{
                        ...buttonsStyles,
                        backgroundColor: priority === 0 ? 'secondary.main' : '',
                        color: priority === 0 ? '#EFE3FF' : '',
                    }}
                    onClick={() => setStyles(0)}
                />
                {priority !== 0 && <Divider color={'#704ECC'}/>}
                <CustomButton
                    label={MSG_BTN.MIDDLE}
                    variant={'contained'}
                    sx={{
                        ...buttonsStyles,
                        backgroundColor: priority === 1 ? 'secondary.main' : '',
                        color: priority === 1 ? '#EFE3FF' : '',
                    }}
                    onClick={() => setStyles(1)}
                />
                {priority !== 1 && <Divider color={'#704ECC'}/>}
                <CustomButton
                    label={MSG_BTN.HIGH}
                    variant={'contained'}
                    sx={{
                        ...buttonsStyles,
                        backgroundColor: priority === 2 ? 'secondary.main' : '',
                        color: priority === 2 ? '#EFE3FF' : '',
                    }}
                    onClick={() => setStyles(2)}
                />
                {priority !== 2 && <Divider color={'#704ECC'}/>}
                <CustomButton
                    label={MSG_BTN.URGENTLY}
                    variant={'contained'}
                    sx={{
                        ...buttonsStyles,
                        backgroundColor: priority === 3 ? 'secondary.main' : '',
                        color: priority === 3 ? '#EFE3FF' : '',
                    }}
                    onClick={() => setStyles(3)}
                />
                {priority !== 3 && <Divider color={'#704ECC'}/>}
                <CustomButton
                    label={MSG_BTN.LATER}
                    variant={'contained'}
                    sx={{
                        ...buttonsStyles,
                        backgroundColor: priority === 4 ? 'secondary.main' : '',
                        color: priority === 4 ? '#EFE3FF' : '',
                    }}
                    onClick={() => setStyles(4)}
                />
            </Box>
        </CustomPopover>
    )
}