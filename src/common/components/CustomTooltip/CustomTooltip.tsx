import React, {FC, ReactElement, useState} from "react";
import Box from "@mui/material/Box";

type Props = {
    title: React.ReactNode
    bigTextWidth: boolean
    notActiveBox: boolean
    children: ReactElement
}

export const CustomTooltip: FC<Props> = (props) => {
    const {title, bigTextWidth, notActiveBox, children} = props

    const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false)
    const openTooltip = () => setIsOpenTooltip(true)
    const closeTooltip = () => setIsOpenTooltip(false)

    return (
        <Box
            sx={{
                position: 'relative',
            }}
            onMouseOver={openTooltip}
            onMouseOut={closeTooltip}
        >
            {children}
            {
                isOpenTooltip && bigTextWidth && notActiveBox &&
                <Box
                    sx={{
                        position: 'absolute',
                        top: '75%',
                        minWidth: '162px',
                        minHeight: '40px',
                        backgroundColor: '#EFE3FF',
                        color: '#704ECC',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '28px',
                        borderRadius: '2px',
                        padding: '6px 14px 6px 13px',
                        fontFamily: 'Roboto',
                        zIndex: 100,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '240px',
                        boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.25), -2px -2px 6px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {title}
                </Box>
            }
        </Box>
    )
}