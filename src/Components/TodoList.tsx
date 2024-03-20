import { useState } from "react"
import { TaskList } from "../Types/types"

const TodoList = () => {
    const [tasks, setTasks] = useState<TaskList[]>([])
  return (
    <div>
        <div>
            <input type='text' placeholder="Add a Task"  />
            <button>Add Task</button>
        </div>
    </div>
  )
}

export default TodoList