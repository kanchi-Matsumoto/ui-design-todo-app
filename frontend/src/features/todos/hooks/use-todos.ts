import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '../api/todo-api';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

type UseTodosReturn = {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await todoApi.getAll();
      setTodos(response.data);
    } catch (err) {
      setError(new Error(err?.error?.message || 'Todoの取得に失敗しました'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add todo
  const addTodo = useCallback(async (title: string) => {
    try {
      const response = await todoApi.create({ title });
      setTodos((prev) => [response.data, ...prev]);
    } catch (err) {
      setError(new Error(err?.error?.message || 'Todoの作成に失敗しました'));
      throw err;
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: number, data: UpdateTodoDto) => {
    // Optimistic update
    const previousTodos = todos;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...data } : todo
      )
    );

    try {
      const response = await todoApi.update(id, data);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? response.data : todo
        )
      );
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      setError(new Error(err?.error?.message || 'Todoの更新に失敗しました'));
      throw err;
    }
  }, [todos]);

  // Delete todo
  const deleteTodo = useCallback(async (id: number) => {
    // Optimistic update
    const previousTodos = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      await todoApi.delete(id);
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      setError(new Error(err?.error?.message || 'Todoの削除に失敗しました'));
      throw err;
    }
  }, [todos]);

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
}