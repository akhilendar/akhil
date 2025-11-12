import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  const API_URL = 'http://localhost:5000/api/tasks'

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [API_URL])

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTask) {
        // UPDATE
        const res = await fetch(`${API_URL}/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, completed: editingTask.completed })
        })
        const updated = await res.json()
        setTasks(tasks.map(t => (t._id === updated._id ? updated : t)))
        setEditingTask(null)
      } else {
        // CREATE
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description })
        })
        const newTask = await res.json()
        setTasks([newTask, ...tasks])
      }
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error submitting task:', error)
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Handle toggle complete
  const handleToggle = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed })
      })
      const updated = await res.json()
      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)))
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  // Handle edit
  const handleEdit = (task) => {
    setEditingTask(task)
    setTitle(task.title)
    setDescription(task.description)
  }

  return (
    <div className="App">
      <h1>{editingTask ? 'Edit Task' : 'Add Task'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTask ? 'Update' : 'Add'}</button>
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setEditingTask(null)
              setTitle('')
              setDescription('')
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <strong>{task.title}</strong> — {task.description || 'No description'}
              <br />
              <small>
                Status:{' '}
                <span style={{ color: task.completed ? 'green' : 'crimson' }}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </small>
            </div>
            <div>
              <button onClick={() => handleToggle(task)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
