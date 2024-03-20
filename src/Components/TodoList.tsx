import { useState } from "react"
import { TaskList } from "../Types/types"

const TodoList = () => {
    const [tasks, setTasks] = useState<TaskList[]>([])
    const [newTask, setNewTask] = useState<TaskList>({task: '', status: false})
    const [error, setError] = useState<string>('')

    const changeNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.trim();
        setNewTask({task: input, status: false});
    }

    const addTask = () => {
        if (!handleError()) {
            const newTasks = [...tasks, newTask]
            setTasks(newTasks)
        }
        setNewTask({task: '', status: false})
    }

    const handleError = () => {
        if (newTask.task === '') {
            setError('New tasks cannot be empty')
            return true
        } else {
            setError('')
        }
        if (tasks.some(task => task.task.includes(newTask.task))){
            setError('Task already exists')
            return true
        }  else {
            setError('')
        }
        if (newTask.task.length > 50) {
            setError('New tasks cannot be more than 50 characters')
            return true
        } else {
            setError('')
        }
        return false
    }

    const changeStatus = (task: string) => {
        const updatedTasks = tasks.map(t => {
            if (task === t.task) {
                return {...t, status: !t.status}
            }
            return t
        })

        setTasks(updatedTasks)
    }

    const deleteTask = (t: string) => {
        const updatedTasks = tasks.filter(task => {
            return task.task != t;
        })

        setTasks(updatedTasks)
    }

    const removedFinishedTasks = () => {
        const updatedTasks = tasks.filter(task => {
            return task.status != true
        })

        setTasks(updatedTasks)
    }
  
  return (
    <div>
        <div className="flex flex-col text-center">
            <input type='text' placeholder="Add a Task" onChange={changeNewTask} value={newTask.task} className="text-center h-12 pb-1 w-[100%] " />
            <button onClick={addTask} className="h-8 bg-slate-500 mt-4 font-semibold">Add Task</button>
            <button className="h-8 bg-red-400 mt-2 font-semibold" onClick={removedFinishedTasks}>Remove Completed Tasks</button>
            <p className="text-red-500">{error}</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 text-center">
            {tasks.length === 0 ? (
                <p>There are no tasks to complete</p>
            ) : (
                tasks.map(task => {
                    return (
                        <div className="grid grid-cols-4 gap-x-20" key={task.task}>
                            <input type="checkbox" onChange={() => changeStatus(task.task)} />
                            <p className={`${task.status ? 'line-through':''} col-span-2`}>{task.task}</p>
                            <button onClick={() => deleteTask(task.task)} className="bg-red-500 w-[60%] rounded font-semibold ml-4">Delete</button>
                        </div>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default TodoList