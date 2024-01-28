import {styled} from '@mui/material/styles';

/*const drawerWidth = 190;*/

export const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
    marginLeft?: number;
    display?: string;
    justifyContent?: string;
    sx?: any;
    drawerWidth: string;
}>(({theme, open, drawerWidth, display, justifyContent, sx, marginLeft}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
    display: display && 'grid',
    justifyContent: justifyContent && 'center',
    ...sx,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: marginLeft ? marginLeft : 0,
    }),
    '@media (max-width: 680px)': {
        /*marginLeft: -190,*/
        marginLeft: 0,
    },
}));

/*`$-{drawerWidth}px`,*/