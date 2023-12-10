import {styled} from '@mui/material/styles';

const drawerWidth = 190;

export const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
    marginLeft?: number;
}>(({theme, open, marginLeft}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: marginLeft ? marginLeft : 0,
    }),
    '@media (max-width: 680px)': {
        marginLeft: -190, // Замените yourNewWidth на нужное вам значение ширины
    },
}));
