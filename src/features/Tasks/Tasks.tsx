import React, { useCallback } from "react"
import Task from "features/Tasks/Task/Task"
import AddElement from "common/components/AddItemForm/AddItemForm"
import { removeTaskTC, TaskDomainType, tasksThunks } from "features/Tasks/model/tasksSlice"
import TaskFilter from "features/Tasks/TasksFilter/TaskFilter"
import s from "features/Tasks/Tasks.module.scss"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useFetchTasks } from "features/Tasks/useFetchTasks"
import { RequestStatusType } from "app/appSlice"
import { changeTodoListFilterAC, FilterType } from "features/TodoLists/model/todoListsSlice"
import { TaskStatuses } from "features/Tasks/api/tasksApi.types"

type TasksPropsType = {
  todoId: string
  filter: FilterType
  disabled?: boolean
  todoListEntityStatus: RequestStatusType
}

const Tasks: React.FC<TasksPropsType> = ({ todoId, filter, disabled, todoListEntityStatus }) => {
  const { tasks } = useFetchTasks(todoId)
  const dispatch = useAppDispatch()
  const changeTaskTitle = useCallback((taskId: string, title: string) => {
    dispatch(tasksThunks.updateTask({ todoId, taskId, domainModel: { title } }))
  }, [])
  const removeTask = useCallback((taskId: string) => {
    dispatch(removeTaskTC(todoId, taskId))
  }, [])
  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
    dispatch(tasksThunks.updateTask({ todoId, taskId, domainModel: { status } }))
  }, [])
  const changeTaskFilter = useCallback((filter: FilterType) => {
    dispatch(changeTodoListFilterAC({ todoId, filter }))
  }, [])
  const addTask = useCallback((title: string) => {
    dispatch(tasksThunks.addTask({ todoId, title }))
  }, [])

  const tasksFilter = useCallback(
    (filter: FilterType): TaskDomainType[] => {
      switch (filter) {
        case "active":
          return tasks.filter((t) => t.status === TaskStatuses.New)
        case "completed":
          return tasks.filter((t) => t.status === TaskStatuses.Completed)
        default:
          return tasks
      }
    },
    [tasks]
  )

  const filteredTask = tasksFilter(filter)

  const taskElements = filteredTask.map((task) => (
    <Task
      key={task.id}
      task={task}
      changeTaskTitle={changeTaskTitle}
      removeTask={removeTask}
      changeTaskStatus={changeTaskStatus}
      todoListEntityStatus={todoListEntityStatus}
    />
  ))

  return (
    <div className={s.tasks}>
      <div>
        <AddElement onChange={addTask} placeholder={"...add task"} disabled={disabled} />
        <ul>{taskElements}</ul>
      </div>
      {tasks.length > 0 && <TaskFilter changeFilter={changeTaskFilter} filter={filter} />}
    </div>
  )
}

export default React.memo(Tasks)
