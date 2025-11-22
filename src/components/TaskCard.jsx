import { useState } from 'react'

export function TaskCard({ task, categoryName, tasks, setTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(task.name)

  // 1️⃣ Изменение названия задачи
  const handleSaveName = () => {
    if (editedName.trim()) {
      const newTasks = { ...tasks }
      const taskIndex = newTasks[categoryName].findIndex(t => t.id === task.id)
      newTasks[categoryName][taskIndex].name = editedName
      setTasks(newTasks)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditedName(task.name)
    setIsEditing(false)
  }

  // 2️⃣ Перемещение в другую категорию
  const handleMoveTask = (newCategoryName) => {
    if (newCategoryName !== categoryName) {
      const newTasks = { ...tasks }
      newTasks[categoryName] = newTasks[categoryName].filter(t => t.id !== task.id)
      newTasks[newCategoryName] = [...newTasks[newCategoryName], task]
      setTasks(newTasks)
    }
  }

  // 3️⃣ Удаление задачи
  const handleDelete = () => {
    const newTasks = { ...tasks }
    newTasks[categoryName] = newTasks[categoryName].filter(t => t.id !== task.id)
    setTasks(newTasks)
  }

  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveName}>Сохранить</button>
          <button onClick={handleCancelEdit}>Отмена</button>
        </div>
      ) : (
        <div>
          <span>{task.name}</span>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
      )}

      <select value={categoryName} onChange={(e) => handleMoveTask(e.target.value)}>
        {Object.keys(tasks).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}
