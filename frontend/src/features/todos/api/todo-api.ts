import axiosInstance from '@/lib/axios';
import type { Todo, CreateTodoDto, UpdateTodoDto, ApiResponse } from '../types';

export const todoApi = {
  // Get all todos
  getAll: async (): Promise<ApiResponse<Todo[]>> => {
    return axiosInstance.get('/todos');
  },

  // Create a new todo
  create: async (data: CreateTodoDto): Promise<ApiResponse<Todo>> => {
    return axiosInstance.post('/todos', data);
  },

  // Update a todo
  update: async (id: number, data: UpdateTodoDto): Promise<ApiResponse<Todo>> => {
    return axiosInstance.put(`/todos/${id}`, data);
  },

  // Delete a todo
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return axiosInstance.delete(`/todos/${id}`);
  },
};