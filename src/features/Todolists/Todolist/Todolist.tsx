import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from './Todolist.module.css'
import {Tasks} from "../../Tasks/Tasks";
import {AddTaskButton} from "../../Tasks/AddTaskButton/AddTaskButton";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import DescriptionIcon from '@mui/icons-material/Description';
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

type Props = {
    todolistId: string
    todolistTitle: string
    todolist: TodolistsType
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

    const [deadline, setDeadline] = useState<Dayjs | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)

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

    const handleSettingDeadline = (deadline: Dayjs | null) => setDeadline(deadline)
    const handleSettingStartDate = (startDate: Dayjs | null) => setStartDate(startDate)

    const addTask = (title: string, description: string, startDate: Dayjs | null, deadline: Dayjs | null) => {
        if (!title) {
            return
        }
        setVisibleLiner(true)
        dispatch(tasksThunk.addTask({todolistId, title, description, startDate, deadline}))
            .finally(() => setVisibleLiner(false))
        closeFormAddTask()
    }

    if (task === undefined) return <Preloader/>

    return (
        <div>
            <div className={s.headerContainer}>
                <div className={s.titleContainer}>
                    <DescriptionIcon color={'info'}/>
                    <h2>{todolistTitle}</h2>
                </div>
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
                            startDate={startDate}
                            deadline={deadline}
                            closeFormAddTask={closeFormAddTask}
                            changeTaskName={changeTaskName}
                            changeDescription={changeDescription}
                            addTask={addTask}
                            handleSettingDeadline={handleSettingDeadline}
                            handleSettingStartDate={handleSettingStartDate}
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