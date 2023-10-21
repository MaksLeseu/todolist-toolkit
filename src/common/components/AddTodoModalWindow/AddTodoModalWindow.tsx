import React, {ChangeEvent, FC, MouseEventHandler} from "react";
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {CustomModalWindow} from "../CustomModalWindow/CustomModalWindow";
import {CustomButton} from "../CustomButton/CustomButton";
import s from './AddTodoModalWindow.module.css'

type Props = {
    isOpen: boolean
    value: string
    changeTodoName: (e: ChangeEvent<HTMLInputElement>) => void
    closeModalWindow: MouseEventHandler | undefined
    addTodo: () => void
}

export const AddTodoModalWindow: FC<Props> = (props) => {
    const {isOpen, value, changeTodoName, closeModalWindow, addTodo} = props

    const style = {
        width: 350,
        height: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
    };

    return (
        <CustomModalWindow
            open={isOpen}
            title={'Add a to-do list'}
            styleObject={style}
            onClose={closeModalWindow}
        >
            <div className={s.box}>
                <CustomTextField
                    label={"To-do list name"}
                    size={'medium'}
                    variant={'filled'}
                    multiline={false}
                    value={value}
                    onChange={changeTodoName}
                />
                <div className={s.buttonsContainer}>
                    <CustomButton
                        color={'inherit'}
                        label={'Cancel'}
                        variant={'contained'}
                        sx={{marginTop: '200px', marginLeft: '6px'}}
                        onClick={closeModalWindow}
                    />
                    <CustomButton
                        color={'primary'}
                        label={'Add to-do'}
                        variant={'contained'}
                        sx={{marginTop: '200px', marginLeft: '6px'}}
                        onClick={addTodo}
                    />
                </div>
            </div>
        </CustomModalWindow>
    )
}