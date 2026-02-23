import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Bell,
  MessageCircle,
  Search,
  Settings,
  Menu,
  Plus,
} from 'lucide-react';
import CreatePostModal from '../modals/CreatePostModal';
import '../../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { notifications, user } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const unreadNotifications =
    notifications?.filter((n) => !n.isRead && n.type !== 'message').length || 0;
  const unreadMessages =
    notifications?.filter((n) => !n.isRead && n.type === 'message').length || 0;

  const menuItems = [
    { name: 'Página inicial', icon: <Home size={28} />, path: '/' },
    { name: 'Pesquisa', icon: <Search size={28} />, path: '/search' },
    {
      name: 'Notificações',
      icon: <Bell size={28} />,
      path: '/notifications',
      badgeCount: unreadNotifications,
    },
    {
      name: 'Chat',
      icon: <MessageCircle size={28} />,
      path: '/chat',
      badgeCount: unreadMessages,
    },
    {
      name: 'Perfil',
      path: '/profile',
      icon: (
        <div className="menu-profile-avatar border-2 border-transparent group-hover:border-white/50 transition-all">
          <img
            src={user.avatar}
            className="w-full h-full object-cover rounded-full"
            alt="Perfil"
          />
        </div>
      ),
    },
  ];

  return (
    // Removidas larguras fixas daqui para o MainLayout controlar via Tailwind
    <div className="flex flex-col h-full w-full py-6 px-4">
      
      {/* Logo: Esconde o texto em telas médias (md), mostra em grandes (lg) */}
      <div className="mb-10 px-2 flex justify-center lg:justify-start">
        <h1 className="text-2xl font-bold tracking-tighter text-white">
          <span className="hidden lg:inline">eamus.</span>
          <span className="lg:hidden text-3xl">e.</span>
        </h1>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-white/10 ${
                isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="relative shrink-0 flex items-center justify-center w-7 h-7">
                {item.icon}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-lg">{item.name}</span>
            </Link>
          );
        })}

        {/* Botão Criar: No Tablet vira um círculo com +, no Desktop vira botão largo */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 flex items-center gap-4 p-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-all justify-center lg:justify-start"
        >
          <Plus size={24} strokeWidth={3} />
          <span className="hidden lg:inline font-bold">Criar</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
        <Link
          to="/settings"
          className="flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <Settings size={28} />
          <span className="hidden lg:inline">Configurações</span>
        </Link>

        <button className="flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all">
          <Menu size={28} />
          <span className="hidden lg:inline">Mais</span>
        </button>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;