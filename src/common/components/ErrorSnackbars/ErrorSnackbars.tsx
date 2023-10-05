import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {errorSelector} from "../../../app/app.selector";
import {Nullable} from "../../utils/types/optional.types";
import {useActions} from "../../utils/hooks/useActions";
import {appActions} from "../../../app/app.slice";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbars = () => {
    const error: Nullable<string> = useAppSelector(errorSelector)
    const {setAppError} = useActions(appActions);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setAppError({error: null});
    };

    const isOpen = error !== null

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
