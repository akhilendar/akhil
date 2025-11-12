import React, { useEffect, useState } from 'react';

export default function TaskForm({ onCreate, editing, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '');
      setDescription(editing.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    if (editing) {
      onUpdate(editing._id, { title, description, completed: editing.completed });
    } else {
      onCreate({ title, description });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 8 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">{editing ? 'Update' : 'Create'}</button>
      {editing && <button type="button" onClick={() => { setTitle(''); setDescription(''); onUpdate(null); }}>Cancel</button>}
    </form>
  );
}
