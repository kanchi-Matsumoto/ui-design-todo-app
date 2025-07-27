const db = require('../database/connection');

// Get all todos
exports.findAll = async () => {
  const [rows] = await db.execute(
    'SELECT * FROM todos ORDER BY created_at DESC'
  );
  return rows;
};

// Create a new todo
exports.create = async ({ title }) => {
  const [result] = await db.execute(
    'INSERT INTO todos (title) VALUES (?)',
    [title]
  );
  
  const [newTodo] = await db.execute(
    'SELECT * FROM todos WHERE id = ?',
    [result.insertId]
  );
  
  return newTodo[0];
};

// Update a todo
exports.update = async (id, { title, completed }) => {
  const updates = [];
  const values = [];
  
  if (title !== undefined) {
    updates.push('title = ?');
    values.push(title);
  }
  
  if (completed !== undefined) {
    updates.push('completed = ?');
    values.push(completed);
  }
  
  if (updates.length === 0) {
    return null;
  }
  
  values.push(id);
  
  await db.execute(
    `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  const [updatedTodo] = await db.execute(
    'SELECT * FROM todos WHERE id = ?',
    [id]
  );
  
  return updatedTodo[0];
};

// Delete a todo
exports.delete = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM todos WHERE id = ?',
    [id]
  );
  
  return result.affectedRows > 0;
};