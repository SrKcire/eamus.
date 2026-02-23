import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { Home, Search, PlusSquare, User, Bell } from 'lucide-react'; // Ícones para a barra mobile
import '../../styles/MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-dark-bg text-white">
      
      {/* SIDEBAR ESQUERDA: Escondida no mobile (hidden), visível do tablet em diante (md:flex) */}
      <aside className="hidden md:flex md:w-20 lg:w-64 fixed h-full border-r border-white/10">
        <Sidebar />
      </aside>

      {/* ÁREA CENTRAL: Ocupa largura total no mobile e ganha margem esquerda no desktop para não ficar sob a sidebar */}
      <main className="flex-1 w-full md:ml-20 lg:ml-64 lg:mr-80 min-h-screen pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </main>

      {/* SIDEBAR DIREITA: Escondida até telas grandes (lg:block) */}
      <aside className="hidden lg:block w-80 fixed right-0 h-full border-l border-white/10">
        <RightSidebar />
      </aside>

      {/* BOTTOM NAVIGATION: Visível apenas no mobile (flex md:hidden) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-lg border-t border-white/10 items-center justify-around z-50 px-4">
        <button className="p-2"><Home size={24} /></button>
        <button className="p-2"><Search size={24} /></button>
        <button className="p-2 text-primary-white bg-white/10 rounded-lg"><PlusSquare size={24} /></button>
        <button className="p-2"><Bell size={24} /></button>
        <button className="p-2"><User size={24} /></button>
      </nav>

    </div>
  );
};

export default MainLayout;