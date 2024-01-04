import React, {FC} from "react";
import {Box, LinearProgress, Theme} from "@mui/material";
import {SxProps} from "@mui/system";

type Props = {
    visible: boolean
    sx?: SxProps<Theme>
}

export const CustomLinearProgress: FC<Props> = (props) => {
    const {visible, sx} = props

    return (
        <>
            {
                visible &&
                <Box sx={{width: '100%', ...sx}}>
                    <LinearProgress color={'inherit'}/>
                </Box>
            }
        </>
    )
}
