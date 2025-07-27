import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { SearchBar } from '@/features/todos/components/search-bar';
import { TodoForm } from '@/features/todos/components/todo-form';
import { TodoList } from '@/features/todos/components/todo-list';
import { useTodos } from '@/features/todos/hooks/use-todos';
import { useSearch } from '@/hooks/use-search';
import styles from './app.module.css';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<'all' | 'incomplete' | 'completed'>('all');
  
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } = useTodos();
  const { searchTerm, setSearchTerm, filteredItems } = useSearch();
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleAddTodo = async (title: string) => {
    try {
      await addTodo(title);
    } catch (err) {
      // Error is already handled in the hook
    }
  };
  
  const filteredTodos = filteredItems(todos, 'title').filter(todo => {
    if (filter === 'incomplete') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    incomplete: todos.filter(todo => !todo.completed).length
  };
  
  return (
    <div className={styles.app}>
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        isMobile={isMobile} 
      />
      
      <div className={styles.layout}>
        <Sidebar 
          isOpen={sidebarOpen} 
          isMobile={isMobile} 
          onClose={() => setSidebarOpen(false)}
          filter={filter}
          onFilterChange={setFilter}
          stats={stats}
        />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
            />
            
            <TodoForm 
              onAdd={handleAddTodo} 
              isLoading={isLoading} 
            />
            
            <TodoList
              todos={filteredTodos}
              isLoading={isLoading}
              error={error}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>
        </main>
      </div>
    </div>
  );
}