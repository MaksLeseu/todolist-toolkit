import React from 'react';
import Box from "@mui/material/Box";

export const ArrowIconLeft = () => {
    return (
        <Box sx={{
            objectFit: 'cover',
            width: '16px',
            height: '16px',
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M10.6667 14.6667L4 8.00004L10.6667 1.33337L11.85 2.51671L6.36667 8.00004L11.85 13.4834L10.6667 14.6667Z"
                    fill="#EFE3FF"/>
            </svg>
        </Box>
    );
};