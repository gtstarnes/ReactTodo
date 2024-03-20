import { useState } from "react"
import { TaskList } from "../Types/types"

const TodoList = () => {
    const [tasks, setTasks] = useState<TaskList[]>([])
    const [newTask, setNewTask] = useState<string>('')
    const [error, setError] = useState<string>('')

    const changeNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.trim();
        setNewTask(input);
    }
  return (
    <div>
        <div>
            <p>{error}</p>
            <input type='text' placeholder="Add a Task" onChange={changeNewTask} />
            <button>Add Task</button>
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