import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import '../../styles/MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout-wrapper">
      {/* Sidebar de Navegação */}
      <aside className="sidebar-navigation">
        <Sidebar />
      </aside>

      {/* Feed / Conteúdo Principal */}
      <main className="main-content-area">
        <div className="feed-container">{children}</div>
      </main>

      {/* Sidebar Lateral Direita (Sugestões, Trending, etc.) */}
      <aside className="sidebar-widgets">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default MainLayout;
