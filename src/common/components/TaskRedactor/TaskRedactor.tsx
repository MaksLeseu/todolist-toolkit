import React, {ChangeEvent, FC, ReactNode} from "react";
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {modeSelector} from "../../../app/app.selector";
import Box from "@mui/material/Box";
import {Mistake} from "../Mistake/Mistake";
import {useMediaQuery} from "@mui/material";

type Props = {
    valueTask: string
    valueDescription: string
    taskRedactor: boolean
    mistakeTextField: boolean
    childrenGroupSettings?: ReactNode
    childrenButtons?: ReactNode
    changeTitle: (e: ChangeEvent<HTMLInputElement>) => void
    changeSpecification: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TaskRedactor: FC<Props> = (props) => {
    const {
        valueTask,
        valueDescription,
        taskRedactor,
        mistakeTextField,
        childrenGroupSettings,
        childrenButtons,
        changeTitle,
        changeSpecification
    } = props
    const mode = useAppSelector(modeSelector)
    const matches440 = useMediaQuery('(max-width:440px)');

    return (
        <>
            {
                taskRedactor &&
                <Box
                    sx={{
                        border: '1px #2a3b5a solid',
                        borderRadius: '10px',
                        padding: '7px 10px 10px 10px',
                        width: '100%',
                        background: mode === 'dark' ?
                            'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : '',
                    }}
                >
                    <Mistake isOpen={mistakeTextField}
                             errorTitle={matches440 ? 'Title too long.' : 'Task name is more than 100 characters.'}/>
                    <CustomTextField
                        label={'task name'}
                        value={valueTask}
                        size={'small'}
                        multiline={false}
                        sx={{
                            width: '100%',
                            marginBottom: '10px',
                            borderBottom: mistakeTextField ? '1px solid #EB2525' : '',
                            '& .MuiInputLabel-root': {
                                fontSize: '18px',
                                fontStyle: 'normal',
                                color: 'rgba(112, 78, 204, 0.50)',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: mistakeTextField ? '1px solid #EB2525' : 'secondary.main',
                            },
                            // Change styles for the label after focused
                            '&:focus-within .MuiInputLabel-root': {
                                color: 'secondary.main'
                            },
                        }}
                        InputProps={{
                            sx: {
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                            }
                        }}
                        onChange={changeTitle}
                    />
                    <CustomTextField
                        label={'description'}
                        value={valueDescription}
                        size={'small'}
                        multiline={true}
                        sx={{
                            width: '100%',
                            maxHeight: '340px',
                            overflow: 'auto',
                            fontSize: '22px',
                            '@media (max-width: 640px)': {
                                maxHeight: '230px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '18px',
                                fontStyle: 'normal',
                                color: 'rgba(112, 78, 204, 0.50)',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'secondary.main',
                            },
                            // Change styles for the label after focused
                            '&:focus-within .MuiInputLabel-root': {
                                color: 'secondary.main'
                            },
                        }}
                        InputProps={{
                            sx: {
                                fontSize: '18px',
                            }
                        }}
                        onChange={changeSpecification}
                    />
                    {childrenGroupSettings}
                    {childrenButtons}
                </Box>
            }
        </>
    )
}