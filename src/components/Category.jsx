import { TaskCard } from './TaskCard'

export function Category({ category_name, tasks, setTasks }) {
  return (
    <div key={category_name} className="category">
      <span className="category-header">{category_name}</span>
      {tasks[category_name].map(task => {
        return (
          <TaskCard 
            key={task.id} 
            task={task} 
            categoryName={category_name}
            tasks={tasks}
            setTasks={setTasks}
          />
        )
      })}
      <div onClick={() => {
        setTasks({
          ...tasks,
          [category_name]: [
            ...tasks[category_name],
            { id: Date.now(), name: prompt("Введите название задачи") }
          ]
        })
      }}>+</div>
    </div>
  )
}
