import {createTheme} from "@mui/material";

export const useTheme = () => {
    const theme = createTheme({
        palette: {
            common: {
                white: '#FFF',
                black: '#000',
            },
            primary: {
                main: '#EFE3FF',
                light: '#FFF',
                dark: '#F7F7F8',
                contrastText: '#000'
            },
            secondary: {
                main: '#704ECC',
                contrastText: '#FFF'
            },
            error: {
                main: '#EB2525'
            },
            success: {
                main: '#26C518'
            },
            text: {
                primary: '#000000',
                secondary: 'rgba(16, 16, 18, 0.50)',
                disabled: '#828387',
            },
            grey: {
                A100: '#F7F7F8'
            },
            action: {
                hover: '',
                disabled: '',
                focus: '',
            },
            
        },
        typography: {
            allVariants: {
                fontFamily: "'Montserrat', sans-serif",
                textTransform: "none",
            }
        },
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
                defaultProps: {
                    sx: {}
                },
                styleOverrides: {
                    input: {
                        '&::placeholder': {
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            opacity: 1,
                        },
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
                        '&.Mui-checked': {
                            color: '#FF8811',
                        },
                    }
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    sx: {}
                }
            }
        },
    });

    return {theme}
}