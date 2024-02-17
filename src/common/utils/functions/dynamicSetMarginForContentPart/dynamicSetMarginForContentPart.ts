import {styled} from '@mui/material/styles';

export const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
    marginleft?: number;
    display?: string;
    justifyContent?: string;
    sx?: any;
    drawerwidth: string;
}>(({theme, open, drawerwidth, display, justifyContent, sx, marginleft}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerwidth,
    display: display && 'grid',
    justifyContent: justifyContent && 'center',
    ...sx,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: marginleft ? marginleft : 0,
    }),
    '@media (max-width: 680px)': {
        marginLeft: 0,
    },
}));

