import React, { useState } from 'react';
import styles from './todo-form.module.css';

type TodoFormProps = {
  onAdd: (title: string) => void;
  isLoading: boolean;
}

export function TodoForm({ onAdd, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('タスクのタイトルを入力してください');
      return;
    }

    onAdd(title.trim());
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="タスクを追加..."
          className={styles.input}
          disabled={isLoading}
          aria-label="新しいタスク"
          aria-invalid={!!error}
          aria-describedby={error ? 'todo-form-error' : undefined}
        />
        <button
          type="submit"
          className={styles.addButton}
          disabled={isLoading || !title.trim()}
          aria-label="タスクを追加"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4v12m-6-6h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {error && (
        <p id="todo-form-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}