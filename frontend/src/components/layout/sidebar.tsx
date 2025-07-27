import React from 'react';
import styles from './sidebar.module.css';

type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  filter: 'all' | 'incomplete' | 'completed';
  onFilterChange: (filter: 'all' | 'incomplete' | 'completed') => void;
  stats: {
    total: number;
    completed: number;
    incomplete: number;
  };
}

export function Sidebar({ isOpen, isMobile, onClose, filter, onFilterChange, stats }: SidebarProps) {
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <>
      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>フィルター</h2>
          {isMobile && (
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="サイドバーを閉じる"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => onFilterChange('all')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            すべて
          </button>
          
          <button 
            className={`${styles.navItem} ${filter === 'incomplete' ? styles.active : ''}`}
            onClick={() => onFilterChange('incomplete')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            未完了
          </button>
          
          <button 
            className={`${styles.navItem} ${filter === 'completed' ? styles.active : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" fill="currentColor"/>
              <path d="M14 7l-5 5-2-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            完了済み
          </button>
        </nav>
        
        <div className={styles.stats}>
          <h3 className={styles.statsTitle}>統計</h3>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>総タスク数</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>完了</span>
            <span className={styles.statValue}>{stats.completed}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>未完了</span>
            <span className={styles.statValue}>{stats.incomplete}</span>
          </div>
        </div>
      </aside>
    </>
  );
}