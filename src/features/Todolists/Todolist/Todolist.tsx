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
import {isOpenMenuSelector} from "../../../app/app.selector";
import {Main} from '../../../common/utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart'
import {useMediaQuery} from "@mui/material";
import {useSettingDate} from "../../../common/utils/hooks/useSettingDate";
import {useSettingPriority} from "../../../common/utils/hooks/useSettingPriority";

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
    const isOpenMenu = useAppSelector(isOpenMenuSelector)

    useEffect(() => {
        dispatch(tasksThunk.fetchTasks({todolistId}))
    }, [])

    const tasks: StateTaskType = useAppSelector(taskSelector)
    const task: TasksType[] = tasks[todolistId]

    const {changeTodolistFilter} = useActions(todolistsActions);

    const changeTodolistsFilterHandler = (filter: TodolistFilterType) =>
        changeTodolistFilter({id: todolistId, filter})

    const [taskText, setTaskText] = useState<{ taskName: string, description: string }>({
        taskName: '',
        description: '',
    })

    const [formAddTask, setFormAddTask] = useState<boolean>(false)
    const [visibleLiner, setVisibleLiner] = useState<boolean>(false)

    const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText({
            ...taskText,
            taskName: e.currentTarget.value,
        })
    }
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText({
            ...taskText,
            description: e.currentTarget.value,
        })
    }

    const openFormAddTask = () => setFormAddTask(true);

    const closeFormAddTask = () => {
        setFormAddTask(false)
        clearingStateTaskNameAndDescription()
    }

    const clearingStateTaskNameAndDescription = () => {
        setTaskText({
            taskName: '',
            description: '',
        })
    }

    const {date, settingDate, resetDate} = useSettingDate()
    const {priority, settingPriority, resetPriority} = useSettingPriority()


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
                resetDate('startDate')
                resetDate('deadline')
                resetPriority()
            })
        closeFormAddTask()
    }

    const addTaskHandle = () => addTask({
        title: taskText.taskName,
        description: taskText.description,
        startDate: date.startDate,
        deadline: date.deadline,
        priority: priority as number
    })

    const matches1520 = useMediaQuery('(max-width:1520px)');
    const matches1420 = useMediaQuery('(max-width:1420px)');
    const matches1180 = useMediaQuery('(max-width:1180px)');
    const matches800 = useMediaQuery('(max-width:800px)');

    const maxWidth1520 = isOpenMenu && matches1520 ? 120 : 20
    const maxWidth1420 = isOpenMenu && matches1420 ? 220 : maxWidth1520
    const maxWidth1180 = isOpenMenu && matches1180 ? 80 : maxWidth1420
    const maxWidth800 = isOpenMenu && matches800 ? 0 : maxWidth1180
    const marginLeft = maxWidth1520 && maxWidth1420 && maxWidth1180 && maxWidth800

    const matches1130 = useMediaQuery('(max-width:1130px)');

    if (task === undefined) return <Preloader/>

    return (
        <Main open={isOpenMenu} drawerWidth={'0px'} marginLeft={marginLeft}
              sx={{display: 'grid', justifyContent: 'center'}}>
            <div className={isOpenMenu ? `${s.todolistContainerActive}` : s.todolistContainer}>
                <h2 className={isOpenMenu ? `${s.title} ${s.titleActive}` : s.title}>{todolistTitle}</h2>
                <div className={isOpenMenu ? `${s.filterTaskContainerActive}` : s.filterTaskContainer}>
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
                                taskName={taskText.taskName}
                                description={taskText.description}
                                closeFormAddTask={closeFormAddTask}
                                changeTaskName={changeTaskName}
                                changeDescription={changeDescription}
                                addTask={addTaskHandle}
                                prioritySettingFunction={settingPriority}
                                genericSettingFunction={settingDate}
                            />
                            :
                            <AddTaskButton
                                label={MSG_BTN.ADD_A_TASK}
                                openFormAddTask={openFormAddTask}
                            />
                    }
                </div>
            </div>
        </Main>
    )
}