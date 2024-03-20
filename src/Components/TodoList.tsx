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
        return false
    }
  
  return (
    <div>
        <div className="flex flex-col text-center">
            <input type='text' placeholder="Add a Task" onChange={changeNewTask} value={newTask.task} className="text-center h-12 pb-1 " />
            <button onClick={addTask} className="h-8 bg-slate-500 mt-2">Add Task</button>
            <p className="text-red-500">{error}</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 text-center">
            {tasks.length === 0 ? (
                <p>There are no more tasks to complete</p>
            ) : (
                tasks.map(task => {
                    return (
                        <div className="grid grid-cols-3" key={task.task}>
                            <input type="checkbox" />
                            <p className={task.status ? 'line-through':''}>{task.task}</p>
                            <button>Delete</button>
                        </div>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default TodoList