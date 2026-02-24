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
        {/* ESTRUTURA DE PROTEÇÃO DO HEADER (Item 1.2):
          Este container garante que a barra superior tenha um fundo sólido 
          e z-index alto o suficiente para os cards sumirem atrás dela.
        */}
        <div className="sticky top-0 z-[100] w-full bg-black">
          {/* O conteúdo do header (Pra Você / Seguindo) será renderizado aqui através do children 
              ou você pode mover o componente de Tabs fixo para cá se ele for global. */}
        </div>

        <div className="feed-container-wrapper">
          {children}
        </div>
      </main>

      {/* RIGHT SIDEBAR: Oculta no mobile (lg:block garante visibilidade apenas em telas grandes) */}
      <aside className="sidebar-widgets hidden lg:block">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default MainLayout;