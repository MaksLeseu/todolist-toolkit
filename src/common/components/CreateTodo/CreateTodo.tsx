import React, {ChangeEvent, useState} from 'react';
import {CreateTodoIcon} from "../Icons/CreateTodoIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import s from './CreateTodo.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {TodolistsType} from "../../../features/Todolists/todolists.types";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {todolistsSelector} from "../../../features/Todolists/todolists.selector";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {TodoTaskCreationForm} from "./TodoTaskCreationForm/TodoTaskCreationForm";
import {TaskSetItems} from "./TaskSetItems/TaskSetItems";
import {BaseCalendar} from "../BaseCalendar/BaseCalendar";
import {useOpenCloseCalendar} from "../../utils/hooks/useOpenCloseCalendar";
import {Priority} from "../Priority/Priority";
import {useOpenClosePriority} from "../../utils/hooks/useOpenClosePriority";
import {useSettingDate} from "../../utils/hooks/useSettingDate";
import {Nullable} from "../../utils/types/optional.types";
import {Dayjs} from "dayjs";
import {useSettingPriority} from "../../utils/hooks/useSettingPriority";
import {Main} from '../../utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart'
import {isOpenMenuSelector} from "../../../app/app.selector";
import {todolistsThunk} from "../../../features/Todolists/todolists.slice";
import {tasksThunk} from "../../../features/Tasks/tasks.slice";

type TitleType = {
    todoName: string
    taskName: string
    description: string
}

export const CreateTodo = () => {
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)
    const isOpenMenu = useAppSelector(isOpenMenuSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const {isOpenCalendar, openCloseCalendar} = useOpenCloseCalendar()
    const {isOpenPriority, openClosePriority} = useOpenClosePriority()
    const {date, settingDate} = useSettingDate()
    const {priority, settingPriority} = useSettingPriority()

    const priorityTask: number = priority === null ? 1 : priority

    const [title, setTitle] = useState<TitleType>({
        todoName: '',
        taskName: '',
        description: '',
    })

    const settingStartDateValueHandle = (date: Nullable<Dayjs>) => {
        settingDate(date, 'startDate')
    }

    const settingDeadlineValueHandle = (date: Nullable<Dayjs>) => {
        settingDate(date, 'deadline')
    }

    const settingPriorityHandle = (priority: number) => {
        settingPriority(priority)
        openClosePriority('close')
    }

    const changeTitle = (method: 'todo' | 'task' | 'description', e: ChangeEvent<HTMLInputElement>) => {
        const object = {
            'todo': () => (
                setTitle({
                    ...title,
                    todoName: e.currentTarget.value,
                })
            ),
            'task': () => (
                setTitle({
                    ...title,
                    taskName: e.currentTarget.value,
                })
            ),
            'description': () => (
                setTitle({
                    ...title,
                    description: e.currentTarget.value,
                })
            ),
        }
        return object[method]()
    }

    const addTodo = () => {
        if (title.todoName.trim()) {
            dispatch(todolistsThunk.addTodolist({title: title.todoName}))
                .then((res) => {
                    if (res.payload) {
                        const todoId: string = res.payload.todolist.id
                        addTask(todoId)
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    const addTask = (todoId: string) => {
        if (title.taskName.trim()) {
            dispatch(tasksThunk.addTask({
                todolistId: todoId,
                title: title.taskName,
                description: title.description,
                startDate: date.startDate,
                deadline: date.deadline,
                priority: priorityTask,
            }))
                .finally(() => {
                    setTitle({
                        todoName: '',
                        taskName: '',
                        description: '',
                    })
                    return navigate(`/todolist-toolkit/todo/${todoId}`)
                })
        } else {
            setTitle({
                todoName: '',
                taskName: '',
                description: '',
            })
            return navigate(`/todolist-toolkit/todo/${todoId}`)
        }
    }

    const labelPositions = todos.length > 0 ? `${s.banner} ${s.changeMargin}` : s.banner
    const labelPositionStyles = isOpenMenu ? `${s.banner} ${s.bannerPositionLeft}` : labelPositions

    return (
        <Main open={isOpenMenu} drawerWidth={'0px'} marginLeft={200}>
            <Box
                sx={{
                    marginTop: '30px',
                    display: 'grid',
                    gridTemplateColumns: isOpenMenu ? '48px 540px 350px' : '48px 665px 350px',
                    gridTemplateRows: '92px 40px 1fr 130px',
                    justifyContent: 'center',
                    '@media (max-width: 1520px)': {
                        gridTemplateColumns: '0px 540px',
                    },
                    '@media (max-width: 980px)': {
                        gridTemplateColumns: '0px 440px',
                    },
                    '@media (max-width: 500px)': {
                        gridTemplateColumns: '0px 340px',
                    },
                    '@media (max-width: 360px)': {
                        gridTemplateColumns: '0px 300px',
                    },
                }}
            >
                <div className={labelPositionStyles}>
                    <p className={isOpenMenu ? `${s.label} ${s.labelPositionLeft}` : s.label}>CREATE</p>
                    <p className={s.title}>
                        {
                            todos.length > 0
                                ?
                                'your to do list'
                                :
                                'your first to do list'
                        }
                    </p>
                </div>
                <div className={s.flexContainer}>
                    <div className={s.textFieldColumn}>
                        <TodoTaskCreationForm
                            title={'Enter the name of to do list'}
                            value={title.todoName}
                            placeholderStyles={{
                                fontSize: '32px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '38px',
                            }}
                            textFieldStyles={{
                                marginBottom: '54px',
                            }}
                            inputStyles={{
                                fontSize: '32px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '38px',
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('todo', e)}
                        />
                        <TodoTaskCreationForm
                            title={'Enter the name of the task'}
                            value={title.taskName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('task', e)}
                        />

                        <TodoTaskCreationForm
                            title={'Enter a description of the task'}
                            value={title.description}
                            placeholderStyles={{
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '24px',
                            }}
                            inputStyles={{
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '24px',
                            }}
                            titleStyles={{
                                width: '219px',
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('description', e)}
                        />

                        <TaskSetItems
                            title={'StartDate of the task'}
                            valueDate={date.startDate}
                            isOpen={isOpenCalendar.openStartDate}
                            children={
                                <BaseCalendar
                                    openCalendar={isOpenCalendar.openStartDate}
                                    closeCalendar={() => openCloseCalendar('close')}
                                    settingDate={settingStartDateValueHandle}
                                />
                            }
                            handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openCloseCalendar('open', 'startDate', event)}
                        />

                        <TaskSetItems
                            title={'Deadline of the task'}
                            valueDate={date.deadline}
                            isOpen={isOpenCalendar.openDeadline}
                            children={
                                <BaseCalendar
                                    openCalendar={isOpenCalendar.openDeadline}
                                    closeCalendar={() => openCloseCalendar('close')}
                                    settingDate={settingDeadlineValueHandle}
                                />
                            }
                            handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openCloseCalendar('open', 'deadline', event)}
                        />

                        <TaskSetItems
                            title={'Priority of the task'}
                            valuePriority={priorityTask}
                            isOpen={isOpenPriority}
                            children={
                                <Priority
                                    openPriority={isOpenPriority}
                                    closePriority={() => openClosePriority('close')}
                                    settingPriority={settingPriorityHandle}
                                />
                            }
                            handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openClosePriority('open', event)}
                        />
                    </div>

                </div>

                <div className={isOpenMenu ? `${s.imageColumn} ${s.imagePositionTop}` : s.imageColumn}>
                    <CreateTodoIcon/>
                </div>

                <div
                    className={isOpenMenu ? `${s.buttonsContainer} ${s.buttonsContainerPositionLeft}` : s.buttonsContainer}>
                    <CustomButton
                        label={'Save'}
                        color={'secondary'}
                        sx={{
                            width: '190px',
                            height: '50px',
                            borderRadius: '8px',
                            color: '#FFF',
                            fontSize: '22px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '34px',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                            marginRight: '4px',
                        }}
                        variant={'contained'}
                        onClick={addTodo}
                    />
                    <NavLink className={s.buttonCancel} to={'/todolist-toolkit/todo'}>
                        <CustomButton
                            label={'Cancel'}
                            color={'primary'}
                            sx={{
                                width: '190px',
                                height: '50px',
                                borderRadius: '8px',
                                color: '#704ECC',
                                fontSize: '22px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '34px',
                                border: '1px solid #704ECC',
                                boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                marginLeft: '4px',
                            }}
                            variant={'outlined'}
                        />
                    </NavLink>
                </div>
            </Box>
        </Main>
    );
}