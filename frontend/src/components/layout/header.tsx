import React from 'react';
import styles from './header.module.css';

type HeaderProps = {
  onMenuToggle: () => void;
  isMobile: boolean;
}

export function Header({ onMenuToggle, isMobile }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className={styles.menuButton}
            aria-label="メニューを開く"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        
        <h1 className={styles.title}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.logo}>
            <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Todo App
        </h1>
      </div>
    </header>
  );
}