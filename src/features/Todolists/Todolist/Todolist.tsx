import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from './Todolist.module.css'
import {Tasks} from "../../Tasks/Tasks";
import {AddTaskButton} from "../../Tasks/AddTaskButton/AddTaskButton";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import {StateTaskType, tasksThunk} from "../../Tasks/tasks.slice";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {FormAddTask} from "../../Tasks/FormAddTask/FormAddTask";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {taskSelector} from "../../Tasks/task.selector";
import {Preloader} from "../../../common/components/Preloader/Preloader";
import {TasksType} from "../../Tasks/tasks.types";
import {FilterTasks} from "../../Tasks/FilterTasks/FilterTasks";
import {TodolistFilterType, TodolistsType} from "../todolists.types";
import {useActions} from "../../../common/utils/hooks/useActions";
import {todolistsActions} from "../todolists.slice";
import {Dayjs} from "dayjs";
import {Nullable} from "../../../common/utils/types/optional.types";

type Props = {
    todolistId: string
    todolistTitle: string
    todolist: TodolistsType
}

type AddTaskParamsType = {
    title: string
    description: string
    startDate: Nullable<Dayjs>
    deadline: Nullable<Dayjs>
    priority: number
}

export const Todolist: FC<Props> = (props) => {
    const {todolistId, todolistTitle, todolist} = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(tasksThunk.fetchTasks({todolistId}))
    }, [])

    const tasks: StateTaskType = useAppSelector(taskSelector)
    const task: TasksType[] = tasks[todolistId]

    const {changeTodolistFilter} = useActions(todolistsActions);

    const changeTodolistsFilterHandler = (filter: TodolistFilterType) =>
        changeTodolistFilter({id: todolistId, filter})

    const [taskName, setTaskName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [formAddTask, setFormAddTask] = useState<boolean>(false)
    const [visibleLiner, setVisibleLiner] = useState<boolean>(false)

    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)
    const [priority, setPriority] = useState<number>(1)

    const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value)
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)

    const openFormAddTask = () => setFormAddTask(true);

    const closeFormAddTask = () => {
        setFormAddTask(false)
        clearingStateTaskNameAndDescription()
    }

    const clearingStateTaskNameAndDescription = () => {
        setTaskName('')
        description && setDescription('')
    }

    const handleSettingDeadline = (deadline: Nullable<Dayjs>) => setDeadline(deadline)
    const handleSettingStartDate = (startDate: Nullable<Dayjs>) => setStartDate(startDate)
    const handleSettingPriority = (priority: number) => setPriority(priority)

    const genericSettingFunction = (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => {
        const methodsForSettingValues = {
            'startDate': (startDate: Nullable<Dayjs> | number) => {
                handleSettingStartDate(startDate as Nullable<Dayjs>)
            },
            'deadline': (deadline: Nullable<Dayjs> | number) => {
                handleSettingDeadline(deadline as Nullable<Dayjs>)
            },
            'priority': (priority: number | Nullable<Dayjs>) => {
                handleSettingPriority(priority as number)
            },
        }
        methodsForSettingValues[method](value)
    }


    const addTask = (params: AddTaskParamsType) => {
        if (!params.title) return

        setVisibleLiner(true)
        dispatch(tasksThunk.addTask({
            todolistId,
            title: params.title,
            description: params.description,
            startDate: params.startDate,
            deadline: params.deadline,
            priority: params.priority
        }))
            .finally(() => {
                setVisibleLiner(false)
                setDeadline(null)
                setStartDate(null)
                setPriority(1)
            })
        closeFormAddTask()
    }

    const addTaskHandle = () => addTask({title: taskName, description, startDate, deadline, priority})

    if (task === undefined) return <Preloader/>

    return (
        <div>
            <h2 className={s.title}>{todolistTitle}</h2>
            <div className={s.headerContainer}>
                <FilterTasks
                    valueTodoFilter={todolist.filter}
                    changeTodolistsFilterHandler={changeTodolistsFilterHandler}
                />
            </div>
            <div className={s.todolist}>

                <Tasks
                    todolistId={todolistId}
                    todolistTitle={todolistTitle}
                    todolist={todolist}
                    visibleLiner={visibleLiner}
                    setVisibleLiner={setVisibleLiner}
                />

                {
                    formAddTask
                        ?
                        <FormAddTask
                            taskName={taskName}
                            description={description}
                            closeFormAddTask={closeFormAddTask}
                            changeTaskName={changeTaskName}
                            changeDescription={changeDescription}
                            addTask={addTaskHandle}
                            genericSettingFunction={genericSettingFunction}
                        />
                        :
                        <AddTaskButton
                            label={MSG_BTN.ADD_A_TASK}
                            openFormAddTask={openFormAddTask}
                        />
                }
            </div>
        </div>
    )
}