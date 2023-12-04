import React, {FC, useState} from "react";
import Box from '@mui/material/Box';
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {PlusIcon} from "../../../common/components/Icons/PlusIcon";
import {common} from "@mui/material/colors";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import Drawer from '@mui/material/Drawer';
import {TodolistsType} from "../../Todolists/todolists.types";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "../../Todolists/todolists.selector";
import {MoreHorizIcon} from "../../../common/components/Icons/MoreHorizIcon";
import {DocumentIcon} from "../../../common/components/Icons/DocumentIcon";
import {ArrowIcon} from "../../../common/components/Icons/ArrowIcon";
import {CustomSwitch} from "../../../common/components/CustomSwitch/CustomSwitch";


type Props = {
    isOpen: boolean
    handleDrawerClose: () => void
}

export const BodyMenu: FC<Props> = (props) => {
    const {isOpen, handleDrawerClose} = props
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

    const [isOpenTodoModalWindow, setIsOpenTodoModalWindow] = useState<boolean>(false)

    const openOrCloseTodoModalWindow = () => setIsOpenTodoModalWindow(!isOpenTodoModalWindow)

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 420,
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1300,
                    boxSizing: 'border-box',
                    padding: '18px 18px 18px 165px',
                    background: 'linear-gradient(186deg, #48289B -0.63%, rgba(82, 28, 225, 0.60) 58.84%, #412589 83.63%)',
                },
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <Box sx={{marginBottom: '72px'}}>
                <CustomButton
                    label={'Today'}
                    variant={'text'}
                    iconFromTheEnd={<Box sx={{marginLeft: '4px', width: '24px', height: '24px'}}><ArrowIcon/></Box>}
                    sx={{
                        color: common.white,
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '24px',
                        textTransform: 'uppercase',
                        marginLeft: '30px'
                    }}
                    onClick={handleDrawerClose}
                />
            </Box>
            <Box sx={{marginBottom: '50px'}}>
                <CustomIconButton
                    disableRipple={false}
                    sx={{
                        width: '162px',
                        height: '56px',
                        borderRadius: '8px',
                        backgroundColor: '#F81',
                        color: common.white,
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '24px',
                        '&:hover': {
                            backgroundColor: 'common.black',
                        }
                    }}
                    onClick={openOrCloseTodoModalWindow}
                >
                    <><Box sx={{marginRight: '8px'}}>Create</Box> <PlusIcon/></>
                </CustomIconButton>
            </Box>
            {
                todos &&
                <Box sx={{flexGrow: 1}}>
                    {
                        todos.map(el => (
                                <CustomIconButton
                                    disableRipple={false}
                                    sx={{
                                        width: '190px',
                                        height: '52px',
                                        borderRadius: '4px',
                                        padding: '12px 0px 12px 0px',
                                        color: 'common.white',
                                        fontSize: '22px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '28px',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => {
                                    }}
                                >
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}>
                                        <Box sx={{alignSelf: 'center'}}><DocumentIcon/></Box>
                                        <Box sx={{alignSelf: 'center'}}>{el.title}</Box>
                                        <CustomIconButton
                                            disableRipple={true}
                                            onClick={() => {
                                            }}
                                        >
                                            <MoreHorizIcon/>
                                        </CustomIconButton>
                                    </Box>
                                </CustomIconButton>
                            )
                        )
                    }
                </Box>
            }
            <Box sx={{height: '80px'}}>
                <CustomSwitch/>
            </Box>
        </Drawer>
    );
}
