import { useState, useEffect } from 'react'
import { Category } from './components/Category'
import './style.css'

export function App() {
    const [tasks, setTasks] = useState({
        todo: [],
        in_progress: [],
        done: [],
    })

    useEffect(() => {
        const ls_tasks = localStorage.getItem('tasks')
        if (ls_tasks) {
            setTasks(JSON.parse(ls_tasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <div className="App">
            {Object.keys(tasks).map(category_name => {
                return <Category key={category_name} category_name={category_name} tasks={tasks} setTasks={setTasks} />
            })}
            <div onClick={() => setTasks({ ...tasks, [prompt("Введите название категории")]: [] })}>+</div>
        </div>
    )
}
