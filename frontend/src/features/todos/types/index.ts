export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTodoDto = {
  title: string;
}

export type UpdateTodoDto = {
  title?: string;
  completed?: boolean;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
}

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
}