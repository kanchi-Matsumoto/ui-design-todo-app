import React from 'react';
import { TodoItem } from './todo-item';
import styles from './todo-list.module.css';
import type { Todo } from '../types';

type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, isLoading, error, onUpdate, onDelete }: TodoListProps) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 16v12M24 32h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>{error.message}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 28h24M20 36h16M20 44h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>タスクがありません</p>
        <p className={styles.emptyHint}>新しいタスクを追加してみましょう</p>
      </div>
    );
  }

  const handleToggle = (id: number, completed: boolean) => {
    onUpdate(id, { completed });
  };

  const handleEdit = (id: number, title: string) => {
    onUpdate(id, { title });
  };

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}