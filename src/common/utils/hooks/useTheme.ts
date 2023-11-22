import {createTheme} from "@mui/material";

export const useTheme = () => {
    const theme = createTheme({
        components: {
            MuiTextField: {
                defaultProps: {
                    /*sx: {
                        backgroundColor: '#6A5ACD',
                        width: '328px',
                        height: '56px',
                        borderRadius: '8px',
                    },*/
                    variant: "outlined",
                },
                styleOverrides: {
                    root: {
                        /*'&:hover, &.Mui-focused': {
                            border: '2px #704ECC solid'
                        },*/
                        '&:focus': {
                            border: '2px #704ECC solid',
                        },
                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        '&::placeholder': {
                            fontSize: '16px',
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            color: 'rgba(16, 16, 18, 0.50)',
                            opacity: 1
                        },
                        /*'&:focus': {
                            border: '2px #704ECC solid',
                        },*/
                    }
                },
            },
            MuiCheckbox: {
                defaultProps: {
                    sx: {
                        fontSize: '24px',
                        color: '#704ECC',
                        width: '24px',
                        height: '24px',
                    }
                },
                styleOverrides: {
                    root: {
                        '&:focus': {
                            color: '#FF8811',
                        },
                    }
                }
            }
        },
    });

    return {theme}
}