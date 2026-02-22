import React from 'react';
import { useApp } from '../context/AppContext';
import PostCard from '../components/common/PostCard';
import '../styles/FeedPage.css';

const FeedPage: React.FC = () => {
  const { posts } = useApp();

  // Criamos uma cópia do array e invertemos para mostrar os novos primeiro
  const chronologicalPosts = [...posts].reverse();

  return (
    <main className="feed-container">
      <h1 className="sr-only">Feed de Experiências</h1>

      <div className="feed-list">
        {chronologicalPosts.length > 0 ? (
          chronologicalPosts.map((post) => <PostCard key={post.id} {...post} />)
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
