import { useState, useMemo } from 'react';

// Tipagem para os dados do Hook
interface SelectionItem {
  id: number;
  name: string;
  [key: string]: any;
}

export const usePostSelection = (
  users: SelectionItem[],
  events: SelectionItem[]
) => {
  const [activeTab, setActiveTab] = useState<
    'none' | 'music' | 'tag' | 'event'
  >('none');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de alternar abas
  const toggleTab = (tab: 'music' | 'tag' | 'event') => {
    setActiveTab((prev) => (prev === tab ? 'none' : tab));
    setSearchQuery('');
  };

  // Lógica de filtragem centralizada
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 'tag') {
      return users.filter((u) => u.name.toLowerCase().includes(query));
    }
    if (activeTab === 'event') {
      return events.filter((e) => e.name.toLowerCase().includes(query));
    }
    return [];
  }, [activeTab, searchQuery, users, events]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toggleTab,
    filteredResults,
  };
};
