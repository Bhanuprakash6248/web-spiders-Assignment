const Task = require('../models/taskModel.js');
const Joi = require('joi');


// Validation schema
const validateTask = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').default('TODO'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM'),
    dueDate: Joi.date().optional(),
  });
  return schema.validate(data);
};

// To create a new task
const createTask = async (req, res, next) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = new Task(value);
    const savedTask = await task.save();


    res.status(201).json(savedTask);
  } catch (err) {
    next(err); 
  }
};

// Controller to fetch all tasks
const getAllTasks = async (req, res, next) => {
    try {
      const { status, priority, sort, limit = 10, skip = 0 } = req.query;

      const filter = {};
      if (status) {
        filter.status = status;
      }
      if (priority) {
        filter.priority = priority;
      }
  
      
      const sortOptions = {};
      if (sort) {
        const [key, order] = sort.split(':'); 
        sortOptions[key] = order === 'desc' ? -1 : 1;
      }
  
      const tasks = await Task.find(filter)
        .sort(sortOptions)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
  
      res.status(200).json(tasks);
    } catch (err) {
      next(err); 
    }
  };

  
// Controller to fetch a specific task by ID
const getTaskById = async (req, res, next) => {
    try {
      const { id } = req.params;
  

      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (err) {
      next(err); 
    }
};

const validateTaskUpdate = (data) => {
    const schema = Joi.object({
      title: Joi.string().max(100),
      description: Joi.string().allow('', null),
      status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED'),
      priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
      dueDate: Joi.date().optional(),
    });
    return schema.validate(data);
  };

const updateTaskById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
    
      const { error, value } = validateTaskUpdate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
     
      const updatedTask = await Task.findByIdAndUpdate(id, { ...value, updatedAt: Date.now() }, { new: true });
  

      if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
  
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err); 
    }
  };
  
  const deleteTaskById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const deletedTask = await Task.findByIdAndDelete(id);
  
   
      if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
  

      res.status(204).send();
    } catch (err) {
      next(err); 
    }
  };

  module.exports = { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById};

  

  


