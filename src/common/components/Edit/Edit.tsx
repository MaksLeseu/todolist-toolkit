import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {CustomPopover} from "../CustomPopover/CustomPopover";
import {Typography} from "@mui/material";
import {CustomTextField} from "../CustomTextField/CustomTextField";

type Props = {
    isOpen: any
    todoTitle: string
    transformPopover: string
    transformEdit: string
    actionEdit: () => void
    closeEdit: () => void
}

export const Edit: FC<Props> = (props) => {
    const {isOpen, todoTitle, transformPopover, transformEdit, actionEdit, closeEdit} = props

    return (
        <CustomPopover
            anchorEl={isOpen}
            transformStyle={transformPopover ? transformPopover : 'translate(-0%, -2%)'}
            handleClosePopover={closeEdit}
        >
            <>
                <Box sx={{
                    transform: transformEdit ? transformEdit : 'translate(4%, 28%)',
                }}>
                    <TriangleIcon/>
                </Box>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    width: '203px',
                    height: '102px',
                    borderRadius: '4px',
                    padding: '12px 0 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography
                        component="div"
                        sx={{
                            color: 'common.black',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: '16px',
                            width: '173px',
                            marginBottom: '8px',
                        }}>
                        Enter the name of to do list
                    </Typography>
                    <CustomTextField
                        size={'small'}
                        value={todoTitle}
                        sx={{
                            width: '173px',
                            borderBottom: '1px solid #704ECC',
                            marginBottom: '10px',
                        }}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                height: '18px',
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '18px',
                                paddingTop: '5px',
                                color: 'rgba(112, 78, 204, 0.50)',
                            },
                        }}
                        onChange={() => {
                        }}/>
                    <Box>
                        <CustomButton
                            label={'Save'}
                            variant={'text'}
                            sx={{
                                minWidth: '45px',
                                height: '18px',
                                backgroundColor: 'secondary.main',
                                fontSize: '8px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '14px',
                                color: 'common.white',
                                textAlign: 'center',
                                boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                borderRadius: '2px',
                                marginRight: '2px',
                            }}
                            onClick={actionEdit}
                        />
                        <CustomButton
                            label={'Cancel'}
                            variant={'text'}
                            sx={{
                                minWidth: '45px',
                                height: '18px',
                                borderRadius: '2px',
                                border: '1px solid #704ECC',
                                fontSize: '8px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '14px',
                                color: 'secondary.main',
                                marginLeft: '2px',
                            }}
                            onClick={closeEdit}
                        />
                    </Box>
                </Box>
            </>
        </CustomPopover>
    );
};