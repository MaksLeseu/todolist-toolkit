import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {CustomPopover} from "../CustomPopover/CustomPopover";
import {Typography} from "@mui/material";
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import {Mistake} from "../Mistake/Mistake";

type Props = {
    isOpen: any
    value: string
    mistakeTextField: boolean
    transformPopover: string
    transformEdit: string
    actionEdit: () => void
    closeEdit: () => void
    onChange: OutlinedInputProps['onChange']
}

export const Edit: FC<Props> = (props) => {
    const {isOpen, value, mistakeTextField, transformPopover, transformEdit, actionEdit, closeEdit, onChange} = props

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
                    width: '210px',
                    minHeight: '102px',
                    borderRadius: '4px',
                    padding: '12px 0 12px 0',
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
                    <Mistake
                        isOpen={mistakeTextField}
                    />
                    <CustomTextField
                        size={'small'}
                        value={value}
                        sx={{
                            width: '173px',
                            borderBottom: mistakeTextField ? '1px solid #EB2525' : '1px solid #704ECC',
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
                        onChange={onChange}
                    />
                    <Box>
                        <CustomButton
                            label={MSG_BTN.SAVE}
                            variant={'contained'}
                            color={'secondary'}
                            disabled={mistakeTextField}
                            sx={{
                                minWidth: '45px',
                                height: '18px',
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '14px',
                                color: 'text.secondary',
                                textAlign: 'center',
                                boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                borderRadius: '2px',
                                marginRight: '2px',
                            }}
                            onClick={actionEdit}
                        />
                        <CustomButton
                            label={MSG_BTN.CANCEL}
                            variant={'text'}
                            sx={{
                                minWidth: '45px',
                                height: '18px',
                                borderRadius: '2px',
                                border: '1px solid #704ECC',
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 500,
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