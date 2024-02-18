import {createTheme} from "@mui/material";

export const useTheme = (mode: 'dark' | 'light') => {
    const theme = createTheme({
        palette: {
            common: {
                white: mode === 'dark' ? '#000' : '#FFF',
                black: '#000',
            },
            primary: {
                main: '#EFE3FF',
                light: '#FFF',
                dark: '#704ECC',
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
                primary: mode === 'dark' ? '#FFFFFF' : '#000000',
                secondary: '#FFF',
                disabled: '#828387',
            },
            grey: {
                A100: '#F7F7F8'
            },
            mode,
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
                    variant: "outlined",
                },
            },
            MuiInputBase: {
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
        },
    });

    return {theme}
}