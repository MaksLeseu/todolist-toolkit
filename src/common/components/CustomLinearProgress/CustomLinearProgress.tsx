import React, {FC} from "react";
import {Box, LinearProgress} from "@mui/material";

type Props = {
    visible: boolean
}

export const CustomLinearProgress: FC<Props> = (props) => {
    const {visible} = props

    return (
        <>
            {
                visible &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress color={'inherit'}/>
                </Box>
            }
        </>
    )
}
