import express from 'express'
import Task from '../model/task.js'
const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get one task
  router.get('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new task
  router.post('/', async (req, res) => {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate
    });
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a task
  router.put('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      task.title = req.body.title;
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a task
  router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      await task.deleteOne();
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  export default router;