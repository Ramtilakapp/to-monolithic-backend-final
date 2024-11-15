const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      task: req.body.task,
    });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
