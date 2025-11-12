import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <li key={task._id} style={{ marginBottom: 8, padding: 8, border: '1px solid #ddd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{task.title}</strong>
              <div>{task.description}</div>
              <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task._id, { ...task, completed: !task.completed })}
                />
                Completed
              </label>
              <br />
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
