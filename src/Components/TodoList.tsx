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
        if (handleError()) {
            return
        }
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
    }

    const handleError = () => {
        if (newTask.task === '') {
            setError('New tasks cannot be empty')
            return true
        }
        if (tasks.some(task => task.task.includes(newTask.task))){
            setError('Task already exists')
            return true
        }
        return false
    }
  
  return (
    <div>
        <div>
            <p>{error}</p>
            <input type='text' placeholder="Add a Task" onChange={changeNewTask} />
            <button onClick={addTask}>Add Task</button>
        </div>
        <div>
            {tasks.length === 0 ? (
                <p>There are no more tasks to complete</p>
            ) : (
                tasks.map(task => {
                    return (
                        <div>
                            <input type="checkbox" />
                            <p>{task.task}</p>
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