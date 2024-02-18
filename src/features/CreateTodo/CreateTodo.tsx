import React, {ChangeEvent, useState} from 'react';
import {CreateTodoIconLight} from "../../common/components/Icons/CreateTodoIconLight";
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import s from './CreateTodo.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {TodolistsType} from "../Todolists/todolists.types";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "../Todolists/todolists.selector";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {TaskSetItems} from "./TaskSetItems/TaskSetItems";
import {BaseCalendar} from "../../common/components/BaseCalendar/BaseCalendar";
import {useOpenCloseCalendar} from "../../common/utils/hooks/useOpenCloseCalendar";
import {Priority} from "../../common/components/Priority/Priority";
import {useOpenClosePriority} from "../../common/utils/hooks/useOpenClosePriority";
import {useSettingDate} from "../../common/utils/hooks/useSettingDate";
import {Nullable} from "../../common/utils/types/optional.types";
import {Dayjs} from "dayjs";
import {useSettingPriority} from "../../common/utils/hooks/useSettingPriority";
import {Main} from '../../common/utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart'
import {isOpenMenuSelector, modeSelector} from "../../app/app.selector";
import {todolistsThunk} from "../Todolists/todolists.slice";
import {tasksThunk} from "../Tasks/tasks.slice";
import {Preloader} from "../../common/components/Preloader/Preloader";
import {CreateTodoIconDark} from "../../common/components/Icons/CreateTodoIconDark";
import {BASE_ROUTE} from "../../routes/Routes";
import Divider from "@mui/material/Divider";
import {MSG_BTN} from "../../common/utils/constans/app-messages.const";
import {TodoTaskCreationForm} from "./TodoTaskCreationForm/TodoTaskCreationForm";

type TitleType = {
    todoName: string
    taskName: string
    description: string
}

export const CreateTodo = () => {
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)
    const isOpenMenu = useAppSelector(isOpenMenuSelector)
    const mode = useAppSelector(modeSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const {isOpenCalendar, openCloseCalendar} = useOpenCloseCalendar()
    const {isOpenPriority, openClosePriority} = useOpenClosePriority()
    const {date, settingDate} = useSettingDate()
    const {priority, settingPriority} = useSettingPriority()

    const priorityTask: number = priority === null ? 1 : priority
    const addStylesLabel = isOpenMenu ? {textAlign: 'start'} : {}

    const [title, setTitle] = useState<TitleType>({
        todoName: '',
        taskName: '',
        description: '',
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            setIsLoading(true)
            dispatch(todolistsThunk.addTodolist({title: title.todoName}))
                .then((res) => {
                    if (res.payload) {
                        const todoId: string = res.payload.todolist.id
                        addTask(todoId)
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => setTimeout(() => {
                    setIsLoading(false)
                }, 1000))
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
                    return navigate(`${BASE_ROUTE}/todo/${todoId}`)
                })
        } else {
            setTitle({
                todoName: '',
                taskName: '',
                description: '',
            })
            return navigate(`${BASE_ROUTE}/todo/${todoId}`)
        }
    }

    if (isLoading) return <Preloader/>

    const labelPositions = todos.length > 0 ? `${s.banner} ${s.changeMargin}` : s.banner
    const labelPositionStyles = isOpenMenu ? `${s.banner} ${s.bannerPositionLeft}` : labelPositions

    const isMistakeTextFieldForTodoName = !!title.todoName && title.todoName.trim().length >= 100
    const isMistakeTextFieldForTaskName = !!title.taskName && title.taskName.trim().length >= 100

    return (
        <Main open={isOpenMenu} drawerwidth={'0px'} marginleft={200}>
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
                    <Box
                        sx={{
                            color: 'text.primary',
                            textAlign: 'center',
                            fontSize: '38px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '38px',
                            textTransform: 'uppercase',
                            margin: 0,
                            ...addStylesLabel,
                            '@media (max-width: 450px)': {
                                fontSize: '28px',
                                lineHeight: '34px',
                            }
                        }}
                    >
                        CREATE
                    </Box>
                    <Box
                        sx={{
                            color: 'text.primary',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '28px',
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        {
                            todos.length > 0
                                ?
                                'your to do list'
                                :
                                'your first to do list'
                        }
                    </Box>
                </div>
                <div className={s.flexContainer}>
                    <div className={s.textFieldColumn}>
                        <TodoTaskCreationForm
                            title={'To-do list name'}
                            value={title.todoName}
                            placeholder={'To-do list name'}
                            mistakeTextField={isMistakeTextFieldForTodoName}
                            mistakeTextFieldTitle={'Todo name is more than 100 characters.'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('todo', e)}
                        />
                        <TodoTaskCreationForm
                            title={'Task name'}
                            value={title.taskName}
                            placeholder={'Task name'}
                            mistakeTextField={isMistakeTextFieldForTaskName}
                            mistakeTextFieldTitle={'Task name is more than 100 characters.'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('task', e)}
                        />

                        <TodoTaskCreationForm
                            title={'Task description'}
                            value={title.description}
                            placeholder={'Task description'}
                            textFieldStyles={{marginBottom: '40px'}}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTitle('description', e)}
                        />

                        <Box>
                            <Box sx={{
                                display: 'flex',
                                '@media (max-width: 500px)': {
                                    display: 'block'
                                },
                            }}>
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
                            </Box>
                            <Divider sx={{
                                backgroundColor: 'secondary.main', width: '465px',
                                '@media (max-width: 980px)': {
                                    width: '440px',
                                },
                                '@media (max-width: 500px)': {
                                    display: 'none'
                                },
                            }}/>
                        </Box>
                    </div>

                </div>

                <div className={isOpenMenu ? `${s.imageColumn} ${s.imagePositionTop}` : s.imageColumn}>
                    {mode === 'dark' ? <CreateTodoIconDark/> : <CreateTodoIconLight/>}
                </div>

                <div
                    className={isOpenMenu ? `${s.buttonsContainer} ${s.buttonsContainerPositionLeft}` : s.buttonsContainer}>
                    <CustomButton
                        label={MSG_BTN.SAVE}
                        color={'secondary'}
                        disabled={isMistakeTextFieldForTodoName || isMistakeTextFieldForTaskName}
                        sx={{
                            width: '190px',
                            height: '50px',
                            borderRadius: '8px',
                            color: '#FFF',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '28px',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                            marginRight: '4px',
                            transition: 'all 0.6s',
                            '&:hover': {
                                transition: 'all 0.6s',
                                transform: 'scale(1.05)',
                            }
                        }}
                        variant={'contained'}
                        onClick={addTodo}
                    />
                    <NavLink className={s.buttonCancel} to={`${BASE_ROUTE}/todo`}>
                        <CustomButton
                            label={MSG_BTN.CANCEL}
                            color={'primary'}
                            sx={{
                                width: '190px',
                                height: '50px',
                                borderRadius: '8px',
                                color: '#704ECC',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '28px',
                                border: '1px solid #704ECC',
                                boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                marginLeft: '4px',
                                transition: 'all 0.6s',
                                '&:hover': {
                                    transition: 'all 0.6s',
                                    transform: 'scale(1.05)',
                                }
                            }}
                            variant={'outlined'}
                        />
                    </NavLink>
                </div>
            </Box>
        </Main>
    );
}