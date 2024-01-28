import React from 'react';
import s from './Footer.module.css'
import Box from "@mui/material/Box";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {modeSelector} from "../../app/app.selector";

export const Footer = () => {
    const mode = useAppSelector(modeSelector)
    return (
        <Box
            sx={{
                width: '100%',
                height: '60px',
                backgroundColor: 'primary.main',
                padding: '18px 0 18px 0',
                background: mode === 'dark' ?
                    'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : '',
                display: 'flex',
            }}
        >
            <p className={s.container}>2024 The best team. All rights reserved.</p>
        </Box>
    );
};
