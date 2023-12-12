import React from 'react';
import Box from "@mui/material/Box";

export const ArrowIconRight = () => {
    return (
        <Box sx={{
            objectFit: 'cover',
            width: '16px',
            height: '16px',
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M5.33333 14.6667L12 8.00004L5.33333 1.33337L4.15 2.51671L9.63333 8.00004L4.15 13.4834L5.33333 14.6667Z"
                    fill="#EFE3FF"/>
            </svg>
        </Box>
    );
};