import React, {ChangeEvent, FC, ReactNode} from "react";
import s from './TaskRedactor.module.css';
import {CustomTextField} from "../CustomTextField/CustomTextField";

type Props = {
    valueTask: string
    valueDescription: string
    taskRedactor: boolean
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
        childrenGroupSettings,
        childrenButtons,
        changeTitle,
        changeSpecification
    } = props

    return (
        <>
            {
                taskRedactor &&
                <div className={s.taskRedactor}>
                    <CustomTextField
                        label={'task name'}
                        value={valueTask}
                        size={'small'}
                        multiline={false}
                        sx={{width: '100%', marginBottom: '10px'}}
                        onChange={changeTitle}
                    />
                    <CustomTextField
                        label={'description'}
                        value={valueDescription}
                        size={'small'}
                        multiline={true}
                        sx={{width: '100%'}}
                        onChange={changeSpecification}
                    />
                    {childrenGroupSettings}
                    {childrenButtons}
                </div>
            }
        </>
    )
}