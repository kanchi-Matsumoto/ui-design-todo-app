import React, { useState } from 'react';
import styles from './todo-item.module.css';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onEdit(todo.id, editTitle.trim());
    }
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.content}>
        <button
          className={styles.checkbox}
          onClick={() => onToggle(todo.id, !todo.completed)}
          aria-label={todo.completed ? 'タスクを未完了にする' : 'タスクを完了にする'}
        >
          {Boolean(todo.completed) && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 4.5L6 12L2.5 8.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <span className={styles.title}>{todo.title}</span>
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.actionButton}
              aria-label="タスクを編集"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11.333 2A1.886 1.886 0 0114 4.667l-9 9-3.667 1 1-3.667 9-9z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {showDeleteConfirm ? (
              <div className={styles.deleteConfirm}>
                <button
                  onClick={handleDelete}
                  className={styles.confirmButton}
                  aria-label="削除を確認"
                >
                  削除
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={styles.cancelButton}
                  aria-label="キャンセル"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className={styles.actionButton}
                aria-label="タスクを削除"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </li>
  );
}