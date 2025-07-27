const todoModel = require('../models/todo-model');

// Get all todos
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoModel.findAll();
    res.json({
      success: true,
      data: todos,
      message: 'Todos retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Create a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      const error = new Error('Title is required');
      error.status = 400;
      throw error;
    }
    
    const newTodo = await todoModel.create({ title: title.trim() });
    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update a todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const updatedTodo = await todoModel.update(id, { title, completed });
    
    if (!updatedTodo) {
      const error = new Error('Todo not found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deleted = await todoModel.delete(id);
    
    if (!deleted) {
      const error = new Error('Todo not found');
      error.status = 404;
      throw error;
    }
    
    res.json({
      success: true,
      data: null,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};