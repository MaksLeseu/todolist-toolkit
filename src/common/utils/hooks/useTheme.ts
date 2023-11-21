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
                    variant: "standard",
                },
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
                    }
                }
            }
        },
    });

    return {theme}
}