const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

// Create
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;