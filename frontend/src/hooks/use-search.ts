import { useState, useCallback } from 'react';

type UseSearchReturn = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: <T extends Record<string, any>>(items: T[], searchKey: keyof T) => T[];
}

export function useSearch(initialTerm = ''): UseSearchReturn {
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  const filteredItems = useCallback(
    <T extends Record<string, any>>(items: T[], searchKey: keyof T): T[] => {
      if (!searchTerm.trim()) {
        return items;
      }

      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      
      return items.filter((item) => {
        const value = item[searchKey];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(normalizedSearchTerm);
        }
        return false;
      });
    },
    [searchTerm]
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}