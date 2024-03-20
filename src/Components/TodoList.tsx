import { useState } from "react"
import { TaskList } from "../Types/types"

const TodoList = () => {
    const [tasks, setTasks] = useState<TaskList[]>([])
    const [newTask, setNewTask] = useState<string>('')
    const [error, setError] = useState<string>('')
  

    const changeNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setNewTask(input)
    }

    const addTask = () => {
        if (!handleError()) {
            setTasks(prev => [...prev, {task: newTask.trim(), status: false}])
        }
        setNewTask('')
    }

    const handleError = () => {
        if (newTask === '') {
            setError('New tasks cannot be empty')
            return true
        }
        if (tasks.some(task => task.task === newTask)){
            setError('Task already exists')
            return true
        }
        if (newTask.length > 50) {
            setError('New tasks cannot be more than 50 characters')
            return true
        }
        setError('');
        return false
    }

    const changeStatus = (t: string) => {
        setTasks(prev => prev.map(task => {
            if (t === task.task) {
                return {...task, status: !task.status}
            }
            return task
        }))
    }

    const deleteTask = (t: string) => {
        setTasks(prev => prev.filter(task => {
            return task.task !== t
        }))
    }

    const removeFinishedTasks = () => {
        setTasks(prev => prev.filter(task => {
            return task.status !== true
        }))
    }
  
  return (
    <div>
        <div className="flex flex-col text-center">
            <input type='text' placeholder="Add a Task" onChange={changeNewTask} value={newTask} className="text-center h-12 pb-1 w-[100%] " />
            <button onClick={addTask} className="h-8 bg-slate-500 mt-4 font-semibold">Add Task</button>
            <button className="h-8 bg-red-400 mt-2 font-semibold" onClick={removeFinishedTasks}>Remove Completed Tasks</button>
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
                            <button onClick={() => deleteTask(task.task)} className="bg-red-500 w-[50%] rounded font-semibold ml-4">Delete</button>
                        </div>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default TodoList