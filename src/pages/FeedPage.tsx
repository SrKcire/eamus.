import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import PostCard from '../components/common/PostCard';
import '../styles/FeedPage.css';

const FeedPage: React.FC = () => {
  const { posts } = useApp();
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Filtros de Feed (simulando lógica de seguindo ou geral)
  const filteredPosts = activeTab === 'for-you' 
    ? [...posts].reverse() 
    : [...posts].filter(p => p.id % 2 === 0).reverse(); // Simulação de filtro

  // Lógica de Scroll Infinito (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (feedEndRef.current) {
      observer.observe(feedEndRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore]);

  const loadMorePosts = () => {
    setIsLoadingMore(true);
    // Simula um delay de carregamento de rede
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1500);
  };

  return (
    <main className="feed-page-wrapper">
      {/* 1. FILTROS DE FEED - Estética Eamus */}
      <nav className="feed-filters">
        <button 
          onClick={() => setActiveTab('for-you')}
          className={`filter-btn ${activeTab === 'for-you' ? 'filter-active' : 'filter-inactive'}`}
        >
          Para você
          {activeTab === 'for-you' && <div className="filter-indicator" />}
        </button>
        <button 
          onClick={() => setActiveTab('following')}
          className={`filter-btn ${activeTab === 'following' ? 'filter-active' : 'filter-inactive'}`}
        >
          Seguindo
          {activeTab === 'following' && <div className="filter-indicator" />}
        </button>
      </nav>

      <h1 className="sr-only">Feed de Experiências</h1>

      <div className="feed-list">
        {filteredPosts.length > 0 ? (
          <>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
            
            {/* 2. SKELETON LOADERS (Pulsantes no final do scroll) */}
            <div ref={feedEndRef} className="w-full flex flex-col gap-10 mt-10">
              {isLoadingMore && [1, 2].map((i) => (
                <div key={i} className="skeleton-card animate-pulse">
                  <div className="skeleton-media" />
                  <div className="skeleton-text w-3/4" />
                  <div className="skeleton-text w-1/2" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="feed-empty">
            <p className="feed-empty-title">O silêncio antes do show</p>
            <span className="feed-empty-subtitle">
              Nenhuma publicação por aqui ainda.
            </span>
          </div>
        )}
      </div>
    </main>
  );
};

export default FeedPage;