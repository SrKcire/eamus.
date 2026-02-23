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
      {/* SIDEBAR: 
        No Desktop: Lateral fixa (md:flex)
        No Mobile: Barra inferior fixa (flex na base, fixed bottom)
      */}
      <aside className="sidebar-navigation">
        <Sidebar />
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content-area">
        <div className="feed-container-wrapper">{children}</div>
      </main>

      {/* RIGHT SIDEBAR: Continua oculta no mobile por ser conteúdo secundário */}
      <aside className="sidebar-widgets hidden lg:block">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default MainLayout;